<?php

use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::get('/locations', [LocationController::class, 'index'])->name('location.index');
    Route::get('/locations/create', [LocationController::class, 'create'])->name('location.create');
    Route::post('/locations', [LocationController::class, 'store'])->name('location.store');
    Route::get('/locations/{location}', [LocationController::class, 'show'])->name('location.show');
    Route::get('/locations/{location}/edit', [LocationController::class, 'edit'])->name('location.edit');
    Route::patch('/locations/{location}', [LocationController::class, 'update'])->name('location.update');
    Route::delete('/locations/{location}', [LocationController::class, 'destroy'])->name('location.destroy');

});
