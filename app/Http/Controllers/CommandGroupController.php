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
            'groups' => CommandGroup::with(['the_command'])->get(),
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
        return Inertia::render('CommandGroups/Show', [
            'resource' => CommandGroup::where('id', $commandGroup->id)->with('the_command', 'assigned.server')->firstOrFail(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function edit(CommandGroup $commandGroup)
    {
        //
    }

    public function update(Request $request, CommandGroup $commandGroup)
    {
        $request->validate([
            'title' => 'string|required|max:64',
            'command_id' => 'string|required|size:8'
        ]);

        try {

            $commandGroup->title = $request->title;
            $commandGroup->command_id = $request->command_id;
            $commandGroup->save();

        } catch (\Exception $exception) {

            return redirect(route('command-group.edit', $commandGroup))->with(['alert_type' => 'failure', 'alert_message' => 'Command group could not be edited error ' . $exception->getCode()]);
        }

        return redirect(route('command-group.show', $commandGroup))->with(['alert_type' => 'success', 'alert_message' => 'Command group updated successfully']);
    }

    public function destroy(CommandGroup $commandGroup)
    {
        $commandGroup->delete();

        return redirect(route('command-group.index'))->with(['alert_type' => 'success', 'alert_message' => 'Command group deleted successfully']);
    }

}
