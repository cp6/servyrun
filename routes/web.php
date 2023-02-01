<?php

use App\Http\Controllers\ActionLogController;
use App\Http\Controllers\CommandController;
use App\Http\Controllers\CommandOutputController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\DatabaseConnectionController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\DatabaseTableColumnController;
use App\Http\Controllers\DatabaseTableController;
use App\Http\Controllers\IpAddressController;
use App\Http\Controllers\KeyController;
use App\Http\Controllers\MySQLDumpController;
use App\Http\Controllers\PingController;
use App\Http\Controllers\PingGroupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\SftpConnectionController;
use App\Models\IpAddress;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check()) {//Logged in
        return Inertia::render('Dashboard', [
            'serversCount' => \App\Models\Server::get()->count(),
            'IpCount' => \App\Models\IpAddress::get()->count(),
            'KeyCount' => \App\Models\Key::get()->count(),
            'ConnectionCount' => \App\Models\Connection::get()->count(),
            'CommandCount' => \App\Models\Command::get()->count(),
            'OutputCount' => \App\Models\CommandOutput::get()->count(),
            'RecentActions' => \App\Models\ActionLog::orderBy('created_at', 'desc')->take(10)->get()
        ]);
    }
    return Inertia::render('Auth/Login');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/servers', [ServerController::class, 'index'])->name('server.index');
    Route::get('/servers/create', [ServerController::class, 'create'])->name('server.create');
    Route::post('/servers', [ServerController::class, 'store'])->name('server.store');
    Route::get('/servers/{server}', [ServerController::class, 'show'])->name('server.show');
    Route::get('/servers/{server}/get-information', [ServerController::class, 'getInformation'])->name('server.get-information');
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
    Route::post('/connections/{connection}/verify', [ConnectionController::class, 'verify'])->name('connection.verify');
    Route::get('/connections/{connection}/edit', [ConnectionController::class, 'edit'])->name('connection.edit');
    Route::patch('/connections/{connection}', [ConnectionController::class, 'update'])->name('connection.update');
    Route::delete('/connections/{connection}', [ConnectionController::class, 'destroy'])->name('connection.destroy');

    Route::get('/commands', [CommandController::class, 'index'])->name('command.index');
    Route::get('/commands/create', [CommandController::class, 'create'])->name('command.create');
    Route::post('/commands', [CommandController::class, 'store'])->name('command.store');
    //Route::get('/commands/{command}', [CommandController::class, 'show'])->name('command.show');
    Route::get('/commands/{command}/edit', [CommandController::class, 'edit'])->name('command.edit');
    Route::patch('/commands/{command}', [CommandController::class, 'update'])->name('command.update');
    Route::delete('/commands/{command}', [CommandController::class, 'destroy'])->name('command.destroy');

    Route::get('/outputs/', [CommandOutputController::class, 'index'])->name('outputs.index');
    Route::get('/outputs/server/{server}', [CommandOutputController::class, 'showServer'])->name('outputs.show.server');
    Route::get('/outputs/command/{command}', [CommandOutputController::class, 'showCommand'])->name('outputs.show.command');

    Route::get('/logs', [ActionLogController::class, 'index'])->name('log.index');

    Route::get('/pings', [PingController::class, 'index'])->name('ping.index');
    Route::get('/ping/test', [PingController::class, 'test'])->name('ping.test');
    Route::get('/ping/from/{server1}/to/{server2}', [PingController::class, 'pingFromTo'])->name('ping-from-to');
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
    Route::get('/db/connection/{databaseConnection}/edit', [DatabaseConnectionController::class, 'edit'])->name('db.connection.edit');//Edit database connection
    Route::patch('/db/connection/{databaseConnection}', [DatabaseConnectionController::class, 'update'])->name('db.connection.update');
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

    Route::get('/db/{database}/table/{databaseTable}/download', [DatabaseTableController::class, 'downloadTable'])->name('db.table.columns.download');//Download the table

    //Database table columns
    Route::get('/db/{database}/table/{databaseTable}', [DatabaseTableColumnController::class, 'showForTable'])->name('db.table.columns.show');//Show database table columns
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

    //SFTP connections
    Route::get('/sftp/test', [SftpConnectionController::class, 'test'])->name('sftp.test');
    Route::get('/sftp', [SftpConnectionController::class, 'index'])->name('sftp.index');
    Route::get('/sftp/create', [SftpConnectionController::class, 'create'])->name('sftp.create');
    Route::post('/sftp/', [SftpConnectionController::class, 'store'])->name('sftp.store');
    Route::get('/sftp/{sftpConnection}', [SftpConnectionController::class, 'show'])->name('sftp.show');
    Route::get('/sftp/{sftpConnection}/edit', [SftpConnectionController::class, 'edit'])->name('sftp.edit');
    Route::patch('/sftp/{sftpConnection}', [SftpConnectionController::class, 'update'])->name('sftp.update');
    Route::delete('/sftp/{sftpConnection}', [SftpConnectionController::class, 'destroy'])->name('sftp.destroy');

});

Route::get('/outputs/{commandOutput}', [CommandOutputController::class, 'show'])->name('outputs.show');

require __DIR__ . '/auth.php';

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
