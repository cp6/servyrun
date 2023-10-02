<?php

use App\Http\Controllers\PingController;
use App\Http\Controllers\PingGroupController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/pings', [PingController::class, 'index'])->name('ping.index');
    Route::get('/ping/from/{server1}/to/{server2}', [PingController::class, 'pingFromTo'])->name('ping-from-to');
    Route::get('/ping/from/{server1}/to/{server2}/run', [PingController::class, 'runPingFromTo'])->name('run.ping-from-to');
    Route::get('/ping/{server}', [PingController::class, 'checkIsUp'])->name('check-is-up');

    Route::get('/ping-groups', [PingGroupController::class, 'index'])->name('ping-group.index');
    Route::get('/ping-groups/create', [PingGroupController::class, 'create'])->name('ping-group.create');
    Route::post('/ping-groups', [PingGroupController::class, 'store'])->name('ping-group.store');
    Route::get('/ping-groups/{pingGroup}', [PingGroupController::class, 'show'])->name('ping-group.show');
    Route::get('/ping-groups/{pingGroup}/run', [PingGroupController::class, 'run'])->name('ping-group.run');//Make this an API call
    Route::post('/ping-groups/{pingGroup}/ping', [PingGroupController::class, 'run'])->name('ping-group.run2');
    Route::get('/ping-groups/{pingGroup}/edit', [PingGroupController::class, 'edit'])->name('ping-group.edit');
    Route::patch('/ping-groups/{pingGroup}', [PingGroupController::class, 'update'])->name('ping-group.update');
    Route::delete('/ping-groups/{pingGroup}', [PingGroupController::class, 'destroy'])->name('ping-group.destroy');

});
