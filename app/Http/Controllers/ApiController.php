<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use App\Models\Command;
use App\Models\CommandOutput;
use App\Models\Connection;
use App\Models\IpAddress;
use App\Models\Key;
use App\Models\Location;
use App\Models\Ping;
use App\Models\Server;
use App\Models\Type;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function userIndex(): \Illuminate\Http\JsonResponse
    {
        return response()->json(\Auth::user());
    }

    public function actionLogsIndex(): \Illuminate\Http\JsonResponse
    {
        $logs = ActionLog::Paginate(20);
        return response()->json($logs);
    }

    public function typesIndex(): \Illuminate\Http\JsonResponse
    {
        $types = Type::Paginate(20);
        return response()->json($types);
    }

    public function typesShow(Type $type): \Illuminate\Http\JsonResponse
    {
        $data = $type->where('id', $type->id)->first();
        return response()->json($data);
    }

    public function locationsIndex(): \Illuminate\Http\JsonResponse
    {
        $locations = Location::Paginate(20);
        return response()->json($locations);
    }

    public function locationsShow(Location $location): \Illuminate\Http\JsonResponse
    {
        $data = $location->where('id', $location->id)->first();
        return response()->json($data);
    }

    public function outputsIndex(): \Illuminate\Http\JsonResponse
    {
        $command_outputs = CommandOutput::Paginate(20);
        return response()->json($command_outputs);
    }

    public function outputsShow(CommandOutput $commandOutput): \Illuminate\Http\JsonResponse
    {
        $data = $commandOutput->where('id', $commandOutput->id)->first();
        return response()->json($data);
    }

    public function outputsServerIndex(Server $server): \Illuminate\Http\JsonResponse
    {
        $command_outputs = CommandOutput::where('server_id', $server->id)->Paginate();
        return response()->json($command_outputs);
    }

    public function outputsCommandIndex(Command $command): \Illuminate\Http\JsonResponse
    {
        $command_outputs = CommandOutput::where('command_id', $command->id)->Paginate();
        return response()->json($command_outputs);
    }

    public function keysIndex(): \Illuminate\Http\JsonResponse
    {
        $keys = Key::Paginate(20);
        return response()->json($keys);
    }

    public function pingsIndex(): \Illuminate\Http\JsonResponse
    {
        $pings = Ping::Paginate(20);
        return response()->json($pings);
    }

    public function pingsShow(Ping $ping): \Illuminate\Http\JsonResponse
    {
        $data = Ping::where('id', $ping->id)->with(['from_server', 'to_server', 'group', 'server'])->Paginate();
        return response()->json($data);
    }

    public function serversIndex(): \Illuminate\Http\JsonResponse
    {
        $servers = Server::Paginate(20);
        return response()->json($servers);
    }

    public function serversShow(Server $server): \Illuminate\Http\JsonResponse
    {
        $data = $server->where('id', $server->id)->with(['type', 'location', 'conn', 'ips'])->first();
        return response()->json($data);
    }

    public function serversUpdate(Server $server, Request $request): \Illuminate\Http\JsonResponse
    {
        $server->update($request->all());
        return response()->json($server->Paginate(20));
    }

    public function serversStore(Server $server, Request $request): \Illuminate\Http\JsonResponse
    {
        $server->create($request->all());
        return response()->json($server->Paginate(20));
    }

    public function serversDestroy(Server $server): \Illuminate\Http\JsonResponse
    {
        $result = $server->delete();
        return response()->json(['result' => $result]);
    }

    public function connectionsIndex(): \Illuminate\Http\JsonResponse
    {
        $connections = Connection::Paginate(20);
        return response()->json($connections);
    }

    public function connectionsShow(Connection $connection): \Illuminate\Http\JsonResponse
    {
        $data = $connection->where('id', $connection->id)->with(['server', 'key'])->first();
        return response()->json($data);
    }

    public function connectionsUpdate(Connection $connection, Request $request): \Illuminate\Http\JsonResponse
    {
        $connection->update($request->all());
        return response()->json($connection->Paginate(20));
    }

    public function connectionsStore(Connection $connection, Request $request): \Illuminate\Http\JsonResponse
    {
        $connection->create($request->all());
        return response()->json($connection->Paginate(20));
    }

    public function connectionsDestroy(Connection $connection): \Illuminate\Http\JsonResponse
    {
        $result = $connection->delete();
        return response()->json(['result' => $result]);
    }

    public function ipsIndex(): \Illuminate\Http\JsonResponse
    {
        $ipAddresses = IpAddress::Paginate(20);
        return response()->json($ipAddresses);
    }

    public function ipsShow(IpAddress $ipAddress): \Illuminate\Http\JsonResponse
    {
        $data = $ipAddress->where('id', $ipAddress->id)->with(['server', 'key'])->first();
        return response()->json($data);
    }

    public function ipsUpdate(IpAddress $ipAddress, Request $request): \Illuminate\Http\JsonResponse
    {
        $ipAddress->update($request->all());
        return response()->json($ipAddress->Paginate(20));
    }

    public function ipsStore(IpAddress $ipAddress, Request $request): \Illuminate\Http\JsonResponse
    {
        $ipAddress->create($request->all());
        return response()->json($ipAddress->Paginate(20));
    }

    public function ipsDestroy(IpAddress $ipAddress): \Illuminate\Http\JsonResponse
    {
        $result = $ipAddress->delete();
        return response()->json(['result' => $result]);
    }


    public function commandsIndex(): \Illuminate\Http\JsonResponse
    {
        $commands = Command::Paginate(20);
        return response()->json($commands);
    }

    public function commandsShow(Command $command): \Illuminate\Http\JsonResponse
    {
        $data = $command->where('id', $command->id)->first();
        return response()->json($data);
    }

    public function commandsUpdate(Command $command, Request $request): \Illuminate\Http\JsonResponse
    {
        $command->update($request->all());
        return response()->json($command->Paginate(20));
    }

    public function commandsStore(Command $command, Request $request): \Illuminate\Http\JsonResponse
    {
        $command->create($request->all());
        return response()->json($command->Paginate(20));
    }

    public function commandsDestroy(Command $command): \Illuminate\Http\JsonResponse
    {
        $result = $command->delete();
        return response()->json(['result' => $result]);
    }

}
