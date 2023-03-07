<?php

namespace App\Http\Controllers;

use App\Models\Ping;
use App\Models\Server;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PingController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Pings/Index', [
            'pings' => Ping::with(['to_server', 'from_server'])->orderBy('created_at', 'desc')->take(999)->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function checkIsUp(Server $server): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server);

        return response()->json(Ping::checkIsUp($server), 200)->header('Content-Type', 'application/json');
    }

    public function pingFromTo(Server $server1, Server $server2): \Inertia\Response
    {
        return Inertia::render('Pings/FromTo', [
            'pings' => Ping::where('from_server_id', $server1->id)->where('server_id', $server2->id)
                ->with(['to_server.ip_ssh', 'from_server.ip_ssh'])->orderBy('created_at', 'desc')->take(999)->get(),
            'minPing' => Ping::where('from_server_id', $server1->id)->where('server_id', $server2->id)->orderBy('min')->pluck('min')->first(),
            'maxPing' => Ping::where('from_server_id', $server1->id)->where('server_id', $server2->id)->orderBy('max', 'desc')->pluck('max')->first(),
            'avgPing' => Ping::where('from_server_id', $server1->id)->where('server_id', $server2->id)->avg('avg'),
            'alert' => \Session::get('alert')
        ]);
    }

    public function runPingFromTo(Server $server1, Server $server2): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server1);
        $this->authorize('view', $server2);

        $result = Ping::fromServerToServer($server1, $server2);

        return response()->json($result)->header('Content-Type', 'application/json');
    }

}
