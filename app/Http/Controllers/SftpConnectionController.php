<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
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
    public function index(): \Inertia\Response
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

        try {

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

        } catch (\Exception $exception) {

            return redirect(route('sftp.create'))->with(['alert_type' => 'failure', 'alert_message' => 'SFTP connection could not be created error ' . $exception->getCode()]);
        }

        return redirect(route('sftp.show', $sftp_conn))->with(['alert_type' => 'success', 'alert_message' => 'SFTP connection created successfully']);
    }

    public function show(SftpConnection $sftpConnection): \Inertia\Response
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

    public function read(SftpConnection $sftpConnection): \Inertia\Response
    {
        $this->authorize('view', $sftpConnection);

        $data = SftpConnection::where('id', $sftpConnection->id)->with(['server', 'key', 'server.ip_ssh'])->firstOrFail();
        $ip = $data->server->ip_ssh->ip;

        return Inertia::render('Sftp/Read', [
            'resource' => $data,
            'ip' => $ip,
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function edit(SftpConnection $sftpConnection): \Inertia\Response
    {
        $this->authorize('view', $sftpConnection);

        $data = SftpConnection::where('id', $sftpConnection->id)->with(['key', 'server.ip_ssh'])->firstOrFail();
        $ip = $data->server->ip_ssh->ip;

        return Inertia::render('Sftp/Edit', [
            'resource' => $data,
            'ip' => $ip,
            'servers' => Server::get(),
            'keys' => Key::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);

    }

    public function update(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('update', $sftpConnection);

    }

    public function destroy(SftpConnection $sftpConnection)
    {
        $this->authorize('delete', $sftpConnection);

        try {
            $sftpConnection->delete();
        } catch (\Exception $exception){
            return redirect(route('sftp.show', $sftpConnection))->with(['alert_type' => 'failure', 'alert_message' => 'Error deleting: '.$exception->getMessage()]);
        }

        return redirect(route('mysqldump.index'))->with(['alert_type' => 'success', 'alert_message' => 'SFTP connection deleted successfully']);
    }

    public function authenticated(SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        $sftp = SftpConnection::do($sftpConnection);

        return response()->json(['result' => $sftp->isAuthenticated()], 200)->header('Content-Type', 'application/json');
    }

    public function run(Request $request, SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        $command = $request->the_command1;

        $time_start = microtime(true);

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return response()->json(['message' => 'ERROR: SFTP connection could not be made! Check the logs for more information.', 'the_command' => $command], 400);
        }

        $output = SftpConnection::runSftpCommand($sftp, $command);

        $time_end = microtime(true);

        ActionLog::make(1, 'run', 'sftp', 'Ran SFTP command: '.$command, $sftpConnection->server_id);

        return response()->json([
            'id' => $sftpConnection->id,
            'server_id' => $sftpConnection->server_id,
            'the_command' => $command,
            'seconds_taken' => number_format($time_end - $time_start, 3),
            'output' => $output
        ], 200)->header('Content-Type', 'application/json');

    }

    public function downloadFile(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        $file = $request->file;

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return redirect(route('sftp.show', $sftpConnection))->with(['alert_type' => 'failure', 'alert_message' => 'Could not connect']);
        }

        $save_as = basename($file);

        $sftp = SftpConnection::do($sftpConnection);

        if ($sftp->file_exists($file)) {

            $file_size = $sftp->filesize($file);

            ActionLog::make(1, 'download', 'sftp', 'Downloaded file: '.$file, $sftpConnection->server_id);

            $download = SftpConnection::downloadFile($sftp, $file);

            header("Content-Description: File Transfer");
            header("Content-Type: application/octet-stream");
            header("Content-Transfer-Encoding: Binary");
            header("Content-disposition: attachment; filename=\"$save_as\"");
            header("Expires: 0");
            header("Cache-Control: must-revalidate");
            header("Pragma: public");
            header("Content-length: $file_size");

            return $download;

        }

        return redirect(route('sftp.show', $sftpConnection))->with(['alert_type' => 'failure', 'alert_message' => 'File "' . $file . '" not found']);
    }

    public function readFile(Request $request, SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        $file = $request->file;

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {

            return response()->json(['success' => false, 'contents' => 'Could not connect', 'size' => null, 'file' => null, 'extension' => null])->header('Content-Type', 'application/json');
        }

        $sftp = SftpConnection::do($sftpConnection);

        if ($sftp->file_exists($file)) {

            $extension = pathinfo($file, PATHINFO_EXTENSION);

            $download = SftpConnection::downloadFile($sftp, $file);

            ActionLog::make(1, 'read', 'sftp', 'Read file: '.$file, $sftpConnection->server_id);

            return response()->json(['success' => true, 'contents' => $download, 'size' => $sftp->filesize($file), 'file' => $file, 'extension' => $extension])->header('Content-Type', 'application/json');
        }

        return response()->json(['success' => false, 'contents' => 'File "' . $file . '" could not be found', 'size' => null, 'file' => null, 'extension' => null])->header('Content-Type', 'application/json');
    }

    public function uploadFile(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        $request->validate([
            'save_as' => 'string|required|max:255',
            'the_file' => 'file|required',
        ]);

        $file = $request->file('the_file');

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return redirect(route('sftp.show', $sftpConnection))->with(['alert_type' => 'failure', 'alert_message' => 'Could not connect']);
        }

        $upload_file = $sftp->put($request->save_as, $file, SFTP::SOURCE_LOCAL_FILE);

        if ($upload_file) {
            ActionLog::make(1, 'upload', 'sftp', 'Uploaded file as: '.$request->save_as, $sftpConnection->server_id);

            return redirect(route('sftp.show', $sftpConnection))->with(['alert_type' => 'success', 'alert_message' => $file->getClientOriginalName() . '" uploaded as ' . $request->save_as]);
        }

        ActionLog::make(6, 'upload', 'sftp', 'Uploaded file failed', $sftpConnection->server_id);

        return redirect(route('sftp.show', $sftpConnection))->with(['alert_type' => 'failure', 'alert_message' => 'File not uploaded as "' . $request->save_as . '"']);

    }

    public function overwriteFile(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return redirect(route('sftp.read', $sftpConnection))->with(['alert_type' => 'failure', 'alert_message' => 'Could not connect']);
        }

        if (is_null($request->contents)) {
            return redirect(route('sftp.read', $sftpConnection))->with(['alert_type' => 'failure', 'alert_message' => 'Contents cannot be empty']);
        }

        return $sftp->put($request->save_as, $request->contents, SFTP::SOURCE_STRING);
    }

    public function createDownloadToServer(SftpConnection $sftpConnection): \Inertia\Response
    {
        $this->authorize('view', $sftpConnection);

        $data = SftpConnection::where('id', $sftpConnection->id)->with(['server', 'key', 'server.ip_ssh'])->firstOrFail();
        $ip = $data->server->ip_ssh->ip;

        return Inertia::render('Sftp/CreateDownload', [
            'resource' => $data,
            'ip' => $ip,
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function downloadToServer(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        $file = $request->file;

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return redirect(route('sftp.show', $sftpConnection))->with(['alert_type' => 'failure', 'alert_message' => 'Could not connect']);
        }

        $sftp = SftpConnection::do($sftpConnection);


        return null;
    }

}
