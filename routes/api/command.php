<?php

use App\Http\Controllers\ApiController;

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {

    Route::get('/commands', [ApiController::class, 'commandsIndex'])->name('api.commands.index');
    Route::get('/commands/{command}', [ApiController::class, 'commandsShow'])->name('api.commands.show');
    Route::patch('/commands/{command}', [ApiController::class, 'commandsUpdate'])->name('api.commands.update');
    Route::post('/commands', [ApiController::class, 'commandsStore'])->name('api.commands.store');
    Route::delete('/commands/{command}', [ApiController::class, 'commandsDestroy'])->name('api.commands.destroy');

    Route::get('/command-groups', [ApiController::class, 'commandGroupsIndex'])->name('api.command-group.index');
    Route::get('/command-groups/{commandGroup}', [ApiController::class, 'commandGroupsShow'])->name('api.command-group.show');
    Route::patch('/command-groups/{commandGroup}', [ApiController::class, 'commandGroupsUpdate'])->name('api.command-group.update');
    Route::post('/command-groups', [ApiController::class, 'commandGroupsStore'])->name('api.command-group.store');
    Route::delete('/command-groups/{commandGroup}', [ApiController::class, 'commandGroupsDestroy'])->name('api.command-group.destroy');

    //Add to a command group
    Route::post('/command-groups/{commandGroup}/add/{connection}', [ApiController::class, 'commandGroupAdd'])->name('api.command-group.add');
    //Remove from a command group
    Route::delete('/command-groups/{commandGroup}/remove/{connection}', [ApiController::class, 'commandGroupRemove'])->name('api.command-group.remove');

});
