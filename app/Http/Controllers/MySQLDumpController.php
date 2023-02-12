<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Database;
use App\Models\DatabaseConnection;
use App\Models\MySQLDump;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class MySQLDumpController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('MySQLDumps/Index', [
            'dumps' => MySQLDump::with(['server', 'database', 'database_conn', 'conn'])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
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
        $request->validate([
            'connection_id' => 'string|required|size:12',
            'server_id' => 'string|required|size:8',
            'database_name' => 'string|required',
            'db_connection_id' => 'string|required|size:8',
            'these_tables' => 'string|nullable|sometimes|max:255',
            'certain_tables' => 'string|nullable|sometimes|max:255',
            'save_to' => 'string|sometimes|nullable|max:64',
            'save_as' => 'string|sometimes|nullable|max:64',
            'compress' => 'integer|required',
            'option' => 'string|required',
            'custom_flags' => 'string|nullable|sometimes|max:64'
        ]);

        $db = Database::where('name', $request->database_name)->with(['conn'])->firstOrFail();

        try {

            $mysql_dump = new MySQLDump();
            $mysql_dump->connection_id = $request->connection_id;
            $mysql_dump->server_id = $request->server_id;
            $mysql_dump->database_id = $db->id;
            $mysql_dump->db_connection_id = $db->conn->id;
            $mysql_dump->these_tables = $request->these_tables;
            $mysql_dump->save_to = $request->save_to;
            $mysql_dump->save_as = $request->save_as;
            $mysql_dump->flags = $request->custom_flags;
            $mysql_dump->compress = (isset($request->compress)) ? (int)$request->compress : 0;
            $mysql_dump->option = (isset($request->option)) ? (int)$request->option : 0;
            $mysql_dump->save();

        } catch (\Exception $exception) {

            return redirect(route('mysqldump.create'))->with(['alert_type' => 'failure', 'alert_message' => 'MySQL dump could not be created error ' . $exception->getCode()]);
        }



        return redirect(route('mysqldump.show', $mysql_dump))->with(['alert_type' => 'success', 'alert_message' => 'Create MySQLdump successfully']);
    }

    public function show(MySQLDump $mySQLDump)
    {
        $this->authorize('view', $mySQLDump);

        return Inertia::render('MySQLDumps/Show', [
            'resource' => MySQLDump::where('id', $mySQLDump->id)->with(['server', 'conn', 'database', 'database_conn'])->first(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
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

    public function run(MySQLDump $mySQLDump)
    {
        $this->authorize('view', $mySQLDump);

        $run = MySQLDump::runCommand($mySQLDump);

        return response()->json(['result' => $run])->header('Content-Type', 'application/json');
    }
}
