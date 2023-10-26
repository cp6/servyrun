<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MyIdlersImportController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Import/Index', [
            'alert' => \Session::get('alert')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'url' => 'url|required',
            'api_token' => 'string|required|size:60'
        ]);

        $call = Http::withHeaders(['Authorization' => 'Bearer ' . $request->api_token, 'Accept' => 'application/json'])->get($request->url);

        if ($call->status() === 200) {

            $servers = $call->json();

            foreach ($servers as $server) {

            }

        }


    }

}
