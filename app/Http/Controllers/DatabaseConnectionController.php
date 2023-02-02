<?php

namespace App\Http\Controllers;

use App\Models\Database;
use App\Models\DatabaseConnection;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class DatabaseConnectionController extends Controller
{
    public function index()
    {
        return Inertia::render('DatabaseConnections/Index', [
            'connections' => DatabaseConnection::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function create()
    {
        return Inertia::render('DatabaseConnections/Create', [
            'servers' => Server::get(),
            'title' => fake()->colorName() . '-' . fake()->numberBetween(1, 999),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'server_id' => 'string|nullable|size:8',
            'address' => 'string|required|max:125',
            'title' => 'string|sometimes|nullable|max:64',
            'port' => 'integer|required',
            'username' => 'string|required',
            'password' => 'string|nullable'
        ]);

        try {
            $db_connection = new DatabaseConnection();
            $db_connection->server_id = $request->server_id;
            $db_connection->title = $request->title;
            $db_connection->host = $request->address;
            $db_connection->port = $request->port ?? 3306;
            $db_connection->username = $request->username ?? 'root';
            $db_connection->password = ($request->password) ? Crypt::encryptString($request->password) : null;
            $db_connection->save();

        } catch (\Exception $exception) {

            return redirect(route('db.connection.create'))->with(['alert_type' => 'failure', 'alert_message' => 'DB connection could not be created error ' . $exception->getMessage()]);
        }

        return redirect(route('db.connection.show', $db_connection))->with(['alert_type' => 'success', 'alert_message' => 'DB connection created successfully']);

    }

    public function show(DatabaseConnection $databaseConnection)
    {
        $this->authorize('view', $databaseConnection);

        return Inertia::render('DatabaseConnections/Show', [
            'resource' => $databaseConnection,
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function canConnect(DatabaseConnection $databaseConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $databaseConnection);

        try {
            $result = DatabaseConnection::tryConnection($databaseConnection);
        } catch (\Exception $exception) {
            $result = false;
        }

        return response()->json(['result' => $result], 200)->header('Content-Type', 'application/json');
    }

    public function getDatabases(DatabaseConnection $databaseConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $databaseConnection);

        /*$databases = Database::where('db_connection_id', $databaseConnection->id)->get();

        if ($databases->isNotEmpty()){
            return response()->json(['databases' => $databases->pluck('name')], 200)->header('Content-Type', 'application/json');
        }*/

        $connect = $databaseConnection->dbConnect($databaseConnection, '');

        if (!$connect) {
            return response()->json(['message' => 'Could not connect', 'databases' => null], 400)->header('Content-Type', 'application/json');
        }

        return response()->json(['databases' => $databaseConnection->returnDatabases()], 200)->header('Content-Type', 'application/json');

    }

    public function getUpdateVersion(DatabaseConnection $databaseConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $databaseConnection);

        if (is_null($databaseConnection->version)) {

            $connect = $databaseConnection->dbConnect($databaseConnection, '');

            if (!$connect) {
                return response()->json(['message' => 'Could not connect', 'databases' => null], 400)->header('Content-Type', 'application/json');
            }

            $version = $databaseConnection->getVersion();

            if (str_contains($version, 'mysql')) {
                $type = 1;
            } elseif (str_contains($version, 'maria')) {
                $type = 2;
            } elseif (str_contains($version, 'postgre')) {
                $type = 4;
            } elseif (str_contains($version, 'redis')) {
                $type = 5;
            } else {
                $type = 6;
            }

            $databaseConnection->version = $version;
            $databaseConnection->type = $type;
            $databaseConnection->save();
        }

        return response()->json(['version' => $databaseConnection->version], 200)->header('Content-Type', 'application/json');

    }

    public function edit(DatabaseConnection $databaseConnection)
    {
        //
    }

    public function update(Request $request, DatabaseConnection $databaseConnection)
    {
        $this->authorize('update', $databaseConnection);

    }

    public function destroy(DatabaseConnection $databaseConnection)
    {
        $this->authorize('delete', $databaseConnection);

        $databaseConnection->delete();

        return redirect(route('db.connection.index'))->with(['alert_type' => 'success', 'alert_message' => 'Database connection deleted successfully']);
    }

}
