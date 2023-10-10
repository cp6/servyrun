<?php

use App\Http\Controllers\ConnectionController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/connections', [ConnectionController::class, 'index'])->name('connection.index');
    Route::post('/connections/{connection}/run', [ConnectionController::class, 'run'])->middleware(['throttle:20,1'])->name('connection.run');//Send commands here
    Route::get('/connections/create', [ConnectionController::class, 'create'])->name('connection.create');
    Route::post('/connections', [ConnectionController::class, 'store'])->name('connection.store');
    Route::get('/connections/{connection}', [ConnectionController::class, 'show'])->name('connection.show');
    Route::get('/connections/{connection}/debug', [ConnectionController::class, 'debug'])->middleware(['throttle:8,1'])->name('connection.debug');
    Route::get('/connections/{connection}/authenticated', [ConnectionController::class, 'authenticated'])->name('connection.authenticated');
    Route::get('/connections/{connection}/edit', [ConnectionController::class, 'edit'])->name('connection.edit');
    Route::patch('/connections/{connection}', [ConnectionController::class, 'update'])->name('connection.update');
    Route::delete('/connections/{connection}', [ConnectionController::class, 'destroy'])->name('connection.destroy');
    Route::get('/connections/{connection}/id', [ConnectionController::class, 'serverId'])->name('connection.id');

});
