<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(): \Inertia\Response
    {
        if (Auth::check()) {//Logged in
            return Inertia::render('Dashboard', [
                'counts' => [
                    'servers' => \App\Models\Server::get()->count(),
                    'ips' => \App\Models\IpAddress::get()->count(),
                    'keys' => \App\Models\Key::get()->count(),
                    'connections' => \App\Models\Connection::get()->count(),
                    'dbs' => \App\Models\Database::get()->count(),
                    'pings' => \App\Models\Ping::get()->count(),
                    'commands' => \App\Models\Command::get()->count(),
                    'outputs' => \App\Models\CommandOutput::get()->count(),
                ],
                'RecentActions' => \App\Models\ActionLog::orderBy('created_at', 'desc')->take(10)->get()
            ]);
        }
        return Inertia::render('Auth/Login');//Not logged in
    }
}
