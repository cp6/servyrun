<?php

namespace App\Http\Controllers;

use App\Models\Command;
use App\Models\CommandOutput;
use App\Models\Scopes\UserOwnedScope;
use App\Models\Server;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class CommandOutputController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Outputs/Index', [
            'outputs' => CommandOutput::with(['command', 'server'])->orderBy('created_at', 'desc')->take(999)->get()
        ]);
    }

    public function showServer(Server $server): \Inertia\Response
    {
        return Inertia::render('Outputs/IndexServer', [
            'server' => $server,
            'outputs' => CommandOutput::where('server_id', $server->id)->with(['command', 'server'])->orderBy('created_at', 'desc')->take(999)->get()
        ]);
    }

    public function showCommand(Command $command): \Inertia\Response
    {
        return Inertia::render('Outputs/IndexCommand', [
            'command' => $command,
            'outputs' => CommandOutput::where('command_id', $command->id)->with(['command', 'server'])->orderBy('created_at', 'desc')->take(999)->get()
        ]);
    }

    public function show(CommandOutput $commandOutput): \Inertia\Response
    {
        //Show simple public view first if enabled AND not logged in
        if ($commandOutput->is_public === 1 && !\Auth::user()) {
            return Inertia::render('Outputs/ShowPublic', [
                'resource' => $commandOutput->where('id', $commandOutput->id)->withoutGlobalScope(UserOwnedScope::class)->with(['commandNoOwner'])->firstOrFail()
            ]);
        }

        if (!\Auth::user()) {
            abort(404);
        }

        $this->authorize('view', $commandOutput);

        return Inertia::render('Outputs/Show', [
            'resource' => $commandOutput->where('id', $commandOutput->id)->with(['command', 'server'])->firstOrFail()
        ]);
    }

    public function downloadFullPdf(CommandOutput $commandOutput): \Illuminate\Http\Response
    {
        $pdf = PDF::loadView('pdf.output_full', [
            'datetime' => $commandOutput->created_at,
            'command' => $commandOutput->the_command,
            'seconds' => $commandOutput->seconds_taken,
            'output' => trim($commandOutput->output)
        ]);

        return $pdf->download($commandOutput->id . '.pdf');
    }

    public function downloadSimplePdf(CommandOutput $commandOutput): \Illuminate\Http\Response
    {
        $pdf = PDF::loadView('pdf.output', [
            'output' => trim($commandOutput->output)
        ]);

        return $pdf->download($commandOutput->id . '.pdf');
    }

}
