<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use App\Models\Connection;
use App\Models\DownloadedFile;
use App\Models\Key;
use App\Models\Server;
use App\Models\SftpConnection;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use phpseclib3\Net\SFTP;

class SftpConnectionController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Sftp/Index', [
            'connections' => SftpConnection::with(['server'])->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Sftp/Create', [
            'servers' => Server::get(),
            'connections' => Connection::with('server')->get(),
            'keys' => Key::get(),
            'alert' => \Session::get('alert')
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

            return redirect(route('sftp.create'))->with(['alert' => ['type' => 'failure', 'message' => 'SFTP connection could not be created error ' . $exception->getCode()]]);
        }

        return redirect(route('sftp.show', $sftp_conn))->with(['alert' => ['type' => 'success', 'message' => 'SFTP connection created successfully']]);
    }

    public function show(SftpConnection $sftpConnection): \Inertia\Response
    {
        $this->authorize('view', $sftpConnection);

        $data = SftpConnection::where('id', $sftpConnection->id)->with(['server', 'key', 'server.ip_ssh'])->firstOrFail();
        $ip = $data->server->ip_ssh->ip;

        return Inertia::render('Sftp/Show', [
            'resource' => $data,
            'ip' => $ip,
            'alert' => \Session::get('alert')
        ]);
    }

    public function downloadFilePdf(SftpConnection $sftpConnection, string $filepath)
    {
        $this->authorize('view', $sftpConnection);

        $file = urldecode($filepath);

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {

            return response()->json(['success' => false, 'message' => 'Could not connect', 'file' => $file], 500)->header('Content-Type', 'application/json');
        }

        if ($sftp->file_exists($file)) {

            $download = SftpConnection::downloadFile($sftp, $file);

            $pdf = PDF::loadView('pdf.file', [
                'contents' => $download
            ]);

            return $pdf->download($file . '.pdf');

        }

        return response()->json(['success' => false, 'message' => 'File not found', 'file' => $file], 400)->header('Content-Type', 'application/json');

    }

    public function read(SftpConnection $sftpConnection): \Inertia\Response
    {
        $this->authorize('view', $sftpConnection);

        $data = SftpConnection::where('id', $sftpConnection->id)->with(['server', 'key', 'server.ip_ssh'])->firstOrFail();
        $ip = $data->server->ip_ssh->ip;

        return Inertia::render('Sftp/Read', [
            'resource' => $data,
            'ip' => $ip,
            'alert' => \Session::get('alert')
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
            'alert' => \Session::get('alert')
        ]);

    }

    public function update(Request $request, SftpConnection $sftpConnection): void
    {
        $this->authorize('update', $sftpConnection);
    }

    public function destroy(SftpConnection $sftpConnection)
    {
        $this->authorize('delete', $sftpConnection);

        try {
            $sftpConnection->delete();
        } catch (\Exception $exception) {
            return redirect(route('sftp.show', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('mysqldump.index'))->with(['alert' => ['type' => 'success', 'message' => 'SFTP connection deleted successfully']]);
    }

    public function authenticated(SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        $sftp = SftpConnection::do($sftpConnection, 3);

        if (is_null($sftp)) {
            return response()->json(['result' => false])->header('Content-Type', 'application/json');
        }

        return response()->json(['result' => $sftp->isAuthenticated()])->header('Content-Type', 'application/json');
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

        ActionLog::make(1, 'run', 'sftp', 'Ran SFTP command: ' . $command, $sftpConnection->server_id);

        return response()->json([
            'id' => $sftpConnection->id,
            'server_id' => $sftpConnection->server_id,
            'the_command' => $command,
            'seconds_taken' => number_format($time_end - $time_start, 3),
            'output' => $output
        ])->header('Content-Type', 'application/json');

    }

    public function directoryContentsAsArray(Request $request, SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        $directory = $request->directory ?? '';

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return response()->json(['message' => 'ERROR: SFTP connection could not be made! Check the logs for more information.'], 400);
        }

        return response()->json([
            'directory' => $directory,
            'contents' => $sftp->nlist($directory)
        ])->header('Content-Type', 'application/json');

    }

    public function directoryContentsDetailedAsArray(Request $request, SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        $directory = $request->directory ?? '';

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return response()->json(['message' => 'ERROR: SFTP connection could not be made! Check the logs for more information.'], 400);
        }

        $contents = $sftp->nlist($directory);

        $result = [];

        foreach ($contents as $content) {
            $is_file = $sftp->filetype($content) === 'file';
            $fileatime = $sftp->fileatime($content);
            $filemtime = $sftp->filemtime($content);

            $result[] = [
                'name' => $content,
                'type' => $sftp->filetype($content),
                'is_file' => $is_file,
                'ext' => ($is_file) ? substr($content, strrpos($content, '.') + 1) : null,
                'size' => ($is_file) ? $sftp->filesize($content) : null,
                'size_kb' => ($is_file) ? $sftp->filesize($content) / 1000 : null,
                'size_mb' => ($is_file) ? (float)number_format($sftp->filesize($content) / 1000 / 1000, 3) : null,
                'last_accessed' => $fileatime,
                'last_accessed_formatted' => gmdate("Y-m-d H:i:s", $fileatime),
                'last_modified' => $filemtime,
                'last_modified_formatted' => gmdate("Y-m-d H:i:s", $filemtime),
                'readable' => $sftp->is_readable($content),
                'writable' => $sftp->is_writable($content),
            ];

        }

        return response()->json([
            'directory' => $directory,
            'contents' => $result
        ])->header('Content-Type', 'application/json');

    }

    public function directoryFilesDetailedAsArray(Request $request, SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        $directory = $request->directory ?? '';

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return response()->json(['message' => 'ERROR: SFTP connection could not be made! Check the logs for more information.'], 400);
        }

        $contents = $sftp->nlist($directory);

        $result = [];

        foreach ($contents as $content) {
            $is_file = $sftp->filetype($content) === 'file';

            if ($is_file) {

                $fileatime = $sftp->fileatime($content);
                $filemtime = $sftp->filemtime($content);

                $result[] = [
                    'name' => $content,
                    'type' => $sftp->filetype($content),
                    'ext' => substr($content, strrpos($content, '.') + 1),
                    'size' => $sftp->filesize($content),
                    'size_kb' => $sftp->filesize($content) / 1000,
                    'size_mb' => (float)number_format($sftp->filesize($content) / 1000 / 1000, 3),
                    'last_accessed' => $fileatime,
                    'last_accessed_formatted' => gmdate("Y-m-d H:i:s", $fileatime),
                    'last_modified' => $filemtime,
                    'last_modified_formatted' => gmdate("Y-m-d H:i:s", $filemtime),
                    'readable' => $sftp->is_readable($content),
                    'writable' => $sftp->is_writable($content),
                ];
            }

        }

        return response()->json([
            'directory' => $directory,
            'contents' => $result
        ])->header('Content-Type', 'application/json');

    }

    public function fileDetailedAsArray(Request $request, SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        if (!$request->has('filepath') || is_null($request->filepath)) {
            return response()->json(['message' => 'ERROR: filepath was not set'], 400)->header('Content-Type', 'application/json');
        }

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return response()->json(['message' => 'ERROR: SFTP connection could not be made! Check the logs for more information.'], 400)->header('Content-Type', 'application/json');
        }

        $filepath = $request->filepath;

        if ($sftp->file_exists($filepath)) {

            $is_file = $sftp->filetype($filepath) === 'file';

            if ($is_file) {

                $fileatime = $sftp->fileatime($filepath);
                $filemtime = $sftp->filemtime($filepath);

                $result = [
                    'file' => basename($filepath),
                    'type' => $sftp->filetype($filepath),
                    'ext' => substr($filepath, strrpos($filepath, '.') + 1),
                    'size' => $sftp->filesize($filepath),
                    'size_kb' => $sftp->filesize($filepath) / 1000,
                    'size_mb' => (float)number_format($sftp->filesize($filepath) / 1000 / 1000, 3),
                    'last_accessed' => $fileatime,
                    'last_accessed_formatted' => gmdate("Y-m-d H:i:s", $fileatime),
                    'last_modified' => $filemtime,
                    'last_modified_formatted' => gmdate("Y-m-d H:i:s", $filemtime),
                    'readable' => $sftp->is_readable($filepath),
                    'writable' => $sftp->is_writable($filepath),
                ];

                return response()->json($result)->header('Content-Type', 'application/json');

            }
        }
        return response()->json(['message' => 'ERROR: file was not found.'], 400)->header('Content-Type', 'application/json');
    }

    public function downloadFile(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        $file = $request->file;

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return redirect(route('sftp.show', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => 'Could not connect']]);
        }

        if ($sftp->file_exists($file)) {

            $save_as = basename($file);

            $file_size = $sftp->filesize($file);

            ActionLog::make(1, 'download', 'sftp', 'Downloaded file: ' . $file, $sftpConnection->server_id);

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

        return redirect(route('sftp.show', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => 'File "' . $file . '" not found']]);
    }

    public function readFile(Request $request, SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        $file = $request->file;

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {

            return response()->json(['success' => false, 'contents' => 'Could not connect', 'size' => null, 'file' => null, 'extension' => null])->header('Content-Type', 'application/json');
        }

        if ($sftp->file_exists($file)) {

            $extension = pathinfo($file, PATHINFO_EXTENSION);

            $download = SftpConnection::downloadFile($sftp, $file);

            ActionLog::make(1, 'read', 'sftp', 'Read file: ' . $file, $sftpConnection->server_id);

            return response()->json(['success' => true, 'contents' => $download, 'size' => $sftp->filesize($file), 'file' => $file, 'extension' => $extension])->header('Content-Type', 'application/json');
        }

        return response()->json(['success' => false, 'contents' => 'File "' . $file . '" could not be found', 'size' => null, 'file' => null, 'extension' => null])->header('Content-Type', 'application/json');
    }

    public function generateReadRawResponse(Request $request, SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $sftpConnection);

        if (!$request->has('file') || is_null($request->file)) {
            return response()->json(['success' => false, 'request' => null, 'message' => 'File not set'])->header('Content-Type', 'application/json');
        }

        return response()->json(['success' => true, 'request' => urlencode($request->file)])->header('Content-Type', 'application/json');

    }

    public function outputFileRaw(SftpConnection $sftpConnection, string $filepath): string
    {
        $this->authorize('view', $sftpConnection);

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {

            $output = "<html lang='en'><head><title>Could not connect: " . $sftpConnection->id . "</title></head><body>";
            $output .= 'Could not connect to SFTP';
            $output .= "</body></html>";
            return $output;
        }

        if ($sftp->file_exists(urldecode($filepath))) {

            if ($sftp->filesize(urldecode($filepath)) > 200000) {
                $output = "<html lang='en'><head><title>" . urldecode($filepath) . "</title></head><body>";
                $output .= "<pre>This file is above 2MB in size, outputting this into the browser is not a good idea.</pre>";
                $output .= "</body></html>";
                return $output;
            }

            $download = SftpConnection::downloadFile($sftp, urldecode($filepath));

            $output = "<html lang='en'><head><title>{$sftpConnection->id}: " . urldecode($filepath) . "</title></head><body>";
            $output .= "<pre>" . $download . "</pre>";
            $output .= "</body></html>";
            return $output;
        }

        $output = "<html lang='en'><head><title>File not found: " . urldecode($filepath) . "</title></head><body>";
        $output .= 'The file "' . urldecode($filepath) . '" could not be found';
        $output .= "</body></html>";
        return $output;
    }

    public function uploadFile(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        $request->validate([
            'save_as' => 'string|required|max:255',
            'the_file' => 'file|required',
        ]);

        $file = $request->file('the_file');
        $file_size = $file->getSize();

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return redirect(route('sftp.show', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => 'Could not connect']]);
        }

        Storage::disk('private')->put("progress/" . \Auth::id() . "/upload.json", json_encode(['progress' => 0]));

        $start_timer = time();

        $upload_file = $sftp->put($request->save_as, $file, SFTP::SOURCE_LOCAL_FILE, -1, -1, function ($sent) use ($file_size) {
            $progress = round(($sent / $file_size) * 100);
            Storage::disk('private')->put("progress/" . \Auth::id() . "/upload.json", json_encode(['progress' => $progress]));
        });

        $end_timer = time() - $start_timer;

        if ($end_timer === 0) {
            $end_timer = 0.1;
        }

        if ($file_size > 0) {
            $upload_speed_mbps = number_format(($file_size / $end_timer / 1000 / 1000), 2);
        } else {
            $upload_speed_mbps = null;
        }

        if ($upload_file) {
            ActionLog::make(1, 'upload', 'sftp', "Uploaded {$file->getClientOriginalName()} as {$request->save_as} ({$upload_speed_mbps} Mbps)", $sftpConnection->server_id);

            return redirect(route('sftp.show', $sftpConnection))->with(['alert' => ['type' => 'success', 'message' => "Uploaded {$file->getClientOriginalName()} as {$request->save_as} ({$upload_speed_mbps} Mbps)"]]);
        }

        ActionLog::make(6, 'upload', 'sftp', 'Uploaded file failed', $sftpConnection->server_id);

        return redirect(route('sftp.show', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => 'File not uploaded as "' . $request->save_as . '"']]);

    }

    public static function uploadFileProgress(SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $file = json_decode(Storage::disk('private')->get("progress/" . \Auth::id() . "/upload.json"));
        return response()->json($file)->header('Content-Type', 'application/json');
    }

    public function overwriteFile(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return redirect(route('sftp.read', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => 'Could not connect']]);
        }

        if (is_null($request->contents)) {
            return redirect(route('sftp.read', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => 'Contents cannot be empty']]);
        }

        return $sftp->put($request->save_as, $request->contents, SFTP::SOURCE_STRING);
    }

    public function createDownloadToServer(SftpConnection $sftpConnection): \Inertia\Response
    {
        $this->authorize('view', $sftpConnection);

        $data = SftpConnection::where('id', $sftpConnection->id)->with(['server', 'key', 'server.ip_ssh'])->firstOrFail();

        return Inertia::render('Sftp/CreateDownload', [
            'resource' => $data,
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'message' => \Session::get('message')
        ]);
    }

    public function downloadToServer(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

        $request->validate([
            'filepath' => 'string|required|max:255',
            'save_as' => 'string|sometimes|nullable|max:64'
        ]);

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return redirect(route('sftp.show', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => 'Could not connect']]);
        }

        if ($sftp->file_exists($request->filepath)) {

            if (is_null($request->save_as)) {
                $save_as_filename = basename($request->filepath);
            } else {
                $save_as_filename = $request->save_as;
            }

            $save_to_dir = User::where('id', \Auth::id())->select('download_directory')->first()->download_directory;

            Storage::disk('private')->put("progress/" . \Auth::id() . "/download.json", json_encode(['progress' => 0]));

            $start_timer = time();

            $file_content = SftpConnection::downloadFile($sftp, $request->filepath, true);

            try {
                $download_result = Storage::disk('private')->put("downloads/{$save_to_dir}/{$save_as_filename}", $file_content);
            } catch (\Exception $exception) {
                return redirect(route('sftp.create-download-to-server', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => "Error downloading {$request->filepath} message: {$exception->getMessage()}"]]);
            }

            $end_timer = time() - $start_timer;

            if ($download_result) {

                try {
                    $file_size = Storage::disk('private')->size("downloads/{$save_to_dir}/{$save_as_filename}");

                    if ($end_timer === 0) {
                        $end_timer = 0.1;
                    }

                    $download_speed_mbps = number_format(($file_size / $end_timer / 1000 / 1000), 2);

                    $downloaded_file = new DownloadedFile();
                    $downloaded_file->sftp_connection_id = $sftpConnection->id;
                    $downloaded_file->filename = basename($request->filepath);
                    $downloaded_file->from_dir = dirname($request->filepath);
                    $downloaded_file->to_dir = $save_to_dir;
                    $downloaded_file->saved_as = $save_as_filename;
                    $downloaded_file->size = $file_size;
                    $downloaded_file->speed_mbps = ($file_size / $end_timer / 1000 / 1000);
                    $downloaded_file->save();
                } catch (\Exception $exception) {
                    ActionLog::make(6, 'download to server', 'sftp download', "Error downloading {$request->filepath} message: {$exception->getMessage()}", $sftpConnection->server_id);
                    return redirect(route('sftp.create-download-to-server', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => "Error downloading {$request->filepath} message: {$exception->getMessage()}"]]);
                }

                return redirect(route('sftp.create-download-to-server', $sftpConnection))->with(['alert' => ['type' => 'success', 'message' => "Downloaded {$request->filepath} as {$save_as_filename} ({$download_speed_mbps} Mbps)"]]);
            }

            ActionLog::make(6, 'download to server', 'sftp download', "Error downloading {$request->filepath} as {$save_as_filename}", $sftpConnection->server_id);
            return redirect(route('sftp.create-download-to-server', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => "Error downloading {$request->filepath} as {$save_as_filename}"]]);

        }

        ActionLog::make(6, 'download to server', 'sftp download', "File {$request->filepath} was not found", $sftpConnection->server_id);
        return redirect(route('sftp.create-download-to-server', $sftpConnection))->with(['alert' => ['type' => 'failure', 'message' => "File {$request->filepath} was not found"]]);

    }

    public static function downloadToServerFileProgress(SftpConnection $sftpConnection): \Illuminate\Http\JsonResponse
    {
        $file = json_decode(Storage::disk('private')->get("progress/" . \Auth::id() . "/download.json"));
        return response()->json($file)->header('Content-Type', 'application/json');
    }

}
