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
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function checkIsUp(Server $server): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server);

        return response()->json(Ping::checkIsUp($server), 200)->header('Content-Type', 'application/json');
    }

    public function pingFromTo(Server $server1, Server $server2): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server1);
        $this->authorize('view', $server2);

        $result = Ping::fromServerToServer($server1, $server2);

        return response()->json($result)->header('Content-Type', 'application/json');
    }

}
