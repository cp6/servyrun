<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Database;
use App\Models\DatabaseConnection;
use App\Models\MySQLDump;
use App\Models\Server;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MySQLDumpController extends Controller
{
    public function index()
    {
        //
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('MySQLDumps/Create', [
            //'connections' => Connection::get(),
            'servers' => Server::get(),
            'databases' => Database::get(),
            'databaseConnections' => DatabaseConnection::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function store(Request $request)
    {
        //
        dd($request->all());
    }

    public function show(MySQLDump $mySQLDump)
    {
        $this->authorize('view', $mySQLDump);

    }

    public function edit(MySQLDump $mySQLDump)
    {
        $this->authorize('view', $mySQLDump);

    }

    public function update(Request $request, MySQLDump $mySQLDump)
    {
        $this->authorize('update', $mySQLDump);

    }

    public function destroy(MySQLDump $mySQLDump)
    {
        $this->authorize('delete', $mySQLDump);

    }
}
