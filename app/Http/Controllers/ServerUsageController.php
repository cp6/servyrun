<?php

namespace App\Http\Controllers;

use App\Models\NetworkUsage;
use App\Models\Server;
use App\Models\ServerUsage;
use Carbon\Carbon;
use Inertia\Inertia;

class ServerUsageController extends Controller
{
    public function getUsage(Server $server): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server);

        $latest_usage = Server::insertServerUsage($server);

        return response()->json($latest_usage)->header('Content-Type', 'application/json');
    }

    public function allUsage(Server $server): \Inertia\Response
    {
        $this->authorize('view', $server);

        return Inertia::render('Servers/Usage/All', [
            'resource' => $server,
            'usage' => ServerUsage::where('server_id', $server->id)->select(['ram_used_percent', 'cpu_usage', 'disk_used_percent', 'created_at'])->orderBy('id', 'desc')->take(360)->get()
        ]);
    }

    public function networkUsage(Server $server): \Inertia\Response
    {
        $this->authorize('view', $server);

        return Inertia::render('Servers/Usage/Network', [
            'resource' => $server,
            'usage' => NetworkUsage::where('server_id', $server->id)->select(['rx_mb', 'tx_mb', 'total_mb', 'datetime'])->orderBy('id', 'desc')->take(720)->get()
        ]);
    }

    public function ramUsage(Server $server): \Inertia\Response
    {
        $this->authorize('view', $server);

        return Inertia::render('Servers/Usage/Ram', [
            'resource' => $server,
            'usage' => ServerUsage::where('server_id', $server->id)->select(['ram_used_percent', 'created_at'])->orderBy('id', 'desc')->take(720)->get()
        ]);
    }

    public function cpuUsage(Server $server): \Inertia\Response
    {
        $this->authorize('view', $server);

        $high_24h = ServerUsage::where('server_id', $server->id)->where('created_at', '>=', Carbon::now()->subDay()->toDateTimeString())
            ->select(['cpu_usage', 'created_at'])->orderBy('cpu_usage', 'desc')->first();
        return Inertia::render('Servers/Usage/Cpu', [
            'resource' => $server,
            'high_24h' => $high_24h,
            'usage' => ServerUsage::where('server_id', $server->id)->select(['cpu_usage', 'created_at'])->orderBy('id', 'desc')->take(720)->get()
        ]);
    }

    public function diskUsage(Server $server): \Inertia\Response
    {
        $this->authorize('view', $server);

        return Inertia::render('Servers/Usage/Disk', [
            'resource' => $server,
            'usage' => ServerUsage::where('server_id', $server->id)->select(['disk_used_percent', 'created_at'])->orderBy('id', 'desc')->take(720)->get()
        ]);
    }

}
