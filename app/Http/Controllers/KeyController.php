<?php

namespace App\Http\Controllers;

use App\Models\Key;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Http\Request;

class KeyController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Keys/Index', [
            'keys' => Key::get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Keys/Create', [
            'alert' => \Session::get('alert')
        ]);
    }

    public function store(Request $request)
    {
        if ($request->file('key_file') === null) {
            return redirect(route('key.create'))->with(['alert' => ['type' => 'failure', 'message' => 'No key file uploaded']]);
        }

        $request->validate([
            'password' => 'string|nullable',
        ]);

        $file = $request->file('key_file');

        if ($file->getSize() > 20000) {
            return redirect(route('key.create'))->with(['alert' => ['type' => 'failure', 'message' => 'File too large must be under 20KB']]);
        }

        $file_id_long = Str::random(32);

        $save_as = $file_id_long . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs("keys", $save_as, 'private');

        try {

            $key = new Key();
            $key->file_id = $file_id_long;
            $key->password = ($request->password) ? Crypt::encryptString($request->password) : null;
            $key->original_name = $file->getClientOriginalName();
            $key->saved_as = $save_as;
            $key->save();

        } catch (\Exception $exception) {

            return redirect(route('key.create'))->with(['alert' => ['type' => 'failure', 'message' => 'Key could not be created error ' . $exception->getCode()]]);
        }

        return redirect(route('key.index'))->with(['alert' => ['type' => 'success', 'message' => 'Key uploaded and created']]);
    }

    public function show(Key $key): \Inertia\Response
    {
        $this->authorize('view', $key);

        return Inertia::render('Keys/Show', [
            'resource' => Key::where('id', $key->id)->with(['conn', 'conn.server'])->firstOrFail(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function download(Key $key): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $this->authorize('download', $key);

        return Storage::disk('private')->download("keys/$key->saved_as");
    }

    public function destroy(Key $key)
    {
        $this->authorize('delete', $key);

        try {
            $key->delete();

            Storage::disk('private')->delete("keys/$key->saved_as");

        } catch (\Exception $exception) {
            return redirect(route('key.show', $key))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('key.index'))->with(['alert' => ['type' => 'success', 'message' => 'Key deleted successfully']]);
    }


}
