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
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(DatabaseTableColumn $databaseTableColumn)
    {
        $this->authorize('view', $databaseTableColumn);
    }

    public function showForTable(Database $database, DatabaseTable $databaseTable): \Inertia\Response
    {
        $this->authorize('view', $database);

        $table_columns = DatabaseTableColumn::where('table_id', $databaseTable->id)->get();

        if ($table_columns->isEmpty()) {
            $connection = DatabaseConnection::where('id', $database->db_connection_id)->firstOrFail();

            $connect = $connection->dbConnect($connection, $database->name);

            if (!$connect) {
                $columns = [];
            } else {
                $columns = $connection->returnColumns($databaseTable->name);
            }

            foreach ($columns as $column) {

                $table_column = new DatabaseTableColumn();
                $table_column->table_id = $databaseTable->id;
                $table_column->name = $column['Field'];
                $table_column->type = $column['Type'];
                $table_column->is_nullable = ($column['Null'] === 'NO') ? 0 : 1;
                $table_column->key = ($column['Key'] === '') ? null : $column['Key'];
                $table_column->default = $column['Default'];
                $table_column->extra = ($column['Extra'] === '') ? null : $column['Extra'];
                $table_column->save();
            }

            $table_columns = DatabaseTableColumn::where('table_id', $databaseTable->id)->get();

        }


        return Inertia::render('DatabaseTableColumns/Show', [
            'database' => $database->with(['conn'])->firstOrFail(),
            'table' => $databaseTable,
            'columns' => $table_columns,
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
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

            $table_column = new DatabaseTableColumn();
            $table_column->table_id = $databaseTable->id;
            $table_column->name = $column['Field'];
            $table_column->type = $column['Type'];
            $table_column->is_nullable = ($column['Null'] === 'NO') ? 0 : 1;
            $table_column->key = ($column['Key'] === '') ? null : $column['Key'];
            $table_column->default = $column['Default'];
            $table_column->extra = ($column['Extra'] === '') ? null : $column['Extra'];
            $table_column->save();
        }

        $table_columns = DatabaseTableColumn::where('table_id', $databaseTable->id)->get();

        return response()->json($table_columns)->header('Content-Type', 'application/json');
    }

    public function edit(DatabaseTableColumn $databaseTableColumn)
    {
        //
    }

    public function update(Request $request, DatabaseTableColumn $databaseTableColumn)
    {
        $this->authorize('view', $databaseTableColumn);

    }

    public function destroy(DatabaseTableColumn $databaseTableColumn)
    {
        $this->authorize('delete', $databaseTableColumn);

    }
}
