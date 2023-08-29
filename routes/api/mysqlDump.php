<?php

use App\Http\Controllers\ApiController;


Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {

    Route::get('/mysqldumps', [ApiController::class, 'mysqlDumpsIndex'])->name('api.mysqldumps.index');
    Route::get('/mysqldumps/help', [ApiController::class, 'mysqlDumpsHelp'])->name('api.mysqldumps.help');
    Route::get('/mysqldumps/{mySQLDump}', [ApiController::class, 'mysqlDumpsShow'])->name('api.mysqldumps.show');
    Route::get('/mysqldumps/{mySQLDump}/run', [ApiController::class, 'mysqlDumpsRun'])->name('api.mysqldumps.run');
    Route::patch('/mysqldumps/{mySQLDump}', [ApiController::class, 'mysqlDumpsUpdate'])->name('api.mysqldumps.update');
    Route::post('/mysqldumps', [ApiController::class, 'mysqlDumpsStore'])->name('api.mysqldumps.store');
    Route::delete('/mysqldumps/{mySQLDump}', [ApiController::class, 'mysqlDumpsDestroy'])->name('api.mysqldumps.destroy');

});
