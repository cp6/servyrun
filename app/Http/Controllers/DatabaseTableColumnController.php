<?php

namespace App\Http\Controllers;

use App\Models\Database;
use App\Models\DatabaseConnection;
use App\Models\DatabaseTable;
use App\Models\DatabaseTableColumn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DatabaseTableColumnController extends Controller
{
    public function showForTable(Database $database, DatabaseTable $databaseTable): \Inertia\Response
    {
        $this->authorize('view', $database);

        $table_columns = DatabaseTableColumn::where('table_id', $databaseTable->id)->get();

        if ($table_columns->isEmpty()) {
            $connection = DatabaseConnection::where('id', $database->db_connection_id)->firstOrFail();

            $connect = $connection->dbConnect($connection, $database->name);

            (!$connect) ? $columns = [] : $columns = $connection->returnColumns($databaseTable->name);

            foreach ($columns as $column) {

                DatabaseTableColumn::createNew($databaseTable, $column);

            }

            $table_columns = DatabaseTableColumn::where('table_id', $databaseTable->id)->get();

        }

        return Inertia::render('DatabaseTableColumns/Show', [
            'database' => $database->where('id', $database->id)->with(['conn'])->firstOrFail(),
            'table' => $databaseTable,
            'columns' => $table_columns,
            'alert' => \Session::get('alert')
        ]);

    }

    public function refresh(Database $database, DatabaseTable $databaseTable): \Illuminate\Http\JsonResponse
    {
        $connection = DatabaseConnection::where('id', $database->db_connection_id)->firstOrFail();

        $connect = $connection->dbConnect($connection, $database->name);

        if (!$connect) {
            $columns = [];
        } else {
            DB::table('database_table_columns')->where('table_id', $databaseTable->id)->delete();
            $columns = $connection->returnColumns($databaseTable->name);
        }

        foreach ($columns as $column) {

            DatabaseTableColumn::createNew($databaseTable, $column);

        }

        $table_columns = DatabaseTableColumn::where('table_id', $databaseTable->id)->get();

        return response()->json($table_columns)->header('Content-Type', 'application/json');
    }

    public function destroy(DatabaseTableColumn $databaseTableColumn)
    {
        $this->authorize('delete', $databaseTableColumn);

        $table_id = $databaseTableColumn->table_id;

        $databaseTableColumn->delete();

        return redirect(route('db.show.table', $table_id))->with(['alert' => ['type' => 'success', 'message' => 'Deleted successfully']]);
    }

    public function downloadColumn(Database $database, DatabaseTable $databaseTable, DatabaseTableColumn $databaseTableColumn): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $this->authorize('view', $databaseTableColumn);

        $connection = DatabaseConnection::where('id', $database->db_connection_id)->firstOrFail();

        $connection->dbConnect($connection, $database->name);

        $data = $connection->getTableColumnData($databaseTable, $databaseTableColumn);

        return response()->streamDownload(function () use ($data) {
            echo json_encode($data, JSON_THROW_ON_ERROR);
        }, date('Y-m-d-His') . "_{$database->name}_{$databaseTable->name}_{$databaseTableColumn->name}.json");

    }

}
