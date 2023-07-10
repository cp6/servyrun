<?php

namespace App\Http\Controllers;

use App\Models\Database;
use App\Models\DatabaseConnection;
use App\Models\DatabaseTable;

class DatabaseTableController extends Controller
{
    public function destroy(DatabaseTable $databaseTable)
    {
        $this->authorize('delete', $databaseTable);

        try {
            $databaseTable->delete();
        } catch (\Exception $exception) {
            return redirect(route('db.show', $databaseTable))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('db.index'))->with(['alert' => ['type' => 'success', 'message' => 'Table deleted successfully']]);
    }

    public function getColumns(DatabaseTable $databaseTable): \Illuminate\Http\JsonResponse
    {
        $connection = $databaseTable->with(['database.conn'])->firstOrFail();

        $db = new DatabaseConnection();

        $connect = $db->dbConnect($connection->database->conn->host, $connection->database->name, $connection->database->conn->username, $connection->database->conn->password);

        if (!$connect) {
            return response()->json(['message' => 'Could not connect', 'columns' => null], 400)->header('Content-Type', 'application/json');
        }

        return response()->json(['columns' => $db->returnColumns($databaseTable->name)])->header('Content-Type', 'application/json');

    }

    public function getRowCount(Database $database, DatabaseTable $databaseTable): ?int
    {
        $connection = $databaseTable->where('id', $databaseTable->id)->with(['database.conn'])->firstOrFail();

        $db = new DatabaseConnection();

        $db->dbConnect($connection->database->conn->host, $connection->database->name, $connection->database->conn->username, $connection->database->conn->password);

        return $db->returnTableRowCount($databaseTable);
    }

    public function getSize(Database $database, DatabaseTable $databaseTable): ?float
    {
        $connection = $databaseTable->where('id', $databaseTable->id)->with(['database.conn'])->firstOrFail();

        $db = new DatabaseConnection();

        $db->dbConnect($connection->database->conn->host, $connection->database->name, $connection->database->conn->username, $connection->database->conn->password);

        return $db->returnTableSizeMb($databaseTable);
    }

    public function downloadTable(Database $database, DatabaseTable $databaseTable): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $this->authorize('view', $databaseTable);

        $connection = DatabaseConnection::where('id', $database->db_connection_id)->firstOrFail();

        $connection->dbConnect($connection, $database->name);

        $data = $connection->getAllTableData($databaseTable);

        return response()->streamDownload(function () use ($data) {
            echo json_encode($data, JSON_THROW_ON_ERROR);
        }, date('Y-m-d-His') . "_{$database->name}_{$databaseTable->name}.json");

    }

}
