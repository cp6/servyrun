<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use App\Models\Command;
use App\Models\CommandGroup;
use App\Models\CommandGroupAssigned;
use App\Models\CommandOutput;
use App\Models\Connection;
use App\Models\Database;
use App\Models\DatabaseConnection;
use App\Models\DatabaseTable;
use App\Models\DatabaseTableColumn;
use App\Models\DownloadedFile;
use App\Models\IpAddress;
use App\Models\Key;
use App\Models\Location;
use App\Models\MySQLDump;
use App\Models\Ping;
use App\Models\PingGroup;
use App\Models\PingGroupAssigned;
use App\Models\Server;
use App\Models\SftpConnection;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PDO;

class ApiController extends Controller
{
    public function userIndex(): \Illuminate\Http\JsonResponse
    {
        return response()->json(\Auth::user())->header('Content-Type', 'application/json');
    }

    public function actionLogsIndex(): \Illuminate\Http\JsonResponse
    {
        $logs = ActionLog::Paginate(20);
        return response()->json($logs)->header('Content-Type', 'application/json');
    }

    public function actionLogsShow(ActionLog $actionLog): \Illuminate\Http\JsonResponse
    {
        $log = ActionLog::where('id', $actionLog->id)->with(['server', 'connection', 'command', 'database'])->first();
        return response()->json($log)->header('Content-Type', 'application/json');
    }

    public function typesIndex(): \Illuminate\Http\JsonResponse
    {
        $types = Type::Paginate(20);
        return response()->json($types)->header('Content-Type', 'application/json');
    }

    public function typesShow(Type $type): \Illuminate\Http\JsonResponse
    {
        $data = $type->where('id', $type->id)->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function locationsIndex(): \Illuminate\Http\JsonResponse
    {
        $locations = Location::Paginate(20);
        return response()->json($locations)->header('Content-Type', 'application/json');
    }

    public function locationsShow(Location $location): \Illuminate\Http\JsonResponse
    {
        $data = $location->where('id', $location->id)->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function outputsIndex(): \Illuminate\Http\JsonResponse
    {
        $command_outputs = CommandOutput::Paginate(20);
        return response()->json($command_outputs)->header('Content-Type', 'application/json');
    }

    public function outputsShow(CommandOutput $commandOutput): \Illuminate\Http\JsonResponse
    {
        $data = $commandOutput->where('id', $commandOutput->id)->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function outputsServerIndex(Server $server): \Illuminate\Http\JsonResponse
    {
        $command_outputs = CommandOutput::where('server_id', $server->id)->Paginate();
        return response()->json($command_outputs)->header('Content-Type', 'application/json');
    }

    public function outputsCommandIndex(Command $command): \Illuminate\Http\JsonResponse
    {
        $command_outputs = CommandOutput::where('command_id', $command->id)->Paginate();
        return response()->json($command_outputs)->header('Content-Type', 'application/json');
    }

    public function keysIndex(): \Illuminate\Http\JsonResponse
    {
        $keys = Key::Paginate(20);
        return response()->json($keys)->header('Content-Type', 'application/json');
    }

    public function keysShow(Key $key): \Illuminate\Http\JsonResponse
    {
        $keys = Key::where('id', $key->id)->with(['conn'])->first();
        return response()->json($keys)->header('Content-Type', 'application/json');
    }

    public function keysStore(Key $key, Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'file' => 'required|max:1048',
        ]);

        $file = $request->file('file');

        $file_id_long = Str::random(32);

        $save_as = $file_id_long . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs("keys", $save_as, 'private');

        $key_create = new Key();
        $key_create->file_id = $file_id_long;
        $key_create->original_name = $file->getClientOriginalName();
        $key_create->saved_as = $save_as;
        $key_create->save();

        return response()->json($key_create->get())->header('Content-Type', 'application/json');
    }

    public function keysUpdate(Key $key, Request $request): \Illuminate\Http\JsonResponse
    {
        if ($request->has('password')) {
            if (is_null($request->password)) {
                $key->update(['password' => null]);
            } else {
                $key->update(['password' => Crypt::encryptString($request->password)]);
            }
        }
        return response()->json($key)->header('Content-Type', 'application/json');
    }


    public function keysDestroy(Key $key): \Illuminate\Http\JsonResponse
    {
        $result = $key->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function pingsIndex(): \Illuminate\Http\JsonResponse
    {
        $pings = Ping::Paginate(20);
        return response()->json($pings)->header('Content-Type', 'application/json');
    }

    public function pingsShow(Ping $ping): \Illuminate\Http\JsonResponse
    {
        $data = Ping::where('id', $ping->id)->with(['from_server', 'to_server', 'group', 'server'])->Paginate();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function pingsDestroy(Ping $ping): \Illuminate\Http\JsonResponse
    {
        $result = $ping->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function serversIndex(): \Illuminate\Http\JsonResponse
    {
        $servers = Server::Paginate(20);
        return response()->json($servers)->header('Content-Type', 'application/json');
    }

    public function serversShow(Server $server): \Illuminate\Http\JsonResponse
    {
        $data = $server->where('id', $server->id)->with(['type:id,name', 'location:id,name', 'conn', 'ips'])->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function serversPings(Server $server): \Illuminate\Http\JsonResponse
    {
        $data = $server->where('id', $server->id)->with(['pings', 'pings.to_server', 'pings.from_server'])->paginate(20);
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function serversCommands(Server $server): \Illuminate\Http\JsonResponse
    {
        $data = $server->where('id', $server->id)->with(['command_outputs'])->paginate(20);
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function serversConnections(Server $server): \Illuminate\Http\JsonResponse
    {
        $data = $server->where('id', $server->id)->with(['conns.key'])->paginate(20);
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function serversUpdate(Server $server, Request $request): \Illuminate\Http\JsonResponse
    {
        $server->update($request->all());
        $server_data = Server::where('id', $server->id)->with(['type:id,name', 'location:id,name', 'conn', 'ips'])->first();
        return response()->json($server_data)->header('Content-Type', 'application/json');
    }

    public function serversStore(Server $server, Request $request): \Illuminate\Http\JsonResponse
    {
        $created = $server->create($request->all());
        return response()->json($created->first())->header('Content-Type', 'application/json');
    }

    public function serversDestroy(Server $server): \Illuminate\Http\JsonResponse
    {
        $result = $server->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function serversHelp(Server $server): \Illuminate\Http\JsonResponse
    {
        return response()->json($server->getFillable())->header('Content-Type', 'application/json');
    }

    public function connectionsIndex(): \Illuminate\Http\JsonResponse
    {
        $connections = Connection::Paginate(20);
        return response()->json($connections)->header('Content-Type', 'application/json');
    }

    public function connectionsShow(Connection $connection): \Illuminate\Http\JsonResponse
    {
        $data = $connection->where('id', $connection->id)->with(['server', 'key'])->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function connectionsRun(Connection $connection, Request $request): \Illuminate\Http\JsonResponse
    {
        $time_start = microtime(true);

        if (!$request->has('command')) {
            return response()->json(['message' => 'ERROR: No command sent! Check the logs for more information.', 'command' => null, 'output' => 'ERROR: No command sent.'], 400)->header('Content-Type', 'application/json');
        }

        $command = $request->command;

        $timeout = $request->timeout ?? 10;

        $con = Connection::where('id', $connection->id)->with(['server', 'server.ips'])->firstOrFail();


        if ($connection->type === 1) {
            //Password
            $ssh = Connection::makeConnectionPassword($con->server->ip_ssh->ip, $con->ssh_port, $con->username, Crypt::decryptString($connection->password), $timeout);
        } else if ($connection->type === 2) {
            //Key with password
            $ssh = Connection::makeConnectionKey($con->server->ip_ssh->ip, $con->ssh_port, $con->username, $con->key->saved_as, Crypt::decryptString($con->key->password), $timeout);
        } elseif ($connection->type === 3) {
            //Key NO password
            $ssh = Connection::makeConnectionKey($con->server->ip_ssh->ip, $con->ssh_port, $con->username, $con->key->saved_as, null, $timeout);
        } else {
            return response()->json(['message' => 'ERROR: Connection type was not valid', 'command' => $command, 'output' => 'ERROR: Connection type was not valid'], 400)->header('Content-Type', 'application/json');
        }

        if (is_null($ssh) || !$ssh->isAuthenticated()) {
            return response()->json(['message' => 'ERROR: Connection could not be made! Check the logs for more information.', 'command' => $command, 'output' => 'ERROR: Connection could not be made! Check the logs for more information.'], 400)->header('Content-Type', 'application/json');
        }

        $output = Connection::runCommand($ssh, $command);

        $time_end = microtime(true);

        $command_output = new CommandOutput();
        $command_output->id = Str::random(12);
        $command_output->server_id = $con->server->id;
        $command_output->connection_id = $con->id;
        $command_output->command_id = null;
        $command_output->the_command = $command;
        $command_output->output = $output;
        $command_output->seconds_taken = number_format($time_end - $time_start, 3);
        $command_output->send_email = ($request['email']) ? 1 : 0;
        $command_output->save();

        if ($request->email) {//Send output email
            Mail::to(\Auth::user()->email)->send(new \App\Mail\CommandOutput($command_output));
        }

        $connection->update(['last_used' => Date('Y-m-d H:i:s')]);

        return response()->json($command_output)->header('Content-Type', 'application/json');
    }

    public function connectionsUpdate(Connection $connection, Request $request): \Illuminate\Http\JsonResponse
    {
        $connection->update($request->all());
        $connection_data = Connection::where('id', $connection->id)->with(['server', 'key'])->first();
        return response()->json($connection_data)->header('Content-Type', 'application/json');
    }

    public function connectionsStore(Connection $connection, Request $request): \Illuminate\Http\JsonResponse
    {
        $con = $connection->create($request->all());
        $con->update(['password' => Crypt::encryptString($connection->password)]);//Encrypt the plain text password
        return response()->json($con->first())->header('Content-Type', 'application/json');
    }

    public function connectionsDestroy(Connection $connection): \Illuminate\Http\JsonResponse
    {
        $result = $connection->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function connectionsHelp(Connection $connection): \Illuminate\Http\JsonResponse
    {
        return response()->json($connection->getFillable())->header('Content-Type', 'application/json');
    }

    public function sftpIndex(): \Illuminate\Http\JsonResponse
    {
        $sftp = SftpConnection::Paginate(20);
        return response()->json($sftp)->header('Content-Type', 'application/json');
    }

    public function sftpShow(SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $data = $sftpConnection->where('id', $sftpConnection->id)->with(['server', 'key'])->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function sftpUpdate(SftpConnection $sftpConnection, Request $request): \Illuminate\Http\JsonResponse
    {
        $sftpConnection->update($request->all());
        $sftp_data = SftpConnection::where('id', $sftpConnection->id)->with(['server', 'key'])->first();
        return response()->json($sftp_data)->header('Content-Type', 'application/json');
    }

    public function sftpStore(SftpConnection $sftpConnection, Request $request): \Illuminate\Http\JsonResponse
    {
        $sftp = $sftpConnection->create($request->all());
        $sftp->update(['password' => Crypt::encryptString($sftp->password)]);//Encrypt the plain text password
        return response()->json($sftpConnection->first())->header('Content-Type', 'application/json');
    }

    public function sftpDestroy(SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $result = $sftpConnection->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function sftpHelp(SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        return response()->json($sftpConnection->getFillable())->header('Content-Type', 'application/json');
    }

    public function ipsIndex(): \Illuminate\Http\JsonResponse
    {
        $ipAddresses = IpAddress::Paginate(20);
        return response()->json($ipAddresses)->header('Content-Type', 'application/json');
    }

    public function ipsShow(IpAddress $ipAddress): \Illuminate\Http\JsonResponse
    {
        $data = $ipAddress->where('id', $ipAddress->id)->with(['server'])->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function ipsGeo(IpAddress $ipAddress): \Illuminate\Http\JsonResponse
    {
        IpAddress::fetchUpdateIpDetails($ipAddress);

        return response()->json($ipAddress)->header('Content-Type', 'application/json');
    }

    public function ipsUpdate(IpAddress $ipAddress, Request $request): \Illuminate\Http\JsonResponse
    {
        $ipAddress->update($request->all());
        return response()->json($ipAddress->Paginate(20))->header('Content-Type', 'application/json');
    }

    public function ipsStore(IpAddress $ipAddress, Request $request): \Illuminate\Http\JsonResponse
    {
        $ipAddress->create($request->all());
        return response()->json($ipAddress->first())->header('Content-Type', 'application/json');
    }

    public function ipsDestroy(IpAddress $ipAddress): \Illuminate\Http\JsonResponse
    {
        $result = $ipAddress->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function ipsHelp(IpAddress $ipAddress): \Illuminate\Http\JsonResponse
    {
        return response()->json($ipAddress->getFillable())->header('Content-Type', 'application/json');
    }

    public function commandsIndex(): \Illuminate\Http\JsonResponse
    {
        $commands = Command::Paginate(20);
        return response()->json($commands)->header('Content-Type', 'application/json');
    }

    public function commandsShow(Command $command): \Illuminate\Http\JsonResponse
    {
        $data = $command->where('id', $command->id)->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function commandsUpdate(Command $command, Request $request): \Illuminate\Http\JsonResponse
    {
        $command->update($request->all());
        return response()->json($command->Paginate(20))->header('Content-Type', 'application/json');
    }

    public function commandsStore(Command $command, Request $request): \Illuminate\Http\JsonResponse
    {
        $command->create($request->all());
        return response()->json($command->first())->header('Content-Type', 'application/json');
    }

    public function commandsDestroy(Command $command): \Illuminate\Http\JsonResponse
    {
        $result = $command->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function commandGroupsIndex(): \Illuminate\Http\JsonResponse
    {
        $commands = CommandGroup::Paginate(20);
        return response()->json($commands)->header('Content-Type', 'application/json');
    }

    public function commandGroupsShow(CommandGroup $commandGroup): \Illuminate\Http\JsonResponse
    {
        $data = $commandGroup->where('id', $commandGroup->id)->with(['assigned', 'the_command'])->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function commandGroupsUpdate(CommandGroup $commandGroup, Request $request): \Illuminate\Http\JsonResponse
    {
        $commandGroup->update($request->all());
        return response()->json($commandGroup->Paginate(20))->header('Content-Type', 'application/json');
    }

    public function commandGroupsStore(CommandGroup $commandGroup, Request $request): \Illuminate\Http\JsonResponse
    {
        $commandGroup->create($request->all());
        return response()->json($commandGroup->first())->header('Content-Type', 'application/json');
    }

    public function commandGroupsDestroy(CommandGroup $commandGroup): \Illuminate\Http\JsonResponse
    {
        $result = $commandGroup->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function commandGroupAdd(CommandGroup $commandGroup, Connection $connection): \Illuminate\Http\JsonResponse
    {
        $the_connection = Connection::where('id', $connection->id)->with(['server'])->firstOrFail();

        $command_group_assigned = new CommandGroupAssigned();
        $command_group_assigned->group_id = $commandGroup->id;
        $command_group_assigned->server_id = $the_connection->server->id;
        $command_group_assigned->connection_id = $connection->id;
        $command_group_assigned->save();

        return response()->json($command_group_assigned)->header('Content-Type', 'application/json');
    }

    public function commandGroupRemove(CommandGroup $commandGroup, Connection $connection): \Illuminate\Http\JsonResponse
    {
        $command_group_assigned = CommandGroupAssigned::where('group_id', $commandGroup->id)
            ->where('connection_id', $connection->id)->firstOrFail();

        $result = $command_group_assigned->delete();

        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function pingGroupsIndex(): \Illuminate\Http\JsonResponse
    {
        $pings = PingGroup::Paginate(20);
        return response()->json($pings)->header('Content-Type', 'application/json');
    }

    public function pingGroupsShow(PingGroup $pingGroup): \Illuminate\Http\JsonResponse
    {
        $data = $pingGroup->where('id', $pingGroup->id)->with(['assigned'])->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function pingGroupsUpdate(PingGroup $pingGroup, Request $request): \Illuminate\Http\JsonResponse
    {
        $pingGroup->update($request->all());
        return response()->json($pingGroup->Paginate(20))->header('Content-Type', 'application/json');
    }

    public function pingGroupsStore(PingGroup $pingGroup, Request $request): \Illuminate\Http\JsonResponse
    {
        $pingGroup->create($request->all());
        return response()->json($pingGroup->first())->header('Content-Type', 'application/json');
    }

    public function pingGroupsDestroy(PingGroup $pingGroup): \Illuminate\Http\JsonResponse
    {
        $result = $pingGroup->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function pingGroupAdd(PingGroup $pingGroup, Server $server): \Illuminate\Http\JsonResponse
    {
        $ping_group_assigned = new PingGroupAssigned();
        $ping_group_assigned->group_id = $pingGroup->id;
        $ping_group_assigned->server_id = $server->id;
        $ping_group_assigned->save();

        return response()->json($ping_group_assigned)->header('Content-Type', 'application/json');
    }

    public function pingGroupRemove(PingGroup $pingGroup, Server $server): \Illuminate\Http\JsonResponse
    {
        $ping_group_assigned = PingGroupAssigned::where('group_id', $pingGroup->id)
            ->where('server_id', $server->id)->firstOrFail();

        $result = $ping_group_assigned->delete();

        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function dbConnectionIndex(): \Illuminate\Http\JsonResponse
    {
        $db_cons = DatabaseConnection::Paginate(20);
        return response()->json($db_cons)->header('Content-Type', 'application/json');
    }

    public function dbConnectionStore(DatabaseConnection $databaseConnection, Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'server_id' => 'string|nullable|size:8',
            'host' => 'string|required|max:125',
            'title' => 'string|sometimes|nullable|max:32',
            'port' => 'integer|nullable',
            'username' => 'string|required',
            'password' => 'string|nullable'
        ]);

        try {
            $db = new PDO("mysql:host=$request->host;port=$request->port;dbname=;charset=utf8mb4", $request->username, $request->password, [PDO::ATTR_TIMEOUT => 3]);
        } catch (\Exception $exception) {
            return response()->json(["message" => "Could not connect to {$request->host}:{$request->port} with username {$request->username} " . substr($request->password, 0, -5) . 'XXXXXX'], 400)->header('Content-Type', 'application/json');
        }

        $request->merge(['password' => Crypt::encryptString($request->password)]);

        $databaseConnection->create($request->all());

        return response()->json($databaseConnection->first())->header('Content-Type', 'application/json');
    }

    public function dbConnectionShow(DatabaseConnection $databaseConnection): \Illuminate\Http\JsonResponse
    {
        $data = $databaseConnection->where('id', $databaseConnection->id)->with(['server', 'databases'])->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function dbConnectionUpdate(DatabaseConnection $databaseConnection, Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'server_id' => 'string|nullable|size:8',
            'host' => 'string|required|max:125',
            'title' => 'string|sometimes|nullable|max:32',
            'port' => 'integer|nullable',
            'username' => 'string|required',
            'password' => 'string|nullable'
        ]);

        if ($request->has('password')) {
            $request->merge(['password' => Crypt::encryptString($request->password)]);
        }

        $databaseConnection->update($request->all());

        return response()->json($databaseConnection->Paginate(20))->header('Content-Type', 'application/json');
    }

    public function dbConnectionDestroy(DatabaseConnection $databaseConnection): \Illuminate\Http\JsonResponse
    {
        $result = $databaseConnection->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function dbConnectionHelp(DatabaseConnection $databaseConnection): \Illuminate\Http\JsonResponse
    {
        return response()->json($databaseConnection->getFillable())->header('Content-Type', 'application/json');
    }

    public function dbConnectionDatabases(DatabaseConnection $databaseConnection): \Illuminate\Http\JsonResponse
    {
        $connect = $databaseConnection->dbConnect($databaseConnection, '');

        if (!$connect) {
            return response()->json(['message' => 'Could not connect', 'databases' => null], 400)->header('Content-Type', 'application/json');
        }

        foreach ($databaseConnection->returnDatabases() as $db) {

            $db_exists = Database::where('db_connection_id', $databaseConnection->id)->where('name', $db)->exists();

            if (!$db_exists) {//Database does not exist for this connection
                $database = new Database();
                $database->id = Str::random(8);
                $database->db_connection_id = $databaseConnection->id;
                $database->name = $db;
                $database->user_id = auth('api')->user()->id;
                $database->save();
            }

        }

        return response()->json(Database::where('db_connection_id', $databaseConnection->id)->get())->header('Content-Type', 'application/json');

    }

    public function dbDestroy(Database $database): \Illuminate\Http\JsonResponse
    {
        $result = $database->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function dbTables(Database $database): \Illuminate\Http\JsonResponse
    {

        $tables = DatabaseTable::where('database_id', $database->id)->get();

        if ($tables->isEmpty()) {
            $tables = $this->dbTablesRefresh($database);
        }

        return response()->json($tables)->header('Content-Type', 'application/json');

    }

    public function dbTablesRefresh(Database $database): \Illuminate\Http\JsonResponse
    {

        $connect = $database->conn->dbConnect($database->conn, $database->name);

        if (!$connect) {
            return response()->json(['message' => 'Could not connect', 'databases' => null], 400)->header('Content-Type', 'application/json');
        }

        foreach ($database->conn->returnTables() as $table) {

            $db_table = DatabaseTable::where('database_id', $database->id)->where('name', $table)->first();

            if (is_null($db_table)) {//Database table does not exist for this connection lets make one
                $db_table = new DatabaseTable();
                $db_table->id = Str::random(8);
                $db_table->user_id = auth('api')->user()->id;
                $db_table->database_id = $database->id;
                $db_table->name = $table;
                $db_table->save();
            }

            $row_count = $database->conn->returnTableRowCount($db_table);
            $size_mb = $database->conn->returnTableSizeMb($db_table);

            $db_table->update(['size_mb' => $size_mb, 'row_count' => $row_count]);

        }

        return response()->json(DatabaseTable::where('database_id', $database->id)->get())->header('Content-Type', 'application/json');

    }

    public function dbTable(DatabaseTable $databaseTable): \Illuminate\Http\JsonResponse
    {
        return response()->json($databaseTable)->header('Content-Type', 'application/json');
    }

    public function dbTableDestroy(DatabaseTable $databaseTable): \Illuminate\Http\JsonResponse
    {
        $result = $databaseTable->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function dbColumnsRefresh(DatabaseTable $databaseTable): \Illuminate\Http\JsonResponse
    {
        $connection = $databaseTable->database->conn;
        $connect = $connection->dbConnect($connection, $databaseTable->database->name);

        if (!$connect) {
            return response()->json(['message' => 'Could not connect', 'databases' => null], 400)->header('Content-Type', 'application/json');
        }

        foreach ($connection->returnColumns($databaseTable->name) as $columns) {

            $db_column = DatabaseTableColumn::where('table_id', $databaseTable->id)->where('name', $columns['Field'])->first();

            if (is_null($db_column)) {//Database table does not exist for this connection lets make one
                $db_column = new DatabaseTableColumn();
                $db_column->user_id = auth('api')->user()->id;
                $db_column->table_id = $databaseTable->id;
                $db_column->name = $columns['Field'];
                $db_column->type = $columns['Type'];
                $db_column->is_nullable = ($columns['Null'] === 'NO') ? 0 : 1;
                $db_column->key = ($columns['Key'] === "") ? null : $columns['Key'];
                $db_column->default = $columns['Default'];
                $db_column->extra = ($columns['Extra'] === '') ? null : $columns['Extra'];
                $db_column->comment = $columns['Comment'] ?? null;
                $db_column->save();
            }

        }

        return response()->json(DatabaseTableColumn::where('table_id', $databaseTable->id)->get())->header('Content-Type', 'application/json');
    }

    public function dbColumnIndex(DatabaseTable $databaseTable): \Illuminate\Http\JsonResponse
    {
        $columns = DatabaseTableColumn::where('table_id', $databaseTable->id)->get();

        if ($columns->isEmpty()) {
            $columns = $this->dbColumnsRefresh($databaseTable);
        }

        return response()->json($columns)->header('Content-Type', 'application/json');
    }

    public function dbColumnShow(DatabaseTableColumn $databaseTableColumn): \Illuminate\Http\JsonResponse
    {
        return response()->json($databaseTableColumn)->header('Content-Type', 'application/json');
    }

    public function mysqlDumpsIndex(): \Illuminate\Http\JsonResponse
    {
        $sftp = MySQLDump::Paginate(20);
        return response()->json($sftp)->header('Content-Type', 'application/json');
    }

    public function mysqlDumpsShow(MySQLDump $mySQLDump): \Illuminate\Http\JsonResponse
    {
        $data = $mySQLDump->where('id', $mySQLDump->id)->with(['conn', 'server', 'database_conn', 'database'])->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function mysqlDumpsUpdate(MySQLDump $mySQLDump, Request $request): \Illuminate\Http\JsonResponse
    {
        $mySQLDump->update($request->all());
        return response()->json($mySQLDump->Paginate(20))->header('Content-Type', 'application/json');
    }

    public function mysqlDumpsHelp(MySQLDump $mySQLDump): \Illuminate\Http\JsonResponse
    {
        return response()->json($mySQLDump->getFillable())->header('Content-Type', 'application/json');
    }

    public function mysqlDumpsStore(MySQLDump $mySQLDump, Request $request): \Illuminate\Http\JsonResponse
    {
        $mySQLDump->create($request->all());
        return response()->json($mySQLDump->first())->header('Content-Type', 'application/json');
    }

    public function mysqlDumpsDestroy(MySQLDump $mySQLDump): \Illuminate\Http\JsonResponse
    {
        $result = $mySQLDump->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function downloadedIndex(): \Illuminate\Http\JsonResponse
    {
        $sftp = DownloadedFile::Paginate(20);
        return response()->json($sftp)->header('Content-Type', 'application/json');
    }

    public function downloadedShow(DownloadedFile $downloadedFile): \Illuminate\Http\JsonResponse
    {
        $data = $downloadedFile->where('id', $downloadedFile->id)->with(['conn'])->first();
        return response()->json($data)->header('Content-Type', 'application/json');
    }

    public function downloadedDestroy(DownloadedFile $downloadedFile): \Illuminate\Http\JsonResponse
    {
        $result = $downloadedFile->delete();
        return response()->json(['result' => $result])->header('Content-Type', 'application/json');
    }

    public function downloadedUploadToSftp(Request $request, DownloadedFile $downloadedFile, SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $save_as = $request->save_as ?? '';

        $user_dl_dir = Auth::user()->download_directory;

        if (!Storage::disk('private')->exists("downloads/{$user_dl_dir}/$downloadedFile->saved_as")) {
            $result = 'fail';
            $message = 'File not found';
            return response()->json(['result' => $result, 'message' => $message], 400)->header('Content-Type', 'application/json');
        }

        $file = Storage::disk('private')->get("downloads/{$user_dl_dir}/$downloadedFile->saved_as");

        $sftp_conn = SftpConnection::where('id', $sftpConnection->id)->with(['server'])->firstOrFail();

        $sftp = SftpConnection::do($sftp_conn);

        if (is_null($sftp)) {
            $result = 'fail';
            $message = 'Could not connect';
            return response()->json(['result' => $result, 'message' => $message], 401)->header('Content-Type', 'application/json');
        }

        $upload_file = $sftp->put($save_as, $file);

        if ($upload_file) {
            $result = 'success';
            $message = 'Uploaded file to ' . $save_as;
        } else {
            $result = 'fail';
            $message = 'Failed uploading file as ' . $save_as;
        }

        return response()->json(['result' => $result, 'message' => $message])->header('Content-Type', 'application/json');
    }

}
