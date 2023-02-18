<?php

namespace App\Http\Controllers;

use App\Models\DownloadedFile;
use App\Models\SftpConnection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DownloadedFileController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Downloaded/Index', [
            'downloads' => DownloadedFile::with(['conn'])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function show(DownloadedFile $downloadedFile): \Inertia\Response
    {
        return Inertia::render('Downloaded/Show', [
            'resource' => DownloadedFile::where('id', $downloadedFile->id)->with(['conn', 'conn.server'])->first(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function download(DownloadedFile $downloadedFile): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $user_dl_dir = Auth::user()->download_directory;

        return Storage::disk('private')->download("downloads/{$user_dl_dir}/$downloadedFile->saved_as");
    }

    public function uploadForm(DownloadedFile $downloadedFile): \Inertia\Response
    {
        return Inertia::render('Downloaded/Upload', [
            'resource' => DownloadedFile::where('id', $downloadedFile->id)->with(['conn', 'conn.server'])->first(),
            'connections' => SftpConnection::with(['server'])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function upload(Request $request, DownloadedFile $downloadedFile)
    {
        $request->validate([
            'connection_id' => 'string|required|size:8',
            'save_as' => 'string|required|max:255',
        ]);

        $user_dl_dir = Auth::user()->download_directory;

        if (!Storage::disk('private')->exists("downloads/{$user_dl_dir}/$downloadedFile->saved_as")) {
            return redirect(route('downloaded.show', $downloadedFile))->with(['alert_type' => 'failure', 'alert_message' => "File {$downloadedFile->saved_as} does not exist"]);
        }

        $file = Storage::disk('private')->get("downloads/{$user_dl_dir}/$downloadedFile->saved_as");

        $sftpConnection = SftpConnection::where('id', $request->connection_id)->with(['server'])->firstOrFail();

        $sftp = SftpConnection::do($sftpConnection);

        if (is_null($sftp)) {
            return redirect(route('downloaded.show', $downloadedFile))->with(['alert_type' => 'failure', 'alert_message' => 'Could not connect']);
        }

        $start_timer = time();

        $upload_file = $sftp->put($request->save_as, $file);

        $end_timer = time() - $start_timer;
        $upload_speed_mbps = ($downloadedFile->size / $end_timer / 1000 / 1000);

        if ($upload_file) {
            return redirect(route('downloaded.show', $downloadedFile))->with(['alert_type' => 'success', 'alert_message' => "Uploaded {$downloadedFile->saved_as} to {$sftpConnection->server->hostname} as {$request->save_as} (" . number_format($upload_speed_mbps, 2) . "Mbps {$end_timer}s)"]);
        }

        return redirect(route('downloaded.show', $downloadedFile))->with(['alert_type' => 'failure', 'alert_message' => "Upload failed for {$downloadedFile->saved_as} to {$sftpConnection->server->hostname}"]);
    }

    public function destroy(DownloadedFile $downloadedFile)
    {
        try {
            $file_name = $downloadedFile->saved_as;

            $downloadedFile->delete();

        } catch (\Exception $exception) {
            return redirect(route('downloaded.show', $downloadedFile))->with(['alert_type' => 'failure', 'alert_message' => 'Error deleting ' . $file_name . ' : ' . $exception->getMessage()]);
        }

        $user_dl_dir = Auth::user()->download_directory;

        Storage::disk('private')->delete("downloads/{$user_dl_dir}/$downloadedFile->saved_as");

        return redirect(route('downloaded.index'))->with(['alert_type' => 'success', 'alert_message' => $file_name . ' was deleted successfully']);
    }

}
