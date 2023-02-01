<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class ActionLogController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('ActionLogs/Index', [
            'logs' => ActionLog::with(['server'])->orderBy('created_at', 'desc')->get()
        ]);
    }

}
