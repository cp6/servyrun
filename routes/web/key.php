<?php

use App\Http\Controllers\KeyController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/keys', [KeyController::class, 'index'])->name('key.index');
    Route::get('/keys/create', [KeyController::class, 'create'])->name('key.create');
    Route::post('/keys', [KeyController::class, 'store'])->name('key.store');
    Route::get('/keys/{key}', [KeyController::class, 'show'])->name('key.show');
    Route::get('/keys/{key}/download', [KeyController::class, 'download'])->name('key.download');
    Route::get('/keys/{key}/edit', [KeyController::class, 'edit'])->name('key.edit');
    Route::patch('/keys/{key}', [KeyController::class, 'update'])->name('key.update');
    Route::delete('/keys/{key}', [KeyController::class, 'destroy'])->name('key.destroy');

});
