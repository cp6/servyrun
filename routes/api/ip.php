<?php

use App\Http\Controllers\ApiController;

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {

    Route::get('/ips', [ApiController::class, 'ipsIndex'])->name('api.ips.index');
    Route::get('/ips/help', [ApiController::class, 'ipsHelp'])->name('api.ips.help');
    Route::get('/ips/{ipAddress}', [ApiController::class, 'ipsShow'])->name('api.ips.show');
    Route::get('/ips/{ipAddress}/geo', [ApiController::class, 'ipsGeo'])->name('api.ips.geo');
    Route::patch('/ips/{ipAddress}', [ApiController::class, 'ipsUpdate'])->name('api.ips.update');
    Route::post('/ips', [ApiController::class, 'ipsStore'])->name('api.ips.store');
    Route::delete('/ips/{ipAddress}', [ApiController::class, 'ipsDestroy'])->name('api.ips.destroy');

});
