<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(): \Inertia\Response
    {
        if (Auth::check()) {//Logged in
            return Inertia::render('Dashboard', [
                'serversCount' => \App\Models\Server::get()->count(),
                'IpCount' => \App\Models\IpAddress::get()->count(),
                'KeyCount' => \App\Models\Key::get()->count(),
                'ConnectionCount' => \App\Models\Connection::get()->count(),
                'DbCount' => \App\Models\Database::get()->count(),
                'PingsCount' => \App\Models\Ping::get()->count(),
                'CommandCount' => \App\Models\Command::get()->count(),
                'OutputCount' => \App\Models\CommandOutput::get()->count(),
                'RecentActions' => \App\Models\ActionLog::orderBy('created_at', 'desc')->take(10)->get()
            ]);
        }
        return Inertia::render('Auth/Login');//Not logged in
    }
}
