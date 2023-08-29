<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\SftpConnectionController;

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {

    Route::get('/sftp', [ApiController::class, 'sftpIndex'])->name('api.sftp.index');
    Route::get('/sftp/help', [ApiController::class, 'sftpHelp'])->name('api.sftp.help');
    Route::get('/sftp/{sftpConnection}', [ApiController::class, 'sftpShow'])->name('api.sftp.show');
    Route::get('/sftp/{sftpConnection}/directory', [SftpConnectionController::class, 'directoryContentsAsArray'])->name('api.sftp.directory.contents');//Folders & files in a directory
    Route::get('/sftp/{sftpConnection}/directory-contents', [SftpConnectionController::class, 'directoryContentsDetailedAsArray'])->name('api.sftp.directory.contents.details');//Details for folders & files in a directory
    Route::get('/sftp/{sftpConnection}/directory-files', [SftpConnectionController::class, 'directoryFilesDetailedAsArray'])->name('api.sftp.directory.files.details');//Details for files in a directory
    Route::get('/sftp/{sftpConnection}/file', [SftpConnectionController::class, 'fileDetailedAsArray'])->name('api.sftp.file.details');//Details about a file
    Route::patch('/sftp/{sftpConnection}', [ApiController::class, 'sftpUpdate'])->name('api.sftp.update');
    Route::post('/sftp', [ApiController::class, 'sftpStore'])->name('api.sftp.store');
    Route::delete('/sftp/{sftpConnection}', [ApiController::class, 'sftpDestroy'])->name('api.sftp.destroy');

});
