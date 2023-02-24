<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\DatabaseTableColumnController;
use App\Http\Controllers\DatabaseTableController;
use App\Http\Controllers\PingController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\SftpConnectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/types', function () {
    return \App\Models\Type::all()->toJson();
});

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {
//Everything in this group needs API bearer token

//Databases
//Refresh Database tables
    Route::get('/db/{database}/refresh', [DatabaseController::class, 'refresh'])->middleware(['throttle:30,1'])->name('api.db.refresh');
//Refresh Database table columns
    Route::get('/db/{database}/table/{databaseTable}/refresh', [DatabaseTableColumnController::class, 'refresh'])->middleware(['throttle:30,1'])->name('api.db.table.refresh');
//Get Database table sizes and row counts
    Route::get('/db/{database}/size', [DatabaseController::class, 'doSize'])->middleware(['throttle:30,1'])->name('api.db.table.size');


    Route::get('ping/{server}', [PingController::class, 'checkIsUp'])->middleware(['throttle:30,1'])->name('ping.server');

    Route::get('dns/{domainName}/{type}', [ServerController::class, 'getIpForDomain'])->middleware(['throttle:30,1'])->name('domain-for-ip');

    Route::get('connections/{connection}/run', [ConnectionController::class, 'run'])->middleware(['throttle:30,1'])->name('connection.run');

    Route::get('/user', [ApiController::class, 'userIndex'])->middleware(['throttle:30,1'])->name('api.user.index');

    Route::get('/types', [ApiController::class, 'typesIndex'])->middleware(['throttle:30,1'])->name('api.types.index');
    Route::get('/types/{type}', [ApiController::class, 'typesShow'])->middleware(['throttle:30,1'])->name('api.types.show');

    Route::get('/locations', [ApiController::class, 'locationsIndex'])->middleware(['throttle:30,1'])->name('api.locations.index');
    Route::get('/locations/{location}', [ApiController::class, 'locationsShow'])->middleware(['throttle:30,1'])->name('api.locations.show');

    Route::get('/logs', [ApiController::class, 'actionLogsIndex'])->middleware(['throttle:30,1'])->name('api.logs.index');
    Route::get('/logs/{actionLog}', [ApiController::class, 'actionLogsShow'])->middleware(['throttle:30,1'])->name('api.logs.show');

    Route::get('/outputs', [ApiController::class, 'outputsIndex'])->middleware(['throttle:30,1'])->name('api.outputs.index');
    Route::get('/outputs/server/{server}', [ApiController::class, 'outputsServerIndex'])->middleware(['throttle:30,1'])->name('api.outputs.server.index');
    Route::get('/outputs/command/{command}', [ApiController::class, 'outputsCommandIndex'])->middleware(['throttle:30,1'])->name('api.outputs.command.index');
    Route::get('/outputs/{commandOutput}', [ApiController::class, 'outputsShow'])->middleware(['throttle:30,1'])->name('api.outputs.show');

    Route::get('/keys', [ApiController::class, 'keysIndex'])->middleware(['throttle:30,1'])->name('api.keys.index');
    Route::get('/keys/{key}', [ApiController::class, 'keysShow'])->middleware(['throttle:30,1'])->name('api.keys.show');
    Route::delete('/keys/{key}', [ApiController::class, 'keysDestroy'])->middleware(['throttle:30,1'])->name('api.keys.destroy');

    Route::get('/pings', [ApiController::class, 'pingsIndex'])->middleware(['throttle:30,1'])->name('api.pings.index');

    Route::get('/servers', [ApiController::class, 'serversIndex'])->middleware(['throttle:30,1'])->name('api.server.index');
    Route::get('/servers/help', [ApiController::class, 'serversHelp'])->middleware(['throttle:30,1'])->name('api.server.help');
    Route::get('/servers/{server}', [ApiController::class, 'serversShow'])->middleware(['throttle:30,1'])->name('api.server.show');
    Route::get('/servers/{server}/ip', [ServerController::class, 'ip'])->middleware(['throttle:20,1'])->name('server.ip');//IP for the server
    Route::patch('/servers/{server}', [ApiController::class, 'serversUpdate'])->middleware(['throttle:20,1'])->name('api.server.update');
    Route::post('/servers', [ApiController::class, 'serversStore'])->middleware(['throttle:20,1'])->name('api.server.store');
    Route::delete('/servers/{server}', [ApiController::class, 'serversDestroy'])->middleware(['throttle:20,1'])->name('api.server.destroy');

    Route::get('/connections', [ApiController::class, 'connectionsIndex'])->middleware(['throttle:30,1'])->name('api.connection.index');
    Route::get('/connections/help', [ApiController::class, 'connectionsHelp'])->middleware(['throttle:30,1'])->name('api.connection.help');
    Route::get('/connections/{connection}', [ApiController::class, 'connectionsShow'])->middleware(['throttle:30,1'])->name('api.connection.show');
    Route::patch('/connections/{connection}', [ApiController::class, 'connectionsUpdate'])->middleware(['throttle:20,1'])->name('api.connection.update');
    Route::post('/connections', [ApiController::class, 'connectionsStore'])->middleware(['throttle:20,1'])->name('api.connection.store');
    Route::delete('/connections/{connection}', [ApiController::class, 'connectionsDestroy'])->middleware(['throttle:20,1'])->name('api.connection.destroy');

    Route::get('/sftp', [ApiController::class, 'sftpIndex'])->middleware(['throttle:30,1'])->name('api.sftp.index');
    Route::get('/sftp/help', [ApiController::class, 'sftpHelp'])->middleware(['throttle:30,1'])->name('api.sftp.help');
    Route::get('/sftp/{sftpConnection}', [ApiController::class, 'sftpShow'])->middleware(['throttle:30,1'])->name('api.sftp.show');
    Route::get('/sftp/{sftpConnection}/directory', [SftpConnectionController::class, 'directoryContentsAsArray'])->middleware(['throttle:30,1'])->name('api.sftp.directory.contents');//Folders & files in a directory
    Route::get('/sftp/{sftpConnection}/directory-contents', [SftpConnectionController::class, 'directoryContentsDetailedAsArray'])->middleware(['throttle:30,1'])->name('api.sftp.directory.contents.details');//Details for folders & files in a directory
    Route::get('/sftp/{sftpConnection}/directory-files', [SftpConnectionController::class, 'directoryFilesDetailedAsArray'])->middleware(['throttle:30,1'])->name('api.sftp.directory.files.details');//Details for files in a directory
    Route::get('/sftp/{sftpConnection}/file', [SftpConnectionController::class, 'fileDetailedAsArray'])->middleware(['throttle:30,1'])->name('api.sftp.file.details');//Details about a file
    Route::patch('/sftp/{sftpConnection}', [ApiController::class, 'sftpUpdate'])->middleware(['throttle:20,1'])->name('api.sftp.update');
    Route::post('/sftp', [ApiController::class, 'sftpStore'])->middleware(['throttle:20,1'])->name('api.sftp.store');
    Route::delete('/sftp/{sftpConnection}', [ApiController::class, 'sftpDestroy'])->middleware(['throttle:20,1'])->name('api.sftp.destroy');

    Route::get('/ips', [ApiController::class, 'ipsIndex'])->middleware(['throttle:30,1'])->name('api.ips.index');
    Route::get('/ips/help', [ApiController::class, 'ipsHelp'])->middleware(['throttle:30,1'])->name('api.ips.help');
    Route::get('/ips/{ipAddress}', [ApiController::class, 'ipsShow'])->middleware(['throttle:30,1'])->name('api.ips.show');
    Route::patch('/ips/{ipAddress}', [ApiController::class, 'ipsUpdate'])->middleware(['throttle:20,1'])->name('api.ips.update');
    Route::post('/ips', [ApiController::class, 'ipsStore'])->middleware(['throttle:20,1'])->name('api.ips.store');
    Route::delete('/ips/{ipAddress}', [ApiController::class, 'ipsDestroy'])->middleware(['throttle:20,1'])->name('api.ips.destroy');

    Route::get('/commands', [ApiController::class, 'commandsIndex'])->middleware(['throttle:30,1'])->name('api.commands.index');
    Route::get('/commands/{command}', [ApiController::class, 'commandsShow'])->middleware(['throttle:30,1'])->name('api.commands.show');
    Route::patch('/commands/{command}', [ApiController::class, 'commandsUpdate'])->middleware(['throttle:20,1'])->name('api.commands.update');
    Route::post('/commands', [ApiController::class, 'commandsStore'])->middleware(['throttle:20,1'])->name('api.commands.store');
    Route::delete('/commands/{command}', [ApiController::class, 'commandsDestroy'])->middleware(['throttle:20,1'])->name('api.commands.destroy');

    Route::get('/db/connection', [ApiController::class, 'dbConnectionIndex'])->middleware(['throttle:30,1'])->name('api.db.connection.index');
    Route::get('/db/connection/help', [ApiController::class, 'dbConnectionHelp'])->middleware(['throttle:30,1'])->name('api.db.connection.help');
    Route::get('/db/connection/{databaseConnection}', [ApiController::class, 'dbConnectionShow'])->middleware(['throttle:30,1'])->name('api.db.connection.show');
    Route::patch('/db/connection/{databaseConnection}', [ApiController::class, 'dbConnectionUpdate'])->middleware(['throttle:20,1'])->name('api.db.connection.update');
    Route::post('/db/connection', [ApiController::class, 'dbConnectionStore'])->middleware(['throttle:20,1'])->name('api.db.connection.store');
    Route::delete('/db/connection/{databaseConnection}', [ApiController::class, 'dbConnectionDestroy'])->middleware(['throttle:20,1'])->name('api.db.connection.destroy');

    Route::get('/db', [ApiController::class, 'dbIndex'])->middleware(['throttle:30,1'])->name('api.db.index');
    Route::get('/db/help', [ApiController::class, 'dbHelp'])->middleware(['throttle:30,1'])->name('api.db.help');
    Route::get('/db/{database}', [ApiController::class, 'dbShow'])->middleware(['throttle:30,1'])->name('api.db.show');
    Route::patch('/db/{database}', [ApiController::class, 'dbUpdate'])->middleware(['throttle:20,1'])->name('api.db.update');
    Route::post('/db', [ApiController::class, 'dbStore'])->middleware(['throttle:20,1'])->name('api.db.store');
    Route::delete('/db/{database}', [ApiController::class, 'dbDestroy'])->middleware(['throttle:20,1'])->name('api.db.destroy');


});
