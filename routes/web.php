<?php

use App\Http\Controllers\ActionLogController;
use App\Http\Controllers\CommandOutputController;
use App\Http\Controllers\DownloadedFileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    //Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Command outputs
    Route::get('/outputs/', [CommandOutputController::class, 'index'])->name('outputs.index');
    Route::get('/outputs/server/{server}', [CommandOutputController::class, 'showServer'])->name('outputs.show.server');
    Route::get('/outputs/command/{command}', [CommandOutputController::class, 'showCommand'])->name('outputs.show.command');
    Route::get('/outputs/{commandOutput}/full-pdf', [CommandOutputController::class, 'downloadFullPdf'])->name('outputs.full-pdf');
    Route::get('/outputs/{commandOutput}/simple-pdf', [CommandOutputController::class, 'downloadSimplePdf'])->name('outputs.simple-pdf');

    //Logs
    Route::get('/logs', [ActionLogController::class, 'index'])->name('log.index');
    Route::get('/logs/{actionLog}', [ActionLogController::class, 'show'])->name('log.show');
    Route::delete('/logs/destroy', [ActionLogController::class, 'destroyAll'])->name('log.destroy-all');

    //Downloaded file to server
    Route::get('/downloaded', [DownloadedFileController::class, 'index'])->name('downloaded.index');
    Route::get('/downloaded/{downloadedFile}', [DownloadedFileController::class, 'show'])->name('downloaded.show');
    Route::get('/downloaded/{downloadedFile}/download', [DownloadedFileController::class, 'download'])->name('downloaded.download');
    Route::get('/downloaded/{downloadedFile}/upload', [DownloadedFileController::class, 'uploadForm'])->name('downloaded.upload.form');
    Route::post('/downloaded/{downloadedFile}/upload', [DownloadedFileController::class, 'upload'])->name('downloaded.upload');
    Route::get('/downloaded/{downloadedFile}/upload/progress', [DownloadedFileController::class, 'uploadProgress'])->name('downloaded.upload.progress');//Upload from downloaded progress
    Route::delete('/downloaded/{downloadedFile}', [DownloadedFileController::class, 'destroy'])->name('downloaded.destroy');

});

//Public command output
Route::get('/outputs/{commandOutput}', [CommandOutputController::class, 'show'])->name('outputs.show');

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
