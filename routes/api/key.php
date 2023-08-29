<?php

use App\Http\Controllers\ApiController;

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {

    Route::get('/keys', [ApiController::class, 'keysIndex'])->name('api.keys.index');
    Route::get('/keys/{key}', [ApiController::class, 'keysShow'])->name('api.keys.show');
    Route::patch('/keys/{key}', [ApiController::class, 'keysUpdate'])->name('api.keys.update');
    Route::delete('/keys/{key}', [ApiController::class, 'keysDestroy'])->name('api.keys.destroy');
    Route::post('/keys', [ApiController::class, 'keysStore'])->name('api.keys.store');

});
