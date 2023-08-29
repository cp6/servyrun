<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\DatabaseTableColumnController;

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {

    //Refresh Database tables
    Route::get('/db/{database}/refresh', [DatabaseController::class, 'refresh'])->name('api.db.refresh');
    //Refresh Database table columns
    Route::get('/db/{database}/table/{databaseTable}/refresh', [DatabaseTableColumnController::class, 'refresh'])->name('api.db.table.refresh');
    //Get Database table sizes and row counts
    Route::get('/db/{database}/size', [DatabaseController::class, 'doSize'])->name('api.db.table.size');

    Route::get('/db/connection', [ApiController::class, 'dbConnectionIndex'])->name('api.db.connection.index');
    Route::get('/db/connection/help', [ApiController::class, 'dbConnectionHelp'])->name('api.db.connection.help');
    Route::get('/db/connection/{databaseConnection}', [ApiController::class, 'dbConnectionShow'])->name('api.db.connection.show');
    Route::get('/db/connection/{databaseConnection}/refresh', [ApiController::class, 'dbConnectionRefresh'])->name('api.db.connection.refresh');
    Route::get('/db/connection/{databaseConnection}/databases', [ApiController::class, 'dbConnectionDatabases'])->name('api.db.connection.databases');
    Route::patch('/db/connection/{databaseConnection}', [ApiController::class, 'dbConnectionUpdate'])->name('api.db.connection.update');
    Route::post('/db/connection', [ApiController::class, 'dbConnectionStore'])->name('api.db.connection.store');
    Route::delete('/db/connection/{databaseConnection}', [ApiController::class, 'dbConnectionDestroy'])->name('api.db.connection.destroy');

    Route::get('/db', [ApiController::class, 'dbIndex'])->name('api.db.index');
    Route::get('/db/help', [ApiController::class, 'dbHelp'])->name('api.db.help');
    Route::get('/db/{database}', [ApiController::class, 'dbShow'])->name('api.db.show');
    Route::get('/db/{database}/tables', [ApiController::class, 'dbTables'])->name('api.db.tables');
    Route::patch('/db/{database}', [ApiController::class, 'dbUpdate'])->name('api.db.update');
    Route::delete('/db/{database}', [ApiController::class, 'dbDestroy'])->name('api.db.destroy');

    Route::get('/db/table/{databaseTable}', [ApiController::class, 'dbTable'])->name('api.db.table');
    Route::delete('/db/table/{databaseTable}', [ApiController::class, 'dbTableDestroy'])->name('api.db.table.destroy');
    Route::get('/db/table/{databaseTable}/columns', [ApiController::class, 'dbColumnIndex'])->name('api.db.table.column.index');
    Route::post('/db/table/{databaseTable}/query', [ApiController::class, 'dbTableQuery'])->name('api.db.table.query');
    Route::get('/db/column/{databaseTableColumn}', [ApiController::class, 'dbColumnShow'])->name('api.db.table.column.show');
    Route::delete('/db/column/{databaseTableColumn}', [ApiController::class, 'dbColumnDestroy'])->name('api.db.table.column.destroy');

});
