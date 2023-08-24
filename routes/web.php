<?php

use App\Http\Controllers\ActionLogController;
use App\Http\Controllers\CommandController;
use App\Http\Controllers\CommandGroupController;
use App\Http\Controllers\CommandOutputController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\DatabaseConnectionController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\DatabaseTableColumnController;
use App\Http\Controllers\DatabaseTableController;
use App\Http\Controllers\DownloadedFileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IpAddressController;
use App\Http\Controllers\KeyController;
use App\Http\Controllers\MySQLDumpController;
use App\Http\Controllers\PingController;
use App\Http\Controllers\PingGroupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\ServerUsageController;
use App\Http\Controllers\SftpConnectionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/servers', [ServerController::class, 'index'])->name('server.index');
    Route::get('/servers/create', [ServerController::class, 'create'])->name('server.create');
    Route::post('/servers', [ServerController::class, 'store'])->name('server.store');
    Route::get('/servers/{server}', [ServerController::class, 'show'])->name('server.show');
    Route::get('/servers/{server}/get-information', [ServerController::class, 'getInformation'])->name('server.get-information');
    Route::get('/servers/{server}/usage/', [ServerUsageController::class, 'allUsage'])->name('server.usage.all');
    Route::get('/servers/{server}/usage/get', [ServerUsageController::class, 'getUsage'])->name('server.usage');
    Route::get('/servers/{server}/usage/ram', [ServerUsageController::class, 'ramUsage'])->name('server.usage.ram');
    Route::get('/servers/{server}/usage/cpu', [ServerUsageController::class, 'cpuUsage'])->name('server.usage.cpu');
    Route::get('/servers/{server}/usage/disk', [ServerUsageController::class, 'diskUsage'])->name('server.usage.disk');
    Route::get('/servers/{server}/uptime', [ServerController::class, 'getUptime'])->name('server.uptime');
    Route::get('/servers/{server}/edit', [ServerController::class, 'edit'])->name('server.edit');
    Route::patch('/servers/{server}', [ServerController::class, 'update'])->name('server.update');
    Route::delete('/servers/{server}', [ServerController::class, 'destroy'])->name('server.destroy');

    Route::get('/servers/{server}/connections', [ServerController::class, 'getServerConnections'])->name('server.connections');
    Route::get('/servers/{server}/db-connections', [ServerController::class, 'getServerDatabaseConnections'])->name('server.db.connections');

    Route::get('/keys', [KeyController::class, 'index'])->name('key.index');
    Route::get('/keys/create', [KeyController::class, 'create'])->name('key.create');
    Route::post('/keys', [KeyController::class, 'store'])->name('key.store');
    Route::get('/keys/{key}', [KeyController::class, 'show'])->name('key.show');
    Route::get('/keys/{key}/download', [KeyController::class, 'download'])->name('key.download');
    Route::get('/keys/{key}/edit', [KeyController::class, 'edit'])->name('key.edit');
    Route::patch('/keys/{key}', [KeyController::class, 'update'])->name('key.update');
    Route::delete('/keys/{key}', [KeyController::class, 'destroy'])->name('key.destroy');

    Route::get('/ips', [IpAddressController::class, 'index'])->name('ip.index');
    Route::get('/ips/create', [IpAddressController::class, 'create'])->name('ip.create');
    Route::post('/ips', [IpAddressController::class, 'store'])->name('ip.store');
    Route::get('/ips/{ipAddress}', [IpAddressController::class, 'show'])->name('ip.show');
    Route::get('/ips/{ipAddress}/edit', [IpAddressController::class, 'edit'])->name('ip.edit');
    Route::patch('/ips/{ipAddress}', [IpAddressController::class, 'update'])->name('ip.update');
    Route::delete('/ips/{ipAddress}', [IpAddressController::class, 'destroy'])->name('ip.destroy');

    Route::get('/connections', [ConnectionController::class, 'index'])->name('connection.index');
    Route::post('/connections/{connection}/run', [ConnectionController::class, 'run'])->name('connection.run');//Send commands here
    Route::get('/connections/create', [ConnectionController::class, 'create'])->name('connection.create');
    Route::post('/connections', [ConnectionController::class, 'store'])->name('connection.store');
    Route::get('/connections/{connection}', [ConnectionController::class, 'show'])->name('connection.show');
    Route::get('/connections/{connection}/debug', [ConnectionController::class, 'debug'])->name('connection.debug');
    Route::get('/connections/{connection}/authenticated', [ConnectionController::class, 'authenticated'])->name('connection.authenticated');
    Route::get('/connections/{connection}/edit', [ConnectionController::class, 'edit'])->name('connection.edit');
    Route::patch('/connections/{connection}', [ConnectionController::class, 'update'])->name('connection.update');
    Route::delete('/connections/{connection}', [ConnectionController::class, 'destroy'])->name('connection.destroy');
    Route::get('/connections/{connection}/id', [ConnectionController::class, 'serverId'])->name('connection.id');

    Route::get('/commands', [CommandController::class, 'index'])->name('command.index');
    Route::get('/commands/create', [CommandController::class, 'create'])->name('command.create');
    Route::post('/commands', [CommandController::class, 'store'])->name('command.store');
    Route::get('/commands/{command}/edit', [CommandController::class, 'edit'])->name('command.edit');
    Route::patch('/commands/{command}', [CommandController::class, 'update'])->name('command.update');
    Route::delete('/commands/{command}', [CommandController::class, 'destroy'])->name('command.destroy');

    Route::get('/command-groups', [CommandGroupController::class, 'index'])->name('command-group.index');
    Route::get('/command-groups/create', [CommandGroupController::class, 'create'])->name('command-group.create');
    Route::post('/command-groups', [CommandGroupController::class, 'store'])->name('command-group.store');
    Route::get('/command-groups/{commandGroup}', [CommandGroupController::class, 'show'])->name('command-group.show');
    Route::get('/command-groups/{commandGroup}/run', [CommandGroupController::class, 'run'])->name('command-group.run');
    Route::get('/command-groups/{commandGroup}/edit', [CommandGroupController::class, 'edit'])->name('command-group.edit');
    Route::patch('/command-groups/{commandGroup}', [CommandGroupController::class, 'update'])->name('command-group.update');
    Route::delete('/command-groups/{commandGroup}', [CommandGroupController::class, 'destroy'])->name('command-group.destroy');

    Route::get('/outputs/', [CommandOutputController::class, 'index'])->name('outputs.index');
    Route::get('/outputs/server/{server}', [CommandOutputController::class, 'showServer'])->name('outputs.show.server');
    Route::get('/outputs/command/{command}', [CommandOutputController::class, 'showCommand'])->name('outputs.show.command');
    Route::get('/outputs/{commandOutput}/full-pdf', [CommandOutputController::class, 'downloadFullPdf'])->name('outputs.full-pdf');
    Route::get('/outputs/{commandOutput}/simple-pdf', [CommandOutputController::class, 'downloadSimplePdf'])->name('outputs.simple-pdf');

    Route::get('/logs', [ActionLogController::class, 'index'])->name('log.index');
    Route::get('/logs/{actionLog}', [ActionLogController::class, 'show'])->name('log.show');
    Route::delete('/logs/destroy', [ActionLogController::class, 'destroyAll'])->name('log.destroy-all');

    Route::get('/pings', [PingController::class, 'index'])->name('ping.index');
    Route::get('/ping/from/{server1}/to/{server2}', [PingController::class, 'pingFromTo'])->name('ping-from-to');
    Route::get('/ping/from/{server1}/to/{server2}/run', [PingController::class, 'runPingFromTo'])->name('run.ping-from-to');
    Route::get('/ping/{server}', [PingController::class, 'checkIsUp'])->name('check-is-up');

    Route::get('/ping-groups', [PingGroupController::class, 'index'])->name('ping-group.index');
    Route::get('/ping-groups/create', [PingGroupController::class, 'create'])->name('ping-group.create');
    Route::post('/ping-groups', [PingGroupController::class, 'store'])->name('ping-group.store');
    Route::get('/ping-groups/{pingGroup}', [PingGroupController::class, 'show'])->name('ping-group.show');
    Route::get('/ping-groups/{pingGroup}/run', [PingGroupController::class, 'run'])->name('ping-group.run');//Make this an API call
    Route::post('/ping-groups/{pingGroup}/ping', [PingGroupController::class, 'run'])->name('ping-group.run2');
    Route::get('/ping-groups/{pingGroup}/edit', [PingGroupController::class, 'edit'])->name('ping-group.edit');
    Route::patch('/ping-groups/{pingGroup}', [PingGroupController::class, 'update'])->name('ping-group.update');
    Route::delete('/ping-groups/{pingGroup}', [PingGroupController::class, 'destroy'])->name('ping-group.destroy');

    Route::get('/ips/create', [IpAddressController::class, 'create'])->name('ip.create');
    Route::post('/ips', [IpAddressController::class, 'store'])->name('ip.store');
    Route::get('/ips/{ipAddress}', [IpAddressController::class, 'show'])->name('ip.show');
    Route::get('/ips/{ipAddress}/geo', [IpAddressController::class, 'geoIpUpdate'])->name('ip.geo.update');
    Route::get('/ips/{ipAddress}/edit', [IpAddressController::class, 'edit'])->name('ip.edit');
    Route::patch('/ips/{ipAddress}', [IpAddressController::class, 'update'])->name('ip.update');
    Route::delete('/ips/{ipAddress}', [IpAddressController::class, 'destroy'])->name('ip.destroy');

    //Database connections
    Route::get('/db/connection', [DatabaseConnectionController::class, 'index'])->name('db.connection.index');//Show all database connections
    Route::get('/db/connection/create', [DatabaseConnectionController::class, 'create'])->name('db.connection.create');//Create a database connection
    Route::post('/db/connection', [DatabaseConnectionController::class, 'store'])->name('db.connection.store');
    Route::get('/db/connection/{databaseConnection}', [DatabaseConnectionController::class, 'show'])->name('db.connection.show');//Show database connection
    Route::get('/db/connection/{databaseConnection}/connect', [DatabaseConnectionController::class, 'canConnect'])->name('db.connection.connect');
    Route::get('/db/connection/{databaseConnection}/databases', [DatabaseConnectionController::class, 'getDatabases'])->name('db.connection.databases');
    Route::get('/db/connection/{databaseConnection}/version', [DatabaseConnectionController::class, 'getUpdateVersion'])->name('db.connection.version');
    Route::get('/db/connection/{databaseConnection}/privileges', [DatabaseConnectionController::class, 'getPrivileges'])->name('db.connection.privileges');
    Route::get('/db/connection/{databaseConnection}/edit', [DatabaseConnectionController::class, 'edit'])->name('db.connection.edit');//Edit database connection
    Route::patch('/db/connection/{databaseConnection}', [DatabaseConnectionController::class, 'update'])->name('db.connection.update');
    Route::delete('/db/connection/{databaseConnection}', [DatabaseConnectionController::class, 'destroy'])->name('db.connection.destroy');//Delete database connection
    Route::delete('/db/connection/{databaseConnection}', [DatabaseConnectionController::class, 'destroy'])->name('db.connection.destroy');//Delete database connection

    //Databases
    Route::get('/db', [DatabaseController::class, 'index'])->name('db.index');//Show all databases
    Route::get('/db/create', [DatabaseController::class, 'create'])->name('db.create');//Create a database
    Route::post('/db', [DatabaseController::class, 'store'])->name('db.store');
    Route::get('/db/{database}', [DatabaseController::class, 'show'])->name('db.show');//Show database tables maybe???
    Route::get('/db/{database}/edit', [DatabaseController::class, 'edit'])->name('db.edit');//Edit a database
    Route::patch('/db/{database}', [DatabaseController::class, 'update'])->name('db.update');
    Route::delete('/db/{database}', [DatabaseController::class, 'destroy'])->name('db.destroy');//Delete a database

    //Database tables
    Route::get('/db/{database}/tables', [DatabaseController::class, 'showTables'])->name('db.show.tables');//Show database tables
    Route::get('/db/{database}/tables/json', [DatabaseController::class, 'showTablesJson'])->name('db.show.tables.json');//Show database tables
    Route::delete('db/{database}/table/', [DatabaseController::class, 'destroy'])->name('db.show.tables.destroy');

    Route::get('/db/{database}/table/{databaseTable}/download', [DatabaseTableController::class, 'downloadTable'])->name('db.table.columns.download');//Download the table

    //Database table columns
    Route::get('/db/{database}/table/{databaseTable}', [DatabaseTableColumnController::class, 'showForTable'])->name('db.table.columns.show');//Show database table columns
    Route::get('/db/{database}/table/{databaseTable}/pdf', [DatabaseTableColumnController::class, 'downloadPdf'])->name('db.table.columns.pdf');//Show database table columns
    Route::get('/db/{database}/table/{databaseTable}/{databaseTableColumn}', [DatabaseTableColumnController::class, 'downloadColumn'])->name('db.table.columns.download.single');
    Route::get('db/{database}/table/{databaseTable}/rows', [DatabaseTableController::class, 'getRowCount'])->name('db.table.columns.rows');
    Route::get('db/{database}/table/{databaseTable}/size', [DatabaseTableController::class, 'getSize'])->name('db.table.columns.size');

    //MySQL dumps
    Route::get('/mysqldump', [MySQLDumpController::class, 'index'])->name('mysqldump.index');
    Route::get('/mysqldump/create', [MySQLDumpController::class, 'create'])->name('mysqldump.create');
    Route::post('/mysqldump', [MySQLDumpController::class, 'store'])->name('mysqldump.store');
    Route::get('/mysqldump/{mySQLDump}', [MySQLDumpController::class, 'show'])->name('mysqldump.show');
    Route::get('/mysqldump/{mySQLDump}/edit', [MySQLDumpController::class, 'edit'])->name('mysqldump.edit');
    Route::patch('/mysqldump/{mySQLDump}', [MySQLDumpController::class, 'update'])->name('mysqldump.update');
    Route::delete('/mysqldump/{mySQLDump}', [MySQLDumpController::class, 'destroy'])->name('mysqldump.destroy');
    Route::get('/mysqldump/{mySQLDump}/run', [MySQLDumpController::class, 'run'])->name('mysqldump.run');

    //SFTP connections
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

    //Downloaded file to server
    Route::get('/downloaded', [DownloadedFileController::class, 'index'])->name('downloaded.index');
    Route::get('/downloaded/{downloadedFile}', [DownloadedFileController::class, 'show'])->name('downloaded.show');
    Route::get('/downloaded/{downloadedFile}/download', [DownloadedFileController::class, 'download'])->name('downloaded.download');
    Route::get('/downloaded/{downloadedFile}/upload', [DownloadedFileController::class, 'uploadForm'])->name('downloaded.upload.form');
    Route::post('/downloaded/{downloadedFile}/upload', [DownloadedFileController::class, 'upload'])->name('downloaded.upload');
    Route::get('/downloaded/{downloadedFile}/upload/progress', [DownloadedFileController::class, 'uploadProgress'])->name('downloaded.upload.progress');//Upload from downloaded progress
    Route::delete('/downloaded/{downloadedFile}', [DownloadedFileController::class, 'destroy'])->name('downloaded.destroy');

});

Route::get('/outputs/{commandOutput}', [CommandOutputController::class, 'show'])->name('outputs.show');

require __DIR__ . '/auth.php';


