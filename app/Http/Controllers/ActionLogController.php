<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActionLogController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('ActionLogs/Index', [
            'logs' => ActionLog::with(['server'])->orderBy('created_at', 'desc')->get()
        ]);
    }

    public function show(ActionLog $actionLog): \Inertia\Response
    {
        return Inertia::render('ActionLogs/Show', [
            'resource' => ActionLog::where('id', $actionLog->id)->with(['server', 'command', 'database', 'connection'])->first()
        ]);
    }

}
