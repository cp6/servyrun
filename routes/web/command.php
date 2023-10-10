<?php

use App\Http\Controllers\CommandController;
use App\Http\Controllers\CommandGroupController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/commands', [CommandController::class, 'index'])->name('command.index');
    Route::get('/commands/create', [CommandController::class, 'create'])->name('command.create');
    Route::post('/commands', [CommandController::class, 'store'])->name('command.store');
    Route::get('/commands/{command}/edit', [CommandController::class, 'edit'])->name('command.edit');
    Route::patch('/commands/{command}', [CommandController::class, 'update'])->name('command.update');
    Route::delete('/commands/{command}', [CommandController::class, 'destroy'])->name('command.destroy');

    Route::get('/command-groups', [CommandGroupController::class, 'index'])->name('command-group.index');
    Route::get('/command-groups/create', [CommandGroupController::class, 'create'])->name('command-group.create');
    Route::post('/command-groups', [CommandGroupController::class, 'store'])->name('command-group.store');
    Route::get('/command-groups/{commandGroup}', [CommandGroupController::class, 'show'])->name('command-group.show');
    Route::get('/command-groups/{commandGroup}/run', [CommandGroupController::class, 'run'])->middleware(['throttle:12,1'])->name('command-group.run');
    Route::get('/command-groups/{commandGroup}/edit', [CommandGroupController::class, 'edit'])->name('command-group.edit');
    Route::patch('/command-groups/{commandGroup}', [CommandGroupController::class, 'update'])->name('command-group.update');
    Route::delete('/command-groups/{commandGroup}', [CommandGroupController::class, 'destroy'])->name('command-group.destroy');
});
