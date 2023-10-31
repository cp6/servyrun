<?php

use App\Http\Controllers\CommandOutputController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/outputs/', [CommandOutputController::class, 'index'])->name('outputs.index');
    Route::get('/outputs/server/{server}', [CommandOutputController::class, 'showServer'])->name('outputs.show.server');
    Route::get('/outputs/command/{command}', [CommandOutputController::class, 'showCommand'])->name('outputs.show.command');
    Route::get('/outputs/{commandOutput}/full-pdf', [CommandOutputController::class, 'downloadFullPdf'])->name('outputs.full-pdf');
    Route::get('/outputs/{commandOutput}/simple-pdf', [CommandOutputController::class, 'downloadSimplePdf'])->name('outputs.simple-pdf');

});

//Public command output
Route::get('/outputs/{commandOutput}', [CommandOutputController::class, 'show'])->name('outputs.show');
