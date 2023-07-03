<?php

namespace App\Http\Controllers;

use App\Models\Database;
use App\Models\DatabaseConnection;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;
use PDO;

class DatabaseConnectionController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('DatabaseConnections/Index', [
            'connections' => DatabaseConnection::get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('DatabaseConnections/Create', [
            'servers' => Server::get(),
            'title' => fake()->colorName() . '-' . fake()->numberBetween(1, 999),
            'alert' => \Session::get('alert')
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
            $db = new PDO("mysql:host=$request->address;port=$request->port;dbname=;charset=utf8mb4", $request->username, $request->password, [PDO::ATTR_TIMEOUT => 3]);
        } catch (\Exception $exception) {
            return redirect(route('db.connection.create'))->with(['alert' => ['type' => 'failure', 'message' => 'DB connection could not be created error ' . $exception->getMessage()]]);
        }

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

            return redirect(route('db.connection.create'))->with(['alert' => ['type' => 'failure', 'message' => 'DB connection could not be created error ' . $exception->getMessage()]]);
        }

        return redirect(route('db.connection.show', $db_connection))->with(['alert' => ['type' => 'success', 'message' => 'DB connection created successfully']]);

    }

    public function show(DatabaseConnection $databaseConnection): \Inertia\Response
    {
        $this->authorize('view', $databaseConnection);

        return Inertia::render('DatabaseConnections/Show', [
            'resource' => $databaseConnection,
            'alert' => \Session::get('alert')
        ]);
    }

    public function edit(DatabaseConnection $databaseConnection): \Inertia\Response
    {
        $this->authorize('view', $databaseConnection);

        return Inertia::render('DatabaseConnections/Edit', [
            'resource' => $databaseConnection,
            'alert' => \Session::get('alert')
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

        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function getDatabases(DatabaseConnection $databaseConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $databaseConnection);

        $connect = $databaseConnection->dbConnect($databaseConnection, '');

        if (!$connect) {
            return response()->json(['message' => 'Could not connect', 'databases' => null], 400)->header('Content-Type', 'application/json');
        }

        return response()->json(['databases' => $databaseConnection->returnDatabases()])->header('Content-Type', 'application/json');

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

        return response()->json(['version' => $databaseConnection->version])->header('Content-Type', 'application/json');

    }

    public function getPrivileges(DatabaseConnection $databaseConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $databaseConnection);

        if (is_null($databaseConnection->privileges)) {

            $connect = $databaseConnection->dbConnect($databaseConnection, '');

            if (!$connect) {
                return response()->json(['message' => 'Could not connect', 'databases' => null], 400)->header('Content-Type', 'application/json');
            }

            $cu = $databaseConnection->getCurrentUser();
            $connection_type = substr($cu, strpos($cu, "@") + 1);

            $privileges = $databaseConnection->getPrivileges($connection_type, $databaseConnection->username);

            if (!$privileges) {
                return response()->json(['privileges' => null])->header('Content-Type', 'application/json');
            }

        }

        return response()->json(['privileges' => $databaseConnection->privileges])->header('Content-Type', 'application/json');

    }

    public function update(Request $request, DatabaseConnection $databaseConnection)
    {
        $this->authorize('update', $databaseConnection);

        $request->validate([
            'host' => 'string|required|max:125',
            'title' => 'string|sometimes|nullable|max:64',
            'port' => 'integer|required',
            'username' => 'string|required',
            'password' => 'string|nullable'
        ]);

        try {

            $databaseConnection->title = $request->title;
            $databaseConnection->host = $request->host;
            $databaseConnection->port = $request->port ?? 3306;
            $databaseConnection->username = $request->username ?? 'root';
            $databaseConnection->password = ($request->password) ? Crypt::encryptString($request->password) : null;
            $databaseConnection->save();

        } catch (\Exception $exception) {

            return redirect(route('db.connection.create'))->with(['alert' => ['type' => 'failure', 'message' => 'DB connection could not be updated error ' . $exception->getMessage()]]);
        }

        return redirect(route('db.connection.show', $databaseConnection))->with(['alert' => ['type' => 'success', 'message' => 'DB connection updated successfully']]);
    }

    public function destroy(DatabaseConnection $databaseConnection)
    {
        $this->authorize('delete', $databaseConnection);

        try {
            $databaseConnection->delete();
        } catch (\Exception $exception) {
            return redirect(route('db.connection.show', $databaseConnection))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('db.connection.index'))->with(['alert' => ['type' => 'success', 'message' => 'Database connection deleted successfully']]);
    }

}
