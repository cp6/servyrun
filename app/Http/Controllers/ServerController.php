<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\DatabaseConnection;
use App\Models\IpAddress;
use App\Models\Location;
use App\Models\Server;
use App\Models\ServerUsage;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServerController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Servers/Index', [
            'servers' => Server::with(['type', 'conn'])->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function create(): \Inertia\Response
    {
        if (Server::get()->count() >= config('custom.maxServersPerAccount')) {
            abort('403', 'Server limit has been hit', ['message' => 'Server limit has been hit']);
        }

        return Inertia::render('Servers/Create', [
            'title' => fake()->colorName() . '-' . fake()->numberBetween(1, 999),
            'types' => Type::all(),
            'locations' => Location::all(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function show(Server $server): \Inertia\Response
    {
        $this->authorize('view', $server);

        return Inertia::render('Servers/Show', [
            'resource' => $server->where('id', $server->id)->with(['type', 'location', 'ips', 'ip_ssh', 'conn.outputsLast5', 'sftp_conn'])->firstOrFail(),
            'servers' => Server::has('conn')->whereNot('id', $server->id)->select(['id', 'hostname', 'title'])->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function ip(Server $server): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server);

        $data = $server->where('id', $server->id)->with(['ip_ssh'])->firstOrFail();

        return response()->json(['ip' => $data->ip_ssh->ip])->header('Content-Type', 'application/json');
    }

    public function getServerConnections(Server $server): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server);

        $connections = Connection::where('server_id', $server->id)->get();

        return response()->json($connections)->header('Content-Type', 'application/json');
    }

    public function getServerDatabaseConnections(Server $server): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server);

        $connections = DatabaseConnection::where('server_id', $server->id)->get();

        return response()->json($connections)->header('Content-Type', 'application/json');
    }

    public function edit(Server $server): \Inertia\Response
    {
        return Inertia::render('Servers/Edit', [
            'resource' => $server->where('id', $server->id)->with(['type', 'location', 'ip_ssh'])->first(),
            'types' => Type::all(),
            'locations' => Location::all()
        ]);
    }

    public function store(Request $request)
    {
        if (Server::get()->count() >= config('custom.maxServersPerAccount')) {
            abort('403', 'Server limit has been hit');
        }

        $request->validate([
            'hostname' => 'string|required|max:64',
            'title' => 'string|sometimes|nullable|max:64',
            'ip' => 'ip|required',
            'server_type' => 'integer|required',
            'location' => 'integer|required',
            'os' => 'string|max:125|sometimes|nullable',
            'cpu' => 'string|sometimes|nullable',
            'cpu_cores' => 'integer|sometimes|nullable|max:999',
            'cpu_freq' => 'numeric|sometimes|nullable',
            'disk_gb' => 'numeric|sometimes|nullable',
            'disk_tb' => 'numeric|sometimes|nullable|max:999',
            'ram_mb' => 'numeric|sometimes|nullable',
            'ram_gb' => 'numeric|sometimes|nullable|max:9999',
            'swap' => 'numeric|sometimes|nullable',
            'ping_port' => 'integer|required'
        ]);

        try {

            $server = new Server;
            $server->hostname = $request->hostname;
            $server->title = $request->title;
            $server->operating_system = $request->os ?? null;
            $server->location_id = $request->location ?? null;
            $server->type_id = $request->server_type ?? null;
            $server->cpu = $request->cpu ?? null;
            $server->cpu_cores = $request->cpu_cores ?? null;
            $server->cpu_freq = $request->cpu_freq ?? null;
            $server->disk_gb = $request->disk_gb ?? null;
            $server->disk_tb = $request->disk_tb ?? null;
            $server->ram_mb = $request->ram_mb ?? null;
            $server->ram_gb = $request->ram_gb ?? null;
            $server->swap_mb = $request->swap ?? null;
            $server->ping_port = $request->ping_port ?? 22;
            $server->save();

        } catch (\Exception $exception) {

            return redirect(route('server.create'))->with(['alert' => ['type' => 'failure', 'message' => 'Server could not be created error ' . $exception->getCode()]]);
        }

        try {

            $ip_address = new IpAddress;
            $ip_address->server_id = $server->id;
            $ip_address->ip = $request->ip;
            $ip_address->is_ipv4 = (filter_var($request->ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) ? 0 : 1;
            $ip_address->is_ssh = 1;
            $ip_address->is_main = 1;
            $ip_address->save();

        } catch (\Exception $exception) {

            return redirect(route('server.create'))->with(['alert' => ['type' => 'failure', 'message' => 'IP could not be created error ' . $exception->getCode()]]);
        }

        IpAddress::fetchUpdateIpDetails($ip_address);//Get IP ASN and GEO data etc

        return redirect(route('server.show', $server))->with(['alert' => ['type' => 'success', 'message' => "Server {$server->title} created successfully"]]);
    }

    public function update(Request $request, Server $server)
    {
        $this->authorize('update', $server);

        $request->validate([
            'hostname' => 'string|required|max:64',
            'title' => 'string|sometimes|nullable|max:64',
            'ip' => 'ip|required',
            'server_type' => 'integer|required',
            'location' => 'integer|required',
            'os' => 'string|max:125|sometimes|nullable',
            'cpu' => 'string|sometimes|nullable',
            'cpu_cores' => 'integer|sometimes|nullable',
            'cpu_freq' => 'numeric|sometimes|nullable',
            'disk_gb' => 'numeric|sometimes|nullable',
            'ram_gb' => 'numeric|sometimes|nullable',
            'swap_mb' => 'numeric|sometimes|nullable',
            'ping_port' => 'integer|required',
            'price' => 'numeric|nullable|sometimes|min:0|max:9999',
            'currency' => 'string|nullable|sometimes|size:3',
            'term' => 'integer|nullable|sometimes|min:0|max:13',
            'scheduled_get_usage' => 'integer|required|min:0|max:1',
        ]);

        try {
            //TODO: Add in a price\currency as USD converter
            $server->update([
                'operating_system' => $request->os ?? null,
                'location_id' => $request->location ?? null,
                'type_id' => $request->server_type ?? null,
                'hostname' => $request->hostname,
                'title' => $request->title,
                'cpu' => $request->cpu ?? null,
                'cpu_cores' => $request->cpu_cores ?? null,
                'cpu_freq' => $request->cpu_freq ?? null,
                'cpu_freq_max' => $request->cpu_freq_max ?? null,
                'disk_gb' => $request->disk_gb ?? null,
                'ram_mb' => $request->ram_mb ?? null,
                'swap_mb' => $request->swap_mb ?? null,
                'ping_port' => $request->ping_port ?? 22,
                'price' => $request->price ?? null,
                'currency' => $request->currency ?? null,
                'payment_term' => $request->term ?? null,
                'scheduled_get_usage' => $request->scheduled_get_usage
            ]);

            if ($request->has('ip')) {
                //Update or create the IP
                $ip = IpAddress::where('server_id', $server->id)->where('is_main', 1)->where('user_id', \Auth::id())->first();

                if (!is_null($ip)) {

                    $ip->update(['ip' => $request->ip, 'is_ipv4' => (filter_var($request->ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) ? 0 : 1]);

                } else {

                    try {

                        $ip = new IpAddress();
                        $ip->server_id = $server->id;
                        $ip->ip = $request->ip;
                        $ip->is_ipv4 = (filter_var($request->ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) ? 0 : 1;
                        $ip->is_main = 1;
                        $ip->is_ssh = 1;
                        $ip->save();

                    } catch (\Exception $exception) {
                        return redirect(route('server.show', $server))->with(['alert' => ['type' => 'failure', 'message' => 'Creating IP error: ' . $exception->getMessage()]]);
                    }

                    IpAddress::fetchUpdateIpDetails($ip);//Get IP ASN and GEO data etc

                }

            }

        } catch (\Exception $exception) {

            return redirect(route('server.show', $server))->with(['alert' => ['type' => 'failure', 'message' => 'Server update error: ' . $exception->getMessage()]]);
        }

        return redirect(route('server.show', $server))->with(['alert' => ['type' => 'success', 'message' => 'Server updated successfully']]);
    }

    public function destroy(Server $server)
    {
        $this->authorize('delete', $server);

        try {
            $server->delete();
        } catch (\Exception $exception) {
            return redirect(route('server.show', $server))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('server.index'))->with(['alert' => ['type' => 'success', 'message' => 'Server deleted successfully']]);
    }

    public function getInformation(Server $server)
    {
        $this->authorize('update', $server);

        Server::getCpuOsDetails($server);
        Server::getRamDiskDetails($server);

        return redirect(route('server.show', $server))->with(['alert' => ['type' => 'success', 'message' => 'Server updated successfully']]);
    }

    public function getUptime(Server $server): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server);

        $connection = Connection::where('server_id', $server->id)->with('server', 'key')->firstOrFail();

        $ssh = Connection::do($connection, 10);

        if (is_null($ssh)) {
            return response()->json(['success' => false, 'message' => 'SSH could not connect'], 400)->header('Content-Type', 'application/json');
        }

        $uptime_array = Connection::formattedUptime($ssh);

        return response()->json($uptime_array)->header('Content-Type', 'application/json');

    }

    protected function getIpForDomain(string $domain_name, string $type = 'A'): \Illuminate\Http\JsonResponse
    {//Gets IP from A record for a domain
        switch ($type) {
            case "A":
                $data = dns_get_record($domain_name, DNS_A);
                if (isset($data['0']['ip'])) {
                    return response()->json(['ip' => $data['0']['ip']])->header('Content-Type', 'application/json');
                }
                break;
            case "AAAA":
                $data = dns_get_record($domain_name, DNS_AAAA);
                if (isset($data['0']['ipv6'])) {
                    return response()->json(['ip' => $data['0']['ipv6']])->header('Content-Type', 'application/json');
                }
                break;
        }
        return response()->json(['ip' => null])->header('Content-Type', 'application/json');
    }

}
