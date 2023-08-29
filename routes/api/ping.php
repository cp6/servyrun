<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\PingController;

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {

    Route::get('/pings', [ApiController::class, 'pingsIndex'])->name('api.pings.index');
    Route::get('/pings/{ping}', [ApiController::class, 'pingsShow'])->name('api.pings.show');
    Route::delete('/pings/{ping}', [ApiController::class, 'pingsDestroy'])->name('api.pings.destroy');

    Route::get('ping/{server}', [PingController::class, 'checkIsUp'])->name('ping.server');

    Route::get('/ping-groups', [ApiController::class, 'pingGroupsIndex'])->name('api.ping-group.index');
    Route::get('/ping-groups/{pingGroup}', [ApiController::class, 'pingGroupsShow'])->name('api.ping-group.show');
    Route::patch('/ping-groups/{pingGroup}', [ApiController::class, 'pingGroupsUpdate'])->name('api.ping-group.update');
    Route::post('/ping-groups', [ApiController::class, 'pingGroupsStore'])->name('api.ping-group.store');
    Route::delete('/ping-groups/{pingGroup}', [ApiController::class, 'pingGroupsDestroy'])->name('api.ping-group.destroy');

    //Add to a ping group
    Route::post('/ping-groups/{pingGroup}/add/{server}', [ApiController::class, 'pingGroupAdd'])->name('api.ping-group.add');
    //Remove from a ping group
    Route::delete('/ping-groups/{pingGroup}/remove/{server}', [ApiController::class, 'pingGroupRemove'])->name('api.ping-group.remove');

});
