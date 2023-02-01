<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\DatabaseTableColumnController;
use App\Http\Controllers\DatabaseTableController;
use App\Http\Controllers\PingController;
use App\Http\Controllers\ServerController;
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

//Databases
//Refresh Database tables
Route::get('/db/{database}/refresh', [DatabaseController::class, 'refresh'])->middleware(['auth:api', 'throttle:30,1'])->name('api.db.refresh');
//Refresh Database table columns
Route::get('/db/{database}/table/{databaseTable}/refresh', [DatabaseTableColumnController::class, 'refresh'])->middleware(['auth:api', 'throttle:30,1'])->name('api.db.table.refresh');
//Get Database table sizes and row counts
Route::get('/db/{database}/size', [DatabaseController::class, 'doSize'])->middleware(['auth:api', 'throttle:30,1'])->name('api.db.table.size');


Route::get('ping/{server}', [PingController::class, 'checkIsUp'])->middleware(['auth:api', 'throttle:30,1']);

Route::get('dns/{domainName}/{type}', [ServerController::class, 'getIpForDomain'])->middleware(['auth:api', 'throttle:30,1'])->name('domain-for-ip');

Route::get('connections/{connection}/run', [ConnectionController::class, 'run'])->middleware(['auth:api', 'throttle:30,1']);

Route::get('/user', [ApiController::class, 'userIndex'])->middleware(['auth:api', 'throttle:30,1']);

Route::get('/types', [ApiController::class, 'typesIndex'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/types/{type}', [ApiController::class, 'typesShow'])->middleware(['auth:api', 'throttle:30,1']);

Route::get('/locations', [ApiController::class, 'locationsIndex'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/locations/{location}', [ApiController::class, 'locationsShow'])->middleware(['auth:api', 'throttle:30,1']);

Route::get('/logs', [ApiController::class, 'actionLogsIndex'])->middleware(['auth:api', 'throttle:30,1']);

Route::get('/outputs', [ApiController::class, 'outputsIndex'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/outputs/server/{server}', [ApiController::class, 'outputsServerIndex'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/outputs/command/{command}', [ApiController::class, 'outputsCommandIndex'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/outputs/{commandOutput}', [ApiController::class, 'outputsShow'])->middleware(['auth:api', 'throttle:30,1']);

Route::get('/keys', [ApiController::class, 'keysIndex'])->middleware(['auth:api', 'throttle:30,1']);

Route::get('/pings', [ApiController::class, 'pingsIndex'])->middleware(['auth:api', 'throttle:30,1']);

Route::get('/servers', [ApiController::class, 'serversIndex'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/servers/{server}', [ApiController::class, 'serversShow'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/servers/{server}/ip', [ServerController::class, 'ip'])->middleware(['auth:api', 'throttle:20,1'])->name('server.ip');
Route::patch('/servers/{server}', [ApiController::class, 'serversUpdate'])->middleware(['auth:api', 'throttle:20,1']);
Route::post('/servers', [ApiController::class, 'serversStore'])->middleware(['auth:api', 'throttle:20,1']);
Route::delete('/servers/{server}', [ApiController::class, 'serversDestroy'])->middleware(['auth:api', 'throttle:20,1']);

Route::get('/connections', [ApiController::class, 'connectionsIndex'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/connections/{connection}', [ApiController::class, 'connectionsShow'])->middleware(['auth:api', 'throttle:30,1']);
Route::patch('/connections/{connection}', [ApiController::class, 'connectionsUpdate'])->middleware(['auth:api', 'throttle:20,1']);
Route::post('/connections', [ApiController::class, 'connectionsStore'])->middleware(['auth:api', 'throttle:20,1']);
Route::delete('/connections/{connection}', [ApiController::class, 'connectionsDestroy'])->middleware(['auth:api', 'throttle:20,1']);

Route::get('/ips', [ApiController::class, 'ipsIndex'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/ips/{ipAddress}', [ApiController::class, 'ipsShow'])->middleware(['auth:api', 'throttle:30,1']);
Route::patch('/ips/{ipAddress}', [ApiController::class, 'ipsUpdate'])->middleware(['auth:api', 'throttle:20,1']);
Route::post('/ips', [ApiController::class, 'ipsStore'])->middleware(['auth:api', 'throttle:20,1']);
Route::delete('/ips/{ipAddress}', [ApiController::class, 'ipsDestroy'])->middleware(['auth:api', 'throttle:20,1']);

Route::get('/commands', [ApiController::class, 'commandsIndex'])->middleware(['auth:api', 'throttle:30,1']);
Route::get('/commands/{command}', [ApiController::class, 'commandsShow'])->middleware(['auth:api', 'throttle:30,1']);
Route::patch('/commands/{command}', [ApiController::class, 'commandsUpdate'])->middleware(['auth:api', 'throttle:20,1']);
Route::post('/commands', [ApiController::class, 'commandsStore'])->middleware(['auth:api', 'throttle:20,1']);
Route::delete('/commands/{command}', [ApiController::class, 'commandsDestroy'])->middleware(['auth:api', 'throttle:20,1']);
