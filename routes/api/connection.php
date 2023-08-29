<?php

use App\Http\Controllers\ApiController;

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {

    Route::get('/connections', [ApiController::class, 'connectionsIndex'])->name('api.connection.index');
    Route::get('/connections/help', [ApiController::class, 'connectionsHelp'])->name('api.connection.help');
    Route::get('/connections/{connection}', [ApiController::class, 'connectionsShow'])->name('api.connection.show');
    Route::post('/connections/{connection}/run', [ApiController::class, 'connectionsRun'])->name('api.connection.run');
    Route::patch('/connections/{connection}', [ApiController::class, 'connectionsUpdate'])->name('api.connection.update');
    Route::post('/connections', [ApiController::class, 'connectionsStore'])->name('api.connection.store');
    Route::delete('/connections/{connection}', [ApiController::class, 'connectionsDestroy'])->name('api.connection.destroy');

});
