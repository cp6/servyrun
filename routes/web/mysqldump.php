<?php

use App\Http\Controllers\MySQLDumpController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/mysqldump', [MySQLDumpController::class, 'index'])->name('mysqldump.index');
    Route::get('/mysqldump/create', [MySQLDumpController::class, 'create'])->name('mysqldump.create');
    Route::post('/mysqldump', [MySQLDumpController::class, 'store'])->name('mysqldump.store');
    Route::get('/mysqldump/{mySQLDump}', [MySQLDumpController::class, 'show'])->name('mysqldump.show');
    Route::get('/mysqldump/{mySQLDump}/edit', [MySQLDumpController::class, 'edit'])->name('mysqldump.edit');
    Route::patch('/mysqldump/{mySQLDump}', [MySQLDumpController::class, 'update'])->name('mysqldump.update');
    Route::delete('/mysqldump/{mySQLDump}', [MySQLDumpController::class, 'destroy'])->name('mysqldump.destroy');
    Route::get('/mysqldump/{mySQLDump}/run', [MySQLDumpController::class, 'run'])->middleware(['throttle:8,1'])->name('mysqldump.run');

});
