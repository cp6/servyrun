<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ServerController;

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {

    Route::get('/servers', [ApiController::class, 'serversIndex'])->name('api.server.index');
    Route::get('/servers/help', [ApiController::class, 'serversHelp'])->name('api.server.help');
    Route::get('/servers/{server}', [ApiController::class, 'serversShow'])->name('api.server.show');
    Route::get('/servers/{server}/ip', [ServerController::class, 'ip'])->name('api.server.ip');//IP for the server
    Route::get('/servers/{server}/pings', [ApiController::class, 'serversPings'])->name('api.server.pings');
    Route::get('/servers/{server}/commands', [ApiController::class, 'serversCommands'])->name('api.server.commands');
    Route::get('/servers/{server}/connections', [ApiController::class, 'serversConnections'])->name('api.server.connections');
    Route::get('/servers/{server}/usage', [ApiController::class, 'serversUsageGet'])->name('api.server.usage.get');
    Route::get('/servers/{server}/usage/all', [ApiController::class, 'serversUsageAll'])->name('api.server.usage.all');
    Route::get('/servers/{server}/usage/cpu', [ApiController::class, 'serversUsageCpu'])->name('api.server.usage.cpu');
    Route::get('/servers/{server}/usage/ram', [ApiController::class, 'serversUsageRam'])->name('api.server.usage.ram');
    Route::get('/servers/{server}/usage/disk', [ApiController::class, 'serversUsageDisk'])->name('api.server.usage.disk');
    Route::patch('/servers/{server}', [ApiController::class, 'serversUpdate'])->name('api.server.update');
    Route::post('/servers', [ApiController::class, 'serversStore'])->name('api.server.store');
    Route::delete('/servers/{server}', [ApiController::class, 'serversDestroy'])->name('api.server.destroy');

});
