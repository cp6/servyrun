<?php

use App\Http\Controllers\SftpConnectionController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    Route::get('/sftp/test', [SftpConnectionController::class, 'test'])->name('sftp.test');
    Route::get('/sftp', [SftpConnectionController::class, 'index'])->name('sftp.index');
    Route::get('/sftp/create', [SftpConnectionController::class, 'create'])->name('sftp.create');
    Route::post('/sftp/', [SftpConnectionController::class, 'store'])->name('sftp.store');
    Route::get('/sftp/{sftpConnection}', [SftpConnectionController::class, 'show'])->name('sftp.show');
    Route::get('/sftp/{sftpConnection}/authenticated', [SftpConnectionController::class, 'authenticated'])->name('sftp.authenticated');
    Route::get('/sftp/{sftpConnection}/download-to-server', [SftpConnectionController::class, 'createDownloadToServer'])->name('sftp.create-download-to-server');//Form to create download file to server
    Route::post('/sftp/{sftpConnection}/download-to-server', [SftpConnectionController::class, 'downloadToServer'])->name('sftp.download-to-server');//Download the file to server
    Route::get('/sftp/{sftpConnection}/download-to-server/progress', [SftpConnectionController::class, 'downloadToServerFileProgress'])->name('sftp.download-to-server.progress');//Downloaded to server progress
    Route::get('/sftp/{sftpConnection}/read', [SftpConnectionController::class, 'read'])->name('sftp.read');
    Route::post('/sftp/{sftpConnection}/read', [SftpConnectionController::class, 'readFile'])->name('sftp.read.file');//Get file for reading
    Route::get('/sftp/{sftpConnection}/raw/{filepath}', [SftpConnectionController::class, 'outputFileRaw'])->name('sftp.read.file.raw');//Get file for raw reading in browser
    Route::get('/sftp/{sftpConnection}/pdf/{filepath}', [SftpConnectionController::class, 'downloadFilePdf'])->name('sftp.read.file.pdf');//Get file for raw reading in browser
    Route::post('/sftp/{sftpConnection}/raw', [SftpConnectionController::class, 'generateReadRawResponse'])->name('sftp.read.file.raw.post');//Build JSON response for reading raw file
    Route::post('/sftp/{sftpConnection}/run', [SftpConnectionController::class, 'run'])->name('sftp.run');//Run SFTP command
    Route::post('/sftp/{sftpConnection}/download', [SftpConnectionController::class, 'downloadFile'])->name('sftp.download');//SFTP download file
    Route::post('/sftp/{sftpConnection}/upload', [SftpConnectionController::class, 'uploadFile'])->name('sftp.upload');//SFTP upload a file
    Route::get('/sftp/{sftpConnection}/upload-progress', [SftpConnectionController::class, 'uploadFileProgress'])->name('sftp.upload.progress');
    Route::post('/sftp/{sftpConnection}/overwrite', [SftpConnectionController::class, 'overwriteFile'])->name('sftp.overwrite');//SFTP upload an edited file
    Route::get('/sftp/{sftpConnection}/edit', [SftpConnectionController::class, 'edit'])->name('sftp.edit');
    Route::patch('/sftp/{sftpConnection}', [SftpConnectionController::class, 'update'])->name('sftp.update');
    Route::delete('/sftp/{sftpConnection}', [SftpConnectionController::class, 'destroy'])->name('sftp.destroy');

});
