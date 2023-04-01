<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use App\Models\Database;
use App\Models\DatabaseConnection;
use App\Models\MySQLDump;
use App\Models\Server;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MySQLDumpController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('MySQLDumps/Index', [
            'dumps' => MySQLDump::with(['server', 'database', 'database_conn', 'conn'])->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('MySQLDumps/Create', [
            'servers' => Server::get(),
            'databases' => Database::get(),
            'databaseConnections' => DatabaseConnection::get(),
            'alert' => \Session::get('alert')
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

            return redirect(route('mysqldump.create'))->with(['alert' => ['type' => 'failure', 'message' => 'MySQL dump could not be created error ' . $exception->getCode()]]);
        }

        return redirect(route('mysqldump.show', $mysql_dump))->with(['alert' => ['type' => 'success', 'message' => 'Create MySQLdump successfully']]);
    }

    public function show(MySQLDump $mySQLDump): \Inertia\Response
    {
        $this->authorize('view', $mySQLDump);

        return Inertia::render('MySQLDumps/Show', [
            'resource' => MySQLDump::where('id', $mySQLDump->id)->with(['server', 'conn', 'database', 'database_conn'])->first(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function edit(MySQLDump $mySQLDump): \Inertia\Response
    {
        $this->authorize('view', $mySQLDump);

        return Inertia::render('MySQLDumps/Edit', [
            'resource' => MySQLDump::where('id', $mySQLDump->id)->with(['server', 'conn', 'database', 'database_conn'])->first(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function update(Request $request, MySQLDump $mySQLDump)
    {
        $this->authorize('update', $mySQLDump);

        $request->validate([
            'these_tables' => 'string|nullable|sometimes|max:255',
            'save_to' => 'string|sometimes|nullable|max:64',
            'save_as' => 'string|sometimes|nullable|max:64',
            'compress' => 'integer|required',
            'option' => 'integer|sometimes|nullable',
            'custom_flags' => 'string|nullable|sometimes|max:64'
        ]);

        try {

            $mySQLDump->update([
                'these_tables' => $request->these_tables ?? null,
                'save_to' => $request->save_to ?? null,
                'save_as' => $request->save_as,
                'compress' => $request->compress,
                'option' => $request->option ?? null,
                'custom_flags' => $request->custom_flags ?? null
            ]);

        } catch (\Exception $exception) {

            return redirect(route('mysqldump.edit', $mySQLDump))->with(['alert' => ['type' => 'failure', 'message' => 'MySQL dump could not be updated error ' . $exception->getMessage()]]);
        }

        return redirect(route('mysqldump.show', $mySQLDump))->with(['alert' => ['type' => 'success', 'message' => 'MySQL dump was updated successfully']]);

    }

    public function destroy(MySQLDump $mySQLDump)
    {
        $this->authorize('delete', $mySQLDump);

        try {
            $mySQLDump->delete();
        } catch (\Exception $exception) {
            return redirect(route('mysqldump.show', $mySQLDump))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('mysqldump.index'))->with(['alert' => ['type' => 'success', 'message' => 'MySQL dump deleted successfully']]);
    }

    public function run(MySQLDump $mySQLDump): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $mySQLDump);

        $run = MySQLDump::runCommand($mySQLDump);

        return response()->json(['result' => $run])->header('Content-Type', 'application/json');
    }

}
