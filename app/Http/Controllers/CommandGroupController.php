<?php

namespace App\Http\Controllers;

use App\Models\Command;
use App\Models\CommandGroup;
use App\Models\CommandGroupAssigned;
use App\Models\Connection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            'command_id' => 'string|required|size:8',
            'timeout' => 'integer|max:999999|min:1'
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

    public function show(CommandGroup $commandGroup): \Inertia\Response
    {
        $this->authorize('view', $commandGroup);

        return Inertia::render('CommandGroups/Show', [
            'resource' => CommandGroup::where('id', $commandGroup->id)->with('the_command', 'assigned.server')->firstOrFail(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function edit(CommandGroup $commandGroup): \Inertia\Response
    {
        $this->authorize('view', $commandGroup);

        return Inertia::render('CommandGroups/Edit', [
            'resource' => CommandGroup::where('id', $commandGroup->id)->with('the_command', 'assigned.server')->firstOrFail(),
            'connections' => Connection::with('server')->get(),
            'commands' => Command::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function update(Request $request, CommandGroup $commandGroup)
    {
        $this->authorize('update', $commandGroup);

        $request->validate([
            'title' => 'string|required|max:64',
            'command_id' => 'string|required|size:8',
            'timeout' => 'integer|max:999999|min:1',
            'connection1_id' => 'string|required|size:12',
            'connection2_id' => 'string|nullable|size:12',
            'connection3_id' => 'string|nullable|size:12',
            'connection4_id' => 'string|nullable|size:12',
            'connection5_id' => 'string|nullable|size:12',
            'connection6_id' => 'string|nullable|size:12',
            'connection7_id' => 'string|nullable|size:12',
            'connection8_id' => 'string|nullable|size:12',
            'connection9_id' => 'string|nullable|size:12',
            'connection10_id' => 'string|nullable|size:12',
            'connection11_id' => 'string|nullable|size:12',
            'connection12_id' => 'string|nullable|size:12',
        ]);

        $connections_array = array();
        $connections_array[] = $request->connection1_id;//Required
        $connections_array[] = $request->connection2_id ?? null;
        $connections_array[] = $request->connection3_id ?? null;
        $connections_array[] = $request->connection4_id ?? null;
        $connections_array[] = $request->connection5_id ?? null;
        $connections_array[] = $request->connection6_id ?? null;
        $connections_array[] = $request->connection7_id ?? null;
        $connections_array[] = $request->connection8_id ?? null;
        $connections_array[] = $request->connection9_id ?? null;
        $connections_array[] = $request->connection10_id ?? null;
        $connections_array[] = $request->connection11_id ?? null;
        $connections_array[] = $request->connection12_id ?? null;
        //Now clean out any potential duplicates
        $connections_array = array_filter(array_unique($connections_array));

        DB::table('command_group_assigned')->where('group_id', $commandGroup->id)->delete();

        foreach ($connections_array as $connection_id) {

            try {

                $connection = Connection::where('id', $connection_id)->first();

                $cmd_group_assigned = new CommandGroupAssigned();
                $cmd_group_assigned->group_id = $commandGroup->id;
                $cmd_group_assigned->connection_id = $connection_id;
                $cmd_group_assigned->server_id = $connection->server_id;
                $cmd_group_assigned->save();

            } catch (\Exception $exception) {

                return redirect(route('command-group.edit', $commandGroup))->with(['alert_type' => 'failure', 'alert_message' => 'Command group assigned error ' . $exception->getCode()]);
            }

        }

        try {

            $commandGroup->title = $request->title;
            $commandGroup->command_id = $request->command_id;
            $commandGroup->timeout = $request->timeout;
            $commandGroup->server_count = count($connections_array);
            $commandGroup->save();

        } catch (\Exception $exception) {

            return redirect(route('command-group.edit', $commandGroup))->with(['alert_type' => 'failure', 'alert_message' => 'Command group could not be edited error ' . $exception->getCode()]);
        }

        return redirect(route('command-group.show', $commandGroup))->with(['alert_type' => 'success', 'alert_message' => 'Command group updated successfully']);
    }

    public function destroy(CommandGroup $commandGroup)
    {
        $this->authorize('delete', $commandGroup);

        try {
            $commandGroup->delete();
        } catch (\Exception $exception){
            return redirect(route('command-group.show', $commandGroup))->with(['alert_type' => 'failure', 'alert_message' => 'Error deleting: '.$exception->getMessage()]);
        }

        return redirect(route('command-group.index'))->with(['alert_type' => 'success', 'alert_message' => 'Command group deleted successfully']);
    }

    public function run(CommandGroup $commandGroup): \Illuminate\Http\JsonResponse
    {
        return CommandGroup::runCommandGroup($commandGroup);
    }

}
