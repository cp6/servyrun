<?php

use App\Http\Controllers\DatabaseConnectionController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\DatabaseTableColumnController;
use App\Http\Controllers\DatabaseTableController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    //Database connections
    Route::get('/db/connection', [DatabaseConnectionController::class, 'index'])->name('db.connection.index');//Show all database connections
    Route::get('/db/connection/create', [DatabaseConnectionController::class, 'create'])->name('db.connection.create');//Create a database connection
    Route::post('/db/connection', [DatabaseConnectionController::class, 'store'])->name('db.connection.store');
    Route::get('/db/connection/{databaseConnection}', [DatabaseConnectionController::class, 'show'])->name('db.connection.show');//Show database connection
    Route::get('/db/connection/{databaseConnection}/connect', [DatabaseConnectionController::class, 'canConnect'])->name('db.connection.connect');
    Route::get('/db/connection/{databaseConnection}/databases', [DatabaseConnectionController::class, 'getDatabases'])->name('db.connection.databases');
    Route::get('/db/connection/{databaseConnection}/version', [DatabaseConnectionController::class, 'getUpdateVersion'])->middleware(['throttle:8,1'])->name('db.connection.version');
    Route::get('/db/connection/{databaseConnection}/privileges', [DatabaseConnectionController::class, 'getPrivileges'])->middleware(['throttle:8,1'])->name('db.connection.privileges');
    Route::get('/db/connection/{databaseConnection}/edit', [DatabaseConnectionController::class, 'edit'])->name('db.connection.edit');//Edit database connection
    Route::patch('/db/connection/{databaseConnection}', [DatabaseConnectionController::class, 'update'])->name('db.connection.update');
    Route::delete('/db/connection/{databaseConnection}', [DatabaseConnectionController::class, 'destroy'])->name('db.connection.destroy');//Delete database connection
    Route::delete('/db/connection/{databaseConnection}', [DatabaseConnectionController::class, 'destroy'])->name('db.connection.destroy');//Delete database connection

    //Databases
    Route::get('/db', [DatabaseController::class, 'index'])->name('db.index');//Show all databases
    Route::get('/db/create', [DatabaseController::class, 'create'])->name('db.create');//Create a database
    Route::post('/db', [DatabaseController::class, 'store'])->name('db.store');
    Route::get('/db/{database}', [DatabaseController::class, 'show'])->name('db.show');//Show database tables maybe???
    Route::get('/db/{database}/edit', [DatabaseController::class, 'edit'])->name('db.edit');//Edit a database
    Route::patch('/db/{database}', [DatabaseController::class, 'update'])->name('db.update');
    Route::delete('/db/{database}', [DatabaseController::class, 'destroy'])->name('db.destroy');//Delete a database

    //Database tables
    Route::get('/db/{database}/tables', [DatabaseController::class, 'showTables'])->name('db.show.tables');//Show database tables
    Route::get('/db/{database}/tables/json', [DatabaseController::class, 'showTablesJson'])->name('db.show.tables.json');//Show database tables
    Route::delete('db/{database}/table/', [DatabaseController::class, 'destroy'])->name('db.show.tables.destroy');

    Route::get('/db/{database}/table/{databaseTable}/download', [DatabaseTableController::class, 'downloadTable'])->name('db.table.columns.download');//Download the table

    //Database table columns
    Route::get('/db/{database}/table/{databaseTable}', [DatabaseTableColumnController::class, 'showForTable'])->name('db.table.columns.show');//Show database table columns
    Route::get('/db/{database}/table/{databaseTable}/pdf', [DatabaseTableColumnController::class, 'downloadPdf'])->middleware(['throttle:8,1'])->name('db.table.columns.pdf');//Show database table columns
    Route::get('/db/{database}/table/{databaseTable}/{databaseTableColumn}', [DatabaseTableColumnController::class, 'downloadColumn'])->name('db.table.columns.download.single');
    Route::get('db/{database}/table/{databaseTable}/rows', [DatabaseTableController::class, 'getRowCount'])->name('db.table.columns.rows');
    Route::get('db/{database}/table/{databaseTable}/size', [DatabaseTableController::class, 'getSize'])->name('db.table.columns.size');

});
