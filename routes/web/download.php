<?php

use App\Http\Controllers\DownloadedFileController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/downloaded', [DownloadedFileController::class, 'index'])->name('downloaded.index');
    Route::get('/downloaded/{downloadedFile}', [DownloadedFileController::class, 'show'])->name('downloaded.show');
    Route::get('/downloaded/{downloadedFile}/download', [DownloadedFileController::class, 'download'])->name('downloaded.download');
    Route::get('/downloaded/{downloadedFile}/upload', [DownloadedFileController::class, 'uploadForm'])->name('downloaded.upload.form');
    Route::post('/downloaded/{downloadedFile}/upload', [DownloadedFileController::class, 'upload'])->name('downloaded.upload');
    Route::get('/downloaded/{downloadedFile}/upload/progress', [DownloadedFileController::class, 'uploadProgress'])->name('downloaded.upload.progress');//Upload from downloaded progress
    Route::delete('/downloaded/{downloadedFile}', [DownloadedFileController::class, 'destroy'])->name('downloaded.destroy');

});
