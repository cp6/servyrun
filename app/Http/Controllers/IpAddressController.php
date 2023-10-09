<?php

namespace App\Http\Controllers;

use App\Models\IpAddress;
use App\Models\Server;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IpAddressController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('IPs/Index', [
            'ips' => IpAddress::with(['server'])->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('IPs/Create', [
            'servers' => Server::get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'server_id' => 'string|required|size:8',
            'ip' => 'ip|required'
        ]);

        try {

            $ip_address = new IpAddress;
            $ip_address->server_id = $request->server_id;
            $ip_address->ip = $request->ip;
            $ip_address->is_ipv4 = (filter_var($request->ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) ? 0 : 1;
            $ip_address->is_ssh = 0;
            $ip_address->is_main = 0;
            $ip_address->save();

        } catch (\Exception $exception) {

            return redirect(route('ip.create'))->with(['alert' => ['type' => 'failure', 'message' => 'IP could not be created error ' . $exception->getCode()]]);
        }

        IpAddress::fetchUpdateIpDetails($ip_address);//Get IP ASN and GEO data etc

        return redirect(route('ip.show', $ip_address))->with(['alert' => ['type' => 'success', 'message' => 'IP address created successfully']]);
    }

    public function edit(IpAddress $ipAddress): \Inertia\Response
    {
        $this->authorize('view', $ipAddress);

        return Inertia::render('IPs/Edit', [
            'resource' => IpAddress::where('id', $ipAddress->id)->with(['server'])->firstOrFail(),
            'servers' => Server::get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function update(Request $request, IpAddress $ipAddress)
    {
        $this->authorize('update', $ipAddress);

        $request->validate([
            'ip' => 'ip|required',
            'server_id' => 'string|required|size:8',
            'asn' => 'string|nullable|sometimes|max:255',
            'org' => 'string|nullable|sometimes|max:255',
            'isp' => 'string|nullable|sometimes|max:255',
            'timezone_gmt' => 'string|nullable|sometimes|max:255',
            'country' => 'string|nullable|sometimes|max:255',
            'city' => 'string|nullable|sometimes|max:255',
            'continent' => 'string|nullable|sometimes|max:255'
        ]);

        $ipAddress->update([
            'ip' => $request->ip,
            'server_id' => $request->server_id,
            'asn' => $request->asn ?? null,
            'org' => $request->org,
            'isp' => $request->isp,
            'timezone_gmt' => $request->timezone_gmt ?? null,
            'country' => $request->country ?? null,
            'city' => $request->city ?? null,
            'continent' => $request->continent ?? null
        ]);

        return redirect(route('ip.show', $ipAddress))->with(['alert' => ['type' => 'success', 'message' => 'IP address updated successfully']]);
    }

    public function show(IpAddress $ipAddress): \Inertia\Response
    {
        $this->authorize('view', $ipAddress);

        return Inertia::render('IPs/Show', [
            'resource' => IpAddress::where('id', $ipAddress->id)->with(['server'])->firstOrFail(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function destroy(IpAddress $ipAddress)
    {
        $this->authorize('delete', $ipAddress);

        try {
            $ipAddress->delete();
        } catch (\Exception $exception) {
            return redirect(route('ip.show', $ipAddress))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('ip.index'))->with(['alert' => ['type' => 'success', 'message' => 'IP address deleted successfully']]);
    }

    public function geoIpUpdate(IpAddress $ipAddress): \Illuminate\Http\JsonResponse
    {//Update data from GEO IP API call
        $this->authorize('view', $ipAddress);

        IpAddress::fetchUpdateIpDetails($ipAddress);

        return response()->json($ipAddress)->header('Content-Type', 'application/json');
    }

}
