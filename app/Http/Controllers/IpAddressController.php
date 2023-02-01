<?php

namespace App\Http\Controllers;

use App\Models\IpAddress;
use App\Models\IpAddressesAssigned;
use App\Models\Server;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IpAddressController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('IPs/Index', [
            'ips' => IpAddress::with(['server', 'db_conn'])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function edit(IpAddress $ipAddress): \Inertia\Response
    {
        return Inertia::render('IPs/Edit', [
            'resource' => IpAddress::where('id', $ipAddress->id)->with(['server', 'db_conn'])->firstOrFail(),
            'servers' => Server::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
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

        return redirect(route('ip.show', $ipAddress))->with(['alert_type' => 'success', 'alert_message' => 'IP address updated successfully']);
    }

    public function show(IpAddress $ipAddress): \Inertia\Response
    {
        $this->authorize('view', $ipAddress);
        return Inertia::render('IPs/Show', [
            'resource' => IpAddress::where('id', $ipAddress->id)->with(['assigned', 'assigned.server'])->firstOrFail(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function destroy(IpAddress $ipAddress)
    {
        $this->authorize('delete', $ipAddress);

        $assigned = IpAddressesAssigned::where('ip_id', $ipAddress->id)->get();

        if (is_null($assigned)) {
            return redirect(route('ip.index'))->with(['alert_type' => 'failure', 'alert_message' => 'Cannot delete an assigned IP']);
        }

        $ipAddress->delete();

        return redirect(route('ip.index'))->with(['alert_type' => 'success', 'alert_message' => 'IP address deleted successfully']);
    }

}
