<?php

namespace App\Http\Controllers;

use App\Models\Database;
use App\Models\DatabaseConnection;
use App\Models\DatabaseTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DatabaseController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Databases/Index', [
            'databases' => Database::with(['conn'])->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Databases/Create', [
            'connections' => DatabaseConnection::get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'db_connection_id' => 'string|required|size:8',
            'name' => 'string|required',
            'name_select' => 'string|sometimes|nullable'
        ]);

        try {
            $database = new Database();
            $database->db_connection_id = $request->db_connection_id;
            $database->name = $request->name ?? $request->name_select;
            $database->save();
        } catch (\Exception $exception) {

            return redirect(route('db.create'))->with(['alert' => ['type' => 'failure', 'message' => 'Database could not be created error ' . $exception->getMessage()]]);
        }

        return redirect(route('db.show', $database))->with(['alert' => ['type' => 'success', 'message' => 'Database created successfully']]);
    }

    public function show(Database $database): \Inertia\Response
    {
        $this->authorize('view', $database);

        return Inertia::render('Databases/Show', [
            'resource' => $database->where('id', $database->id)->with(['conn'])->firstOrFail(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function destroy(Database $database)
    {
        $this->authorize('delete', $database);

        try {
            $database->delete();
        } catch (\Exception $exception) {
            return redirect(route('db.show', $database))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('db.index'))->with(['alert' => ['type' => 'success', 'message' => 'Database deleted successfully']]);
    }

    public function getTables(Database $database): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $database);

        $connection = DatabaseConnection::where('id', $database->db_connection_id)->firstOrFail();

        $connect = $connection->dbConnect($connection, $database->name);

        if (!$connect) {
            return response()->json(['message' => 'Could not connect', 'tables' => null], 400)->header('Content-Type', 'application/json');
        }

        return response()->json(['databases' => $connection->returnTables()])->header('Content-Type', 'application/json');

    }

    public function showTables(Database $database): \Inertia\Response
    {
        $this->authorize('view', $database);

        $tables = DatabaseTable::where('database_id', $database->id)->orderBy('name')->get();

        if ($tables->isEmpty()) {
            $connection = DatabaseConnection::where('id', $database->db_connection_id)->firstOrFail();

            $connect = $connection->dbConnect($connection, $database->name);

            if (!$connect) {
                $db_tables = [];
            } else {
                $db_tables = $connection->returnTables();
            }

            foreach ($db_tables as $table) {
                $database_table = new DatabaseTable();
                $database_table->database_id = $database->id;
                $database_table->name = $table;
                $database_table->save();
            }

            $tables = DatabaseTable::where('database_id', $database->id)->orderBy('name')->get();
        }

        return Inertia::render('DatabaseTables/Show', [
            'resource' => $database->where('id', $database->id)->with(['conn'])->firstOrFail(),
            'tables' => $tables,
            'alert' => \Session::get('alert')
        ]);
    }

    public function refresh(Database $database): \Illuminate\Http\JsonResponse
    {
        $connection = DatabaseConnection::where('id', $database->db_connection_id)->firstOrFail();

        $connect = $connection->dbConnect($connection, $database->name);

        if (!$connect) {
            $db_tables = [];
        } else {
            DB::table('database_tables')->where('database_id', $database->id)->delete();
            $db_tables = $connection->returnTables();
        }

        foreach ($db_tables as $table) {
            $database_table = new DatabaseTable();
            $database_table->database_id = $database->id;
            $database_table->name = $table;
            $database_table->save();
        }

        $tables = DatabaseTable::where('database_id', $database->id)->orderBy('name')->get();

        return response()->json($tables)->header('Content-Type', 'application/json');
    }

    public function doSize(Database $database): \Illuminate\Http\JsonResponse
    {
        $tables = DatabaseTable::where('database_id', $database->id)->orderBy('name')->get();

        $connection = DatabaseConnection::where('id', $database->db_connection_id)->firstOrFail();

        $connection->dbConnect($connection, $database->name);

        foreach ($tables as $table) {

            $database_table = DatabaseTable::where('database_id', $database->id)->where('user_id', \Auth::id())->where('name', $table->name)->first();
            $database_table->row_count = $connection->returnTableRowCount($table);
            $database_table->size_mb = $connection->returnTableSizeMb($table);
            $database_table->save();

        }

        $tables = DatabaseTable::where('database_id', $database->id)->get();

        return response()->json($tables)->header('Content-Type', 'application/json');
    }

    public function showTablesJson(string $database_name): \Illuminate\Http\JsonResponse
    {
        $database = Database::where('name', $database_name)->firstOrFail();

        $tables = DatabaseTable::where('database_id', $database->id)->orderBy('name')->get();

        return response()->json($tables)->header('Content-Type', 'application/json');
    }

}
