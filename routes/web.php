<?php

use App\Http\Controllers\ActionLogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MyIdlersImportController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    //Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Logs
    Route::get('/logs', [ActionLogController::class, 'index'])->name('log.index');
    Route::get('/logs/{actionLog}', [ActionLogController::class, 'show'])->name('log.show');
    Route::delete('/logs/destroy', [ActionLogController::class, 'destroyAll'])->name('log.destroy-all');

    //My Idlers import from API
    Route::get('/import', [MyIdlersImportController::class, 'index'])->name('import.index');
    Route::post('/import', [MyIdlersImportController::class, 'store'])->name('import.store');

});

require __DIR__ . '/auth.php';
require __DIR__ . '/web/server.php';
require __DIR__ . '/web/sftp.php';
require __DIR__ . '/web/database.php';
require __DIR__ . '/web/ping.php';
require __DIR__ . '/web/command.php';
require __DIR__ . '/web/connection.php';
require __DIR__ . '/web/key.php';
require __DIR__ . '/web/ip.php';
require __DIR__ . '/web/mysqldump.php';
require __DIR__ . '/web/download.php';
require __DIR__ . '/web/location.php';
require __DIR__ . '/web/output.php';
