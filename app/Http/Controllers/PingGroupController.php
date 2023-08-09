<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Ping;
use App\Models\PingGroup;
use App\Models\PingGroupAssigned;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PingGroupController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('PingGroups/Index', [
            'groups' => PingGroup::with(['assigned', 'assigned.server'])->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('PingGroups/Create', [
            'connections' => Connection::has('server')->with('server')->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'string|required|max:64',
            'connection1_id' => 'string|required|size:12',
            'connection2_id' => 'string|required|size:12',
            'connection3_id' => 'string|nullable|size:12',
            'connection4_id' => 'string|nullable|size:12',
            'connection5_id' => 'string|nullable|size:12',
            'connection6_id' => 'string|nullable|size:12',
            'connection7_id' => 'string|nullable|size:12',
            'connection8_id' => 'string|nullable|size:12'
        ]);

        $connections_array = [];
        $connections_array[] = $request->connection1_id;//Required
        $connections_array[] = $request->connection2_id;//Required
        $connections_array[] = $request->connection3_id ?? null;
        $connections_array[] = $request->connection4_id ?? null;
        $connections_array[] = $request->connection5_id ?? null;
        $connections_array[] = $request->connection6_id ?? null;
        $connections_array[] = $request->connection7_id ?? null;
        $connections_array[] = $request->connection8_id ?? null;

        $connections_array = array_filter(array_unique($connections_array));

        if (count($connections_array) === 1){
            return redirect(route('ping-group.create'))->with(['alert' => ['type' => 'failure', 'message' => 'Must have more than 1 unique connection']]);
        }

        try {

            $ping_group = new PingGroup();
            $ping_group->title = $request->title;
            $ping_group->amount = count($connections_array);
            $ping_group->save();

        } catch (\Exception $exception) {

            return redirect(route('ping-group.create'))->with(['alert' => ['type' => 'failure', 'message' => 'Ping group could not be created error ' . $exception->getCode()]]);
        }

        foreach ($connections_array as $connection_id) {

            try {
                $connection = Connection::where('id', $connection_id)->first();

                $ping_group_assigned = new PingGroupAssigned();
                $ping_group_assigned->group_id = $ping_group->id;
                $ping_group_assigned->server_id = $connection->server_id;
                $ping_group_assigned->connection_id = $connection_id;
                $ping_group_assigned->save();

            } catch (\Exception $exception) {

                return redirect(route('ping-group.create'))->with(['alert' => ['type' => 'failure', 'message' => 'Ping group could not be created error ' . $exception->getCode()]]);
            }

        }

        return redirect(route('ping-group.index'))->with(['alert' => ['type' => 'success', 'message' => 'Ping group created successfully']]);
    }

    public function edit(PingGroup $pingGroup): \Inertia\Response
    {
        $this->authorize('view', $pingGroup);

        return Inertia::render('PingGroups/Edit', [
            'resource' => $pingGroup->with(['assigned'])->firstOrFail(),
            'connections' => Connection::has('server')->with('server')->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function update(Request $request, PingGroup $pingGroup)
    {
        $this->authorize('update', $pingGroup);

        $request->validate([
            'title' => 'string|required|max:64',
            'connection1_id' => 'string|required|size:12',
            'connection2_id' => 'string|required|size:12',
            'connection3_id' => 'string|nullable|size:12',
            'connection4_id' => 'string|nullable|size:12',
            'connection5_id' => 'string|nullable|size:12',
            'connection6_id' => 'string|nullable|size:12',
            'connection7_id' => 'string|nullable|size:12',
            'connection8_id' => 'string|nullable|size:12'
        ]);

        $connections_array = [];
        $connections_array[] = $request->connection1_id;//Required
        $connections_array[] = $request->connection2_id;//Required
        $connections_array[] = $request->connection3_id ?? null;
        $connections_array[] = $request->connection4_id ?? null;
        $connections_array[] = $request->connection5_id ?? null;
        $connections_array[] = $request->connection6_id ?? null;
        $connections_array[] = $request->connection7_id ?? null;
        $connections_array[] = $request->connection8_id ?? null;

        $connections_array = array_filter(array_unique($connections_array));

        $group_id = $pingGroup->id;

        $pingGroup->update([
            'title' => $request->title,
            'amount' => count($connections_array)
        ]);

        //Delete all assigned
        DB::table('ping_group_assigned')->where('group_id', $group_id)->delete();

        //Create assigned
        foreach ($connections_array as $connection_id) {

            $connection = Connection::where('id', $connection_id)->first();

            $ping_group_assigned = new PingGroupAssigned();
            $ping_group_assigned->group_id = $group_id;
            $ping_group_assigned->connection_id = $connection_id;
            $ping_group_assigned->server_id = $connection->server_id;
            $ping_group_assigned->save();

        }

        return redirect(route('ping-group.show', $pingGroup))->with(['alert' => ['type' => 'success', 'message' => 'Ping group updated successfully']]);
    }

    public function show(PingGroup $pingGroup): \Inertia\Response
    {
        $this->authorize('view', $pingGroup);

        return Inertia::render('PingGroups/Show', [
            'pingGroup' => $pingGroup,
            'pings' => Ping::where('ping_group', $pingGroup->id)->with(['group', 'to_server', 'from_server'])->orderBy('created_at', 'desc')->take(999)->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function run(PingGroup $pingGroup)
    {
        $this->authorize('view', $pingGroup);

        $run_pg = PingGroup::runPings($pingGroup);
        if (is_null($run_pg)) {
            return redirect(route('ping-group.show', $pingGroup))->with(['alert' => ['type' => 'failure', 'message' => 'Issue running Ping group. Check action logs for more information.']]);
        }
        return redirect(route('ping-group.show', $pingGroup))->with(['alert' => ['type' => 'info', 'message' => 'Ping group ran']]);
    }

    public function destroy(PingGroup $pingGroup)
    {
        $this->authorize('delete', $pingGroup);

        try {
            $pingGroup->delete();
        } catch (\Exception $exception) {
            return redirect(route('ping-group.show', $pingGroup))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('ping-group.index'))->with(['alert' => ['type' => 'success', 'message' => 'Ping group deleted successfully']]);
    }
}
