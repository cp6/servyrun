<?php

namespace App\Http\Controllers;

use App\Models\Command;
use App\Models\CommandGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CommandGroupController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('CommandGroups/Index', [
            'groups' => CommandGroup::with(['command'])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('CommandGroups/Create', [
            'commands' => Command::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'string|required|max:64',
            'command_id' => 'string|required|size:8'
        ]);

        try {

            $command_group = new CommandGroup();
            $command_group->title = $request->title;
            $command_group->command_id = $request->command_id;
            $command_group->save();

        } catch (\Exception $exception) {

            return redirect(route('command-group.create'))->with(['alert_type' => 'failure', 'alert_message' => 'Command group could not be created error ' . $exception->getCode()]);
        }

        return redirect(route('command-group.index'))->with(['alert_type' => 'success', 'alert_message' => 'Command group create successfully']);
    }

    public function show(CommandGroup $commandGroup)
    {
        //
    }

    public function edit(CommandGroup $commandGroup)
    {
        //
    }

    public function update(Request $request, CommandGroup $commandGroup)
    {
        //
    }

    public function destroy(CommandGroup $commandGroup)
    {
        //
    }
}
