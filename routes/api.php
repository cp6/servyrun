<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ServerController;
use Illuminate\Support\Facades\Route;

Route::get('/types', function () {
    return \App\Models\Type::all()->toJson();
});

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {
    //Everything in this group needs API bearer token

    Route::get('dns/{domainName}/{type}', [ServerController::class, 'getIpForDomain'])->name('domain-for-ip');

    Route::get('/user', [ApiController::class, 'userIndex'])->name('api.user.index');

    Route::get('/types', [ApiController::class, 'typesIndex'])->name('api.types.index');
    Route::get('/types/{type}', [ApiController::class, 'typesShow'])->name('api.types.show');

    Route::get('/locations', [ApiController::class, 'locationsIndex'])->name('api.locations.index');
    Route::get('/locations/{location}', [ApiController::class, 'locationsShow'])->name('api.locations.show');

    Route::get('/logs', [ApiController::class, 'actionLogsIndex'])->name('api.logs.index');
    Route::get('/logs/{actionLog}', [ApiController::class, 'actionLogsShow'])->name('api.logs.show');

    Route::get('/outputs', [ApiController::class, 'outputsIndex'])->name('api.outputs.index');
    Route::get('/outputs/server/{server}', [ApiController::class, 'outputsServerIndex'])->name('api.outputs.server.index');
    Route::get('/outputs/command/{command}', [ApiController::class, 'outputsCommandIndex'])->name('api.outputs.command.index');
    Route::get('/outputs/{commandOutput}', [ApiController::class, 'outputsShow'])->name('api.outputs.show');

    Route::get('/downloaded', [ApiController::class, 'downloadedIndex'])->name('api.downloaded.index');
    Route::get('/downloaded/{downloadedFile}', [ApiController::class, 'downloadedShow'])->name('api.downloaded.show');
    Route::post('/downloaded/{downloadedFile}/{sftpConnection}', [ApiController::class, 'downloadedUploadToSftp'])->name('api.downloaded.upload');
    Route::delete('/downloaded/{downloadedFile}', [ApiController::class, 'downloadedDestroy'])->name('api.downloaded.destroy');

});

require __DIR__ . '/api/server.php';
require __DIR__ . '/api/connection.php';
require __DIR__ . '/api/db.php';
require __DIR__ . '/api/sftp.php';
require __DIR__ . '/api/mysqlDump.php';
require __DIR__ . '/api/key.php';
require __DIR__ . '/api/command.php';
require __DIR__ . '/api/ping.php';
require __DIR__ . '/api/ip.php';
