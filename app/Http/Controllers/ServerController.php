<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\DatabaseConnection;
use App\Models\IpAddress;
use App\Models\IpAddressesAssigned;
use App\Models\Location;
use App\Models\Server;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServerController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Servers/Index', [
            'servers' => Server::with(['type',])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function create(): \Inertia\Response
    {
        if (Server::get()->count() >= env('MAX_SERVERS_PER_ACCOUNT', 20)) {
            return abort('403', 'Server limit has been hit', ['message' => 'Server limit has been hit']);
        }

        return Inertia::render('Servers/Create', [
            'title' => fake()->colorName() . '-' . fake()->numberBetween(1, 999),
            'types' => Type::all(),
            'locations' => Location::all(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function show(Server $server)
    {
        $this->authorize('view', $server);

        return Inertia::render('Servers/Show', [
            'resource' => $server->where('id', $server->id)->with(['type', 'location', 'ips', 'ip_ssh', 'conn', 'sftp_conn'])->firstOrFail(),
            'servers' => Server::has('conn')->whereNot('id', $server->id)->select(['id', 'hostname', 'title'])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function ip(Server $server): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server);

        $data = $server->where('id', $server->id)->with(['ip_ssh'])->firstOrFail();

        return response()->json(array('ip' => $data->ip_ssh->ip))->header('Content-Type', 'application/json');
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
        if (Server::get()->count() >= env('MAX_SERVERS_PER_ACCOUNT', 20)) {
            return abort('403', 'Server limit has been hit', ['message' => 'Server limit has been hit']);
        }

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
            'disk' => 'numeric|sometimes|nullable',
            'ram' => 'numeric|sometimes|nullable',
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
            $server->ram_mb = $request->ram_mb ?? null;
            $server->ping_port = $request->ping_port ?? 22;
            $server->save();
        } catch (\Exception $exception) {

            return redirect(route('server.create'))->with(['alert_type' => 'failure', 'alert_message' => 'Server could not be created error ' . $exception->getCode()]);
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

            return redirect(route('server.create'))->with(['alert_type' => 'failure', 'alert_message' => 'IP could not be created error ' . $exception->getCode()]);
        }

        IpAddress::fetchUpdateIpDetails($ip_address);//Get IP ASN and GEO data etc

        return redirect(route('server.show', $server))->with(['alert_type' => 'success', 'alert_message' => "Server {$server->title} created successfully"]);
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
            'ping_port' => 'integer|required',
            'price' => 'numeric|nullable|sometimes|min:0|max:9999',
            'currency' => 'string|nullable|sometimes|size:3',
            'term' => 'integer|nullable|sometimes|min:0|max:13',
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
                'ping_port' => $request->ping_port ?? 22,
                'price' => $request->price ?? null,
                'currency' => $request->currency ?? null,
                'payment_term' => $request->term ?? null
            ]);

        } catch (\Exception $exception) {

            return redirect(route('server.show', $server))->with(['alert_type' => 'failure', 'alert_message' => 'Server update error: ' . $exception->getMessage()]);
        }

        return redirect(route('server.show', $server))->with(['alert_type' => 'success', 'alert_message' => 'Server updated successfully']);
    }

    public function destroy(Server $server)
    {
        $this->authorize('delete', $server);

        try {
            $server->delete();
        } catch (\Exception $exception){
            return redirect(route('server.show', $server))->with(['alert_type' => 'failure', 'alert_message' => 'Error deleting: '.$exception->getMessage()]);
        }

        return redirect(route('server.index'))->with(['alert_type' => 'success', 'alert_message' => 'Server deleted successfully']);
    }

    public function getInformation(Server $server)
    {
        $this->authorize('update', $server);

        Server::getCpuOsDetails($server);
        Server::getRamDiskDetails($server);

        return redirect(route('server.show', $server))->with(['alert_type' => 'success', 'alert_message' => 'Server updated successfully']);
    }

    protected function getIpForDomain(string $domain_name, string $type = 'A'): \Illuminate\Http\JsonResponse
    {//Gets IP from A record for a domain
        switch ($type) {
            case "A":
                $data = dns_get_record($domain_name, DNS_A);
                if (isset($data['0']['ip'])) {
                    return response()->json(array('ip' => $data['0']['ip']))->header('Content-Type', 'application/json');
                }
                break;
            case "AAAA":
                $data = dns_get_record($domain_name, DNS_AAAA);
                if (isset($data['0']['ipv6'])) {
                    return response()->json(array('ip' => $data['0']['ipv6']))->header('Content-Type', 'application/json');
                }
                break;
        }
        return response()->json(array('ip' => null))->header('Content-Type', 'application/json');
    }

}
