<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\DatabaseTableColumnController;
use App\Http\Controllers\PingController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\SftpConnectionController;
use Illuminate\Support\Facades\Route;

Route::get('/types', function () {
    return \App\Models\Type::all()->toJson();
});

Route::middleware(['auth:api', 'allowedIpApi'])->group(function () {
    //Everything in this group needs API bearer token

    //Databases
    //Refresh Database tables
    Route::get('/db/{database}/refresh', [DatabaseController::class, 'refresh'])->name('api.db.refresh');
    //Refresh Database table columns
    Route::get('/db/{database}/table/{databaseTable}/refresh', [DatabaseTableColumnController::class, 'refresh'])->name('api.db.table.refresh');
    //Get Database table sizes and row counts
    Route::get('/db/{database}/size', [DatabaseController::class, 'doSize'])->name('api.db.table.size');


    Route::get('ping/{server}', [PingController::class, 'checkIsUp'])->name('ping.server');

    Route::get('dns/{domainName}/{type}', [ServerController::class, 'getIpForDomain'])->name('domain-for-ip');

    //Route::get('connections/{connection}/run', [ConnectionController::class, 'run'])->name('api.connection.run');

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

    Route::get('/keys', [ApiController::class, 'keysIndex'])->name('api.keys.index');
    Route::get('/keys/{key}', [ApiController::class, 'keysShow'])->name('api.keys.show');
    Route::patch('/keys/{key}', [ApiController::class, 'keysUpdate'])->name('api.keys.update');
    Route::delete('/keys/{key}', [ApiController::class, 'keysDestroy'])->name('api.keys.destroy');
    Route::post('/keys', [ApiController::class, 'keysStore'])->name('api.keys.store');

    Route::get('/pings', [ApiController::class, 'pingsIndex'])->name('api.pings.index');
    Route::get('/pings/{ping}', [ApiController::class, 'pingsShow'])->name('api.pings.show');
    Route::delete('/pings/{ping}', [ApiController::class, 'pingsDestroy'])->name('api.pings.destroy');

    Route::get('/servers', [ApiController::class, 'serversIndex'])->name('api.server.index');
    Route::get('/servers/help', [ApiController::class, 'serversHelp'])->name('api.server.help');
    Route::get('/servers/{server}', [ApiController::class, 'serversShow'])->name('api.server.show');
    Route::get('/servers/{server}/ip', [ServerController::class, 'ip'])->name('api.server.ip');//IP for the server
    Route::get('/servers/{server}/pings', [ApiController::class, 'serversPings'])->name('api.server.pings');
    Route::get('/servers/{server}/commands', [ApiController::class, 'serversCommands'])->name('api.server.commands');
    Route::get('/servers/{server}/connections', [ApiController::class, 'serversConnections'])->name('api.server.connections');
    Route::patch('/servers/{server}', [ApiController::class, 'serversUpdate'])->name('api.server.update');
    Route::post('/servers', [ApiController::class, 'serversStore'])->name('api.server.store');
    Route::delete('/servers/{server}', [ApiController::class, 'serversDestroy'])->name('api.server.destroy');

    Route::get('/connections', [ApiController::class, 'connectionsIndex'])->name('api.connection.index');
    Route::get('/connections/help', [ApiController::class, 'connectionsHelp'])->name('api.connection.help');
    Route::get('/connections/{connection}', [ApiController::class, 'connectionsShow'])->name('api.connection.show');
    Route::post('/connections/{connection}/run', [ApiController::class, 'connectionsRun'])->name('api.connection.run');
    Route::patch('/connections/{connection}', [ApiController::class, 'connectionsUpdate'])->name('api.connection.update');
    Route::post('/connections', [ApiController::class, 'connectionsStore'])->name('api.connection.store');
    Route::delete('/connections/{connection}', [ApiController::class, 'connectionsDestroy'])->name('api.connection.destroy');

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

    Route::get('/ips', [ApiController::class, 'ipsIndex'])->name('api.ips.index');
    Route::get('/ips/help', [ApiController::class, 'ipsHelp'])->name('api.ips.help');
    Route::get('/ips/{ipAddress}', [ApiController::class, 'ipsShow'])->name('api.ips.show');
    Route::get('/ips/{ipAddress}/geo', [ApiController::class, 'ipsGeo'])->name('api.ips.geo');
    Route::patch('/ips/{ipAddress}', [ApiController::class, 'ipsUpdate'])->name('api.ips.update');
    Route::post('/ips', [ApiController::class, 'ipsStore'])->name('api.ips.store');
    Route::delete('/ips/{ipAddress}', [ApiController::class, 'ipsDestroy'])->name('api.ips.destroy');

    Route::get('/commands', [ApiController::class, 'commandsIndex'])->name('api.commands.index');
    Route::get('/commands/{command}', [ApiController::class, 'commandsShow'])->name('api.commands.show');
    Route::patch('/commands/{command}', [ApiController::class, 'commandsUpdate'])->name('api.commands.update');
    Route::post('/commands', [ApiController::class, 'commandsStore'])->name('api.commands.store');
    Route::delete('/commands/{command}', [ApiController::class, 'commandsDestroy'])->name('api.commands.destroy');

    Route::get('/command-groups', [ApiController::class, 'commandGroupsIndex'])->name('api.command-group.index');
    Route::get('/command-groups/{commandGroup}', [ApiController::class, 'commandGroupsShow'])->name('api.command-group.show');
    Route::patch('/command-groups/{commandGroup}', [ApiController::class, 'commandGroupsUpdate'])->name('api.command-group.update');
    Route::post('/command-groups', [ApiController::class, 'commandGroupsStore'])->name('api.command-group.store');
    Route::delete('/command-groups/{commandGroup}', [ApiController::class, 'commandGroupsDestroy'])->name('api.command-group.destroy');

    //Add to a command group
    Route::post('/command-groups/{commandGroup}/add/{connection}', [ApiController::class, 'commandGroupAdd'])->name('api.command-group.add');
    //Remove from a command group
    Route::delete('/command-groups/{commandGroup}/remove/{connection}', [ApiController::class, 'commandGroupRemove'])->name('api.command-group.remove');

    Route::get('/ping-groups', [ApiController::class, 'pingGroupsIndex'])->name('api.ping-group.index');
    Route::get('/ping-groups/{pingGroup}', [ApiController::class, 'pingGroupsShow'])->name('api.ping-group.show');
    Route::patch('/ping-groups/{pingGroup}', [ApiController::class, 'pingGroupsUpdate'])->name('api.ping-group.update');
    Route::post('/ping-groups', [ApiController::class, 'pingGroupsStore'])->name('api.ping-group.store');
    Route::delete('/ping-groups/{pingGroup}', [ApiController::class, 'pingGroupsDestroy'])->name('api.ping-group.destroy');

    //Add to a ping group
    Route::post('/ping-groups/{pingGroup}/add/{server}', [ApiController::class, 'pingGroupAdd'])->name('api.ping-group.add');
    //Remove from a ping group
    Route::delete('/ping-groups/{pingGroup}/remove/{server}', [ApiController::class, 'pingGroupRemove'])->name('api.ping-group.remove');

    Route::get('/db/connection', [ApiController::class, 'dbConnectionIndex'])->name('api.db.connection.index');
    Route::get('/db/connection/help', [ApiController::class, 'dbConnectionHelp'])->name('api.db.connection.help');
    Route::get('/db/connection/{databaseConnection}', [ApiController::class, 'dbConnectionShow'])->name('api.db.connection.show');
    Route::get('/db/connection/{databaseConnection}/databases', [ApiController::class, 'dbConnectionDatabases'])->name('api.db.connection.databases');
    Route::patch('/db/connection/{databaseConnection}', [ApiController::class, 'dbConnectionUpdate'])->name('api.db.connection.update');
    Route::post('/db/connection', [ApiController::class, 'dbConnectionStore'])->name('api.db.connection.store');
    Route::delete('/db/connection/{databaseConnection}', [ApiController::class, 'dbConnectionDestroy'])->name('api.db.connection.destroy');

    Route::get('/db', [ApiController::class, 'dbIndex'])->name('api.db.index');
    Route::get('/db/help', [ApiController::class, 'dbHelp'])->name('api.db.help');
    Route::get('/db/{database}', [ApiController::class, 'dbShow'])->name('api.db.show');
    Route::get('/db/{database}/tables', [ApiController::class, 'dbTables'])->name('api.db.tables');
    Route::patch('/db/{database}', [ApiController::class, 'dbUpdate'])->name('api.db.update');
    Route::post('/db', [ApiController::class, 'dbStore'])->name('api.db.store');
    Route::delete('/db/{database}', [ApiController::class, 'dbDestroy'])->name('api.db.destroy');

    Route::get('/db/table/{databaseTable}', [ApiController::class, 'dbTable'])->name('api.db.table');
    Route::delete('/db/table/{databaseTable}', [ApiController::class, 'dbTableDestroy'])->name('api.db.table.destroy');
    Route::get('/db/table/{databaseTable}/columns', [ApiController::class, 'dbColumnIndex'])->name('api.db.table.column.index');
    Route::get('/db/column/{databaseTableColumn}', [ApiController::class, 'dbColumnShow'])->name('api.db.table.column.show');
    Route::delete('/db/column/{databaseTableColumn}', [ApiController::class, 'dbColumnDestroy'])->name('api.db.table.column.destroy');

    Route::get('/mysqldumps', [ApiController::class, 'mysqlDumpsIndex'])->name('api.mysqldumps.index');
    Route::get('/mysqldumps/help', [ApiController::class, 'mysqlDumpsHelp'])->name('api.mysqldumps.help');
    Route::get('/mysqldumps/{mySQLDump}', [ApiController::class, 'mysqlDumpsShow'])->name('api.mysqldumps.show');
    Route::get('/mysqldumps/{mySQLDump}/run', [ApiController::class, 'mysqlDumpsRun'])->name('api.mysqldumps.run');
    Route::patch('/mysqldumps/{mySQLDump}', [ApiController::class, 'mysqlDumpsUpdate'])->name('api.mysqldumps.update');
    Route::post('/mysqldumps', [ApiController::class, 'mysqlDumpsStore'])->name('api.mysqldumps.store');
    Route::delete('/mysqldumps/{mySQLDump}', [ApiController::class, 'mysqlDumpsDestroy'])->name('api.mysqldumps.destroy');

    Route::get('/downloaded', [ApiController::class, 'downloadedIndex'])->name('api.downloaded.index');
    Route::get('/downloaded/{downloadedFile}', [ApiController::class, 'downloadedShow'])->name('api.downloaded.show');
    Route::post('/downloaded/{downloadedFile}/{sftpConnection}', [ApiController::class, 'downloadedUploadToSftp'])->name('api.downloaded.upload');
    Route::delete('/downloaded/{downloadedFile}', [ApiController::class, 'downloadedDestroy'])->name('api.downloaded.destroy');

});
