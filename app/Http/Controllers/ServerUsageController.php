<?php

namespace App\Http\Controllers;

use App\Models\Server;
use App\Models\ServerUsage;
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
        return Inertia::render('Servers/Usage/All', [
            'resource' => $server,
            'usage' => ServerUsage::where('server_id', $server->id)->select(['ram_used_percent', 'cpu_usage', 'disk_used_percent', 'created_at'])->orderBy('id', 'desc')->take(360)->get()
        ]);
    }

    public function ramUsage(Server $server): \Inertia\Response
    {
        return Inertia::render('Servers/Usage/Ram', [
            'resource' => $server,
            'usage' => ServerUsage::where('server_id', $server->id)->select(['ram_used_percent', 'created_at'])->orderBy('id', 'desc')->take(720)->get()
        ]);
    }

    public function cpuUsage(Server $server): \Inertia\Response
    {
        return Inertia::render('Servers/Usage/Cpu', [
            'resource' => $server,
            'usage' => ServerUsage::where('server_id', $server->id)->select(['cpu_usage', 'created_at'])->orderBy('id', 'desc')->take(720)->get()
        ]);
    }

    public function diskUsage(Server $server): \Inertia\Response
    {
        return Inertia::render('Servers/Usage/Disk', [
            'resource' => $server,
            'usage' => ServerUsage::where('server_id', $server->id)->select(['disk_used_percent', 'created_at'])->orderBy('id', 'desc')->take(720)->get()
        ]);
    }

}
