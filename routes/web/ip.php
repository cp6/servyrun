<?php

use App\Http\Controllers\IpAddressController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/ips', [IpAddressController::class, 'index'])->name('ip.index');
    Route::get('/ips/create', [IpAddressController::class, 'create'])->name('ip.create');
    Route::post('/ips', [IpAddressController::class, 'store'])->name('ip.store');
    Route::get('/ips/{ipAddress}', [IpAddressController::class, 'show'])->name('ip.show');
    Route::get('/ips/{ipAddress}/edit', [IpAddressController::class, 'edit'])->name('ip.edit');
    Route::patch('/ips/{ipAddress}', [IpAddressController::class, 'update'])->name('ip.update');
    Route::delete('/ips/{ipAddress}', [IpAddressController::class, 'destroy'])->name('ip.destroy');

});
