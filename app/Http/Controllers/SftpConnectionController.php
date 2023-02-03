<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Key;
use App\Models\Server;
use App\Models\SftpConnection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;
use phpseclib3\Net\SFTP;

class SftpConnectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Sftp/Index', [
            'connections' => SftpConnection::with(['server'])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Sftp/Create', [
            'servers' => Server::get(),
            'connections' => Connection::with('server')->get(),
            'keys' => Key::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'server_id' => 'string|size:8|required',
            'connection_id' => 'string|size:12|sometimes|nullable',
            'username' => 'string|sometimes|nullable|max:64',
            'key_id' => 'string|size:8|sometimes|nullable',
            'password' => 'string|sometimes|nullable',
            'ssh_port' => 'integer|sometimes|nullable'
        ]);

        $sftp_conn = new SftpConnection();

        if (!is_null($request->connection_id)) {

            $connection = Connection::where('id', $request->connection_id)->first();

            $sftp_conn->server_id = $connection->server_id;
            $sftp_conn->username = $connection->username;
            $sftp_conn->port = $connection->ssh_port;
            $sftp_conn->key_id = $connection->key_id;
            $sftp_conn->password = $connection->password;

        } else {

            $sftp_conn->server_id = $request->server_id;
            $sftp_conn->username = $request->username ?? 'root';
            $sftp_conn->port = $request->port ?? 22;
            $sftp_conn->key_id = $request->key_id ?? null;
            $sftp_conn->password = ($request->password) ? Crypt::encryptString($request->password) : null;

        }

        $sftp_conn->save();

        return redirect(route('sftp.show', $sftp_conn))->with(['alert_type' => 'success', 'alert_message' => 'SFTP connection created successfully']);
    }

    public function show(SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        $data = SftpConnection::where('id', $sftpConnection->id)->with(['server', 'key', 'server.ip_ssh'])->firstOrFail();
        $ip = $data->server->ip_ssh->ip;

        return Inertia::render('Sftp/Show', [
            'resource' => $data,
            'ip' => $ip,
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function edit(SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

    }

    public function update(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('update', $sftpConnection);

    }

    public function destroy(SftpConnection $sftpConnection)
    {
        $this->authorize('delete', $sftpConnection);

    }

    public function run(SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        return $sftpConnection;
    }
}
