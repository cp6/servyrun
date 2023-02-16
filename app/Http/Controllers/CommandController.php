<?php

namespace App\Http\Controllers;

use App\Models\Command;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommandController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Commands/Index', [
            'commands' => Command::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function create(): \Inertia\Response
    {
        if (Command::get()->count() >= env('MAX_COMMANDS_PER_ACCOUNT', 30)) {
            return abort('403', 'Command limit has been hit', ['message' => 'Command limit has been hit']);
        }

        return Inertia::render('Commands/Create', [
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function store(Request $request)
    {
        if (Command::get()->count() >= env('MAX_COMMANDS_PER_ACCOUNT', 30)) {
            return abort('403', 'Command limit has been hit', ['message' => 'Command limit has been hit']);
        }

        $request->validate([
            'title' => 'string|required|max:64',
            'command' => 'string|required|max:255'
        ]);

        try {

            $command = new Command();
            $command->title = $request->title;
            $command->command = $request->command;
            $command->save();

        } catch (\Exception $exception) {

            return redirect(route('command.create'))->with(['alert_type' => 'failure', 'alert_message' => 'Command could not be created error ' . $exception->getCode()]);
        }

        return redirect(route('command.index'))->with(['alert_type' => 'success', 'alert_message' => 'Command create successfully']);
    }

    public function edit(Command $command): \Inertia\Response
    {
        return Inertia::render('Commands/Edit', [
            'resource' => Command::where('id', $command->id)->firstOrFail(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function update(Request $request, Command $command)
    {
        $this->authorize('update', $command);
        $request->validate([
            'title' => 'string|required|max:64',
            'command' => 'string|required|max:255',
        ]);

        $command->update([
            'title' => $request->title,
            'command' => $request->command
        ]);

        return redirect(route('command.index'))->with(['alert_type' => 'success', 'alert_message' => 'Command updated successfully']);
    }

    public function destroy(Command $command)
    {
        $this->authorize('delete', $command);

        try {
            $command->delete();
        } catch (\Exception $exception){
            return redirect(route('command.index'))->with(['alert_type' => 'failure', 'alert_message' => 'Error deleting: '.$exception->getMessage()]);
        }

        return redirect(route('command.index'))->with(['alert_type' => 'success', 'alert_message' => 'Command deleted successfully']);
    }

    public function show(Command $command)
    {
        abort(404);
    }

    public function run(Request $request)
    {
        abort(404);
    }
}
