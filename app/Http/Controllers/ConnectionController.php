<?php

namespace App\Http\Controllers;

use App\Models\Command;
use App\Models\CommandOutput;
use App\Models\Connection;
use App\Models\Key;
use App\Models\Server;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;
use Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ConnectionController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Connections/Index', [
            'connections' => Connection::with(['server'])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Connections/Create', [
            'servers' => Server::get(),
            'keys' => Key::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'string|required|max:64',
            'server_id' => 'string|size:8|required',
            'key_id' => 'string|size:8|sometimes|nullable',
            'password' => 'string|sometimes|nullable',
            'ssh_port' => 'integer|sometimes|nullable'
        ]);

        if (is_null($request->key_id)) {
            $connection_type = 1;//Password
        } else {
            if (!is_null($request->password)) {
                $connection_type = 2;//Key with password
            } else {
                $connection_type = 3;//key NO password
            }
        }

        try {
            $connection = new Connection();
            $connection->server_id = $request->server_id ?? null;
            $connection->type = $connection_type;
            $connection->username = $request->username ?? 'root';
            $connection->ssh_port = $request->ssh_port ?? 22;
            $connection->key_id = $request->key_id ?? null;
            $connection->password = ($request->password) ? Crypt::encryptString($request->password) : null;
            $connection->last_used = date('Y-m-d H:i:s');
            $connection->save();
        } catch (\Exception $exception) {

            return redirect(route('connection.create'))->with(['alert_type' => 'failure', 'alert_message' => 'Connection could not be created error ' . $exception->getMessage()]);
        }

        return redirect(route('connection.show', $connection))->with(['alert_type' => 'success', 'alert_message' => 'Connection created successfully']);
    }

    public function show(Connection $connection): \Inertia\Response
    {
        $this->authorize('view', $connection);

        $data = Connection::where('id', $connection->id)->with(['key', 'server.ip_ssh'])->firstOrFail();
        $ip = $data->server->ip_ssh->ip;

        if ($connection->type === 1) {
            $method = ['id' => 1, 'string' => 'password'];
        } else if ($connection->type === 2) {
            $method = ['id' => 2, 'string' => 'key with password'];
        } elseif ($connection->type === 3) {
            $method = ['id' => 3, 'string' => 'key'];
        } else {
            $method = ['id' => 4, 'string' => 'other'];
        }

        return Inertia::render('Connections/Show', [
            'resource' => $data,
            'ip' => $ip,
            'method' => $method,
            'commands' => Command::get(),
            'keys' => Key::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);

    }

    public function edit(Connection $connection): \Inertia\Response
    {
        $this->authorize('view', $connection);

        $data = Connection::where('id', $connection->id)->with(['key', 'server.ip_ssh'])->firstOrFail();
        $ip = $data->server->ip_ssh->ip;

        return Inertia::render('Connections/Edit', [
            'resource' => $data,
            'ip' => $ip,
            'commands' => Command::get(),
            'servers' => Server::get(),
            'keys' => Key::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);

    }

    public function update(Request $request, Connection $connection)
    {
        $request->validate([
            'server_id' => 'string|size:8|required',
            'key_id' => 'string|size:8|sometimes|nullable',
            'ssh_port' => 'integer|required',
            'username' => 'string|required|max:64',
            'password' => 'string|required',
        ]);

        $connection->update([
            'server_id' => $request->server_id,
            'key_id' => $request->key_id ?? null,
            'ssh_port' => $request->ssh_port,
            'username' => $request->username,
            'password' => $request->password
        ]);

        return redirect(route('connection.show', $connection))->with(['alert_type' => 'success', 'alert_message' => 'Connection updated successfully']);
    }

    public function run(Request $request, Connection $connection)
    {
        $this->authorize('view', $connection);

        $time_start = microtime(true);

        if (empty($request['the_command1']) && empty($request['command_id'])) {
            return "No command or command_id sent";
        }

        if (empty($request['command_id'])) {
            $command_id = null;
            $command = $request['the_command1'];
        } else {
            $command_id = $request['command_id'];
            $command = Command::where('id', $request['command_id'])->firstOrFail()->command;
        }

        $timeout = $request['timeout'] ?? 10;

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
            return response()->json(['message' => 'ERROR: Connection type was not valid', 'the_command' => $command], 400);
        }

        if (is_null($ssh)) {
            return response()->json(['message' => 'ERROR: Connection could not be made! Check the logs for more information.', 'the_command' => $command], 400);
        }

        $output = Connection::runCommand($ssh, $command);

        $time_end = microtime(true);

        $command_output = new CommandOutput();
        $command_output->id = Str::random(12);
        $command_output->server_id = $con->server->id;
        $command_output->command_id = $command_id;
        $command_output->the_command = $command;
        $command_output->output = $output;
        $command_output->seconds_taken = number_format($time_end - $time_start, 3);
        $command_output->send_email = ($request['email']) ? 1 : 0;
        $command_output->save();

        if ($request['email']) {//Send output email

            $data = array(
                'hostname' => $con->server->hostname,
                'command' => $command,
                'output' => $output
            );

            Mail::send('mail.output', $data, function ($message) {
                $message->to(\Auth::user()->email, \Auth::user()->name)
                    ->subject('Surcuri command output');
                $message->from(\Auth::user()->email, \Auth::user()->name);
            });
        }

        return response()->json($command_output);

    }

    public function destroy(Connection $connection)
    {
        $this->authorize('delete', $connection);

        $connection->delete();

        return redirect(route('connection.index'))->with(['alert_type' => 'success', 'alert_message' => 'Connection deleted successfully']);
    }

    public function serverId(Connection $connection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $connection);

        $ssh = Connection::do($connection);

        return response()->json(['id' => $ssh->getServerIdentification()], 200);
    }

}
