<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use App\Models\Command;
use App\Models\CommandGroup;
use App\Models\CommandGroupAssigned;
use App\Models\CommandOutput;
use App\Models\Connection;
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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            if (is_null($request->password)){
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
        return response()->json($created->get())->header('Content-Type', 'application/json');
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
        return response()->json($con->get())->header('Content-Type', 'application/json');
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
        $sftpConnection->create($request->all());
        return response()->json($sftpConnection->Paginate(20))->header('Content-Type', 'application/json');
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
        return response()->json($ipAddress->Paginate(20))->header('Content-Type', 'application/json');
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
        return response()->json($command->Paginate(20))->header('Content-Type', 'application/json');
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
        return response()->json($commandGroup->Paginate(20))->header('Content-Type', 'application/json');
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
        return response()->json($pingGroup->Paginate(20))->header('Content-Type', 'application/json');
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
        return response()->json($mySQLDump->Paginate(20))->header('Content-Type', 'application/json');
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
