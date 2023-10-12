<?php

use App\Http\Controllers\NetworkUsageController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\ServerUsageController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/servers', [ServerController::class, 'index'])->name('server.index');
    Route::get('/servers/create', [ServerController::class, 'create'])->name('server.create');
    Route::post('/servers', [ServerController::class, 'store'])->name('server.store');
    Route::get('/servers/{server}', [ServerController::class, 'show'])->name('server.show');
    Route::get('/servers/{server}/get-information', [ServerController::class, 'getInformation'])->middleware(['throttle:8,1'])->name('server.get-information');
    Route::get('/servers/{server}/usage/', [ServerUsageController::class, 'allUsage'])->name('server.usage.all');
    Route::get('/servers/{server}/usage/get', [ServerUsageController::class, 'getUsage'])->middleware(['throttle:8,1'])->name('server.usage');
    Route::get('/servers/{server}/network/get', [NetworkUsageController::class, 'store'])->middleware(['throttle:8,1'])->name('network.store');
    Route::get('/servers/{server}/usage/network', [ServerUsageController::class, 'networkUsage'])->name('servers.usage.network');
    Route::get('/servers/{server}/usage/ram', [ServerUsageController::class, 'ramUsage'])->name('server.usage.ram');
    Route::get('/servers/{server}/usage/cpu', [ServerUsageController::class, 'cpuUsage'])->name('server.usage.cpu');
    Route::get('/servers/{server}/usage/disk', [ServerUsageController::class, 'diskUsage'])->name('server.usage.disk');
    Route::get('/servers/{server}/uptime', [ServerController::class, 'getUptime'])->middleware(['throttle:8,1'])->name('server.uptime');
    Route::get('/servers/{server}/edit', [ServerController::class, 'edit'])->name('server.edit');
    Route::patch('/servers/{server}', [ServerController::class, 'update'])->name('server.update');
    Route::delete('/servers/{server}', [ServerController::class, 'destroy'])->name('server.destroy');

    Route::get('/servers/{server}/connections', [ServerController::class, 'getServerConnections'])->name('server.connections');
    Route::get('/servers/{server}/db-connections', [ServerController::class, 'getServerDatabaseConnections'])->name('server.db.connections');

});
