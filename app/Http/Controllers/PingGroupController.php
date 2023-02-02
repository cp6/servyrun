<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Ping;
use App\Models\PingGroup;
use App\Models\PingGroupAssigned;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PingGroupController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('PingGroups/Index', [
            'groups' => PingGroup::with(['assigned', 'assigned.server'])->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('PingGroups/Create', [
            'servers' => Server::has('conn')->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'string|required|max:64',
            'server1_id' => 'string|required|size:8',
            'server2_id' => 'string|required|size:8',
            'server3_id' => 'string|nullable|size:8',
            'server4_id' => 'string|nullable|size:8',
            'server5_id' => 'string|nullable|size:8',
            'server6_id' => 'string|nullable|size:8',
            'server7_id' => 'string|nullable|size:8',
            'server8_id' => 'string|nullable|size:8'
        ]);

        $servers_array = array();
        $servers_array[] = $request->server1_id;//Required
        $servers_array[] = $request->server2_id;//Required
        $servers_array[] = $request->server3_id ?? null;
        $servers_array[] = $request->server4_id ?? null;
        $servers_array[] = $request->server5_id ?? null;
        $servers_array[] = $request->server6_id ?? null;
        $servers_array[] = $request->server7_id ?? null;
        $servers_array[] = $request->server8_id ?? null;

        $servers_array = array_filter(array_unique($servers_array));

        $group_id = Str::random(8);

        $ping_group = new PingGroup();
        $ping_group->id = $group_id;
        $ping_group->title = $request->title;
        $ping_group->amount = count($servers_array);
        $ping_group->save();

        foreach ($servers_array as $server_id) {

            $ping_group_assigned = new PingGroupAssigned();
            $ping_group_assigned->group_id = $group_id;
            $ping_group_assigned->server_id = $server_id;
            $ping_group_assigned->save();

        }

        return redirect(route('ping-group.index'))->with(['alert_type' => 'success', 'alert_message' => 'Ping group created successfully']);
    }

    public function edit(PingGroup $pingGroup): \Inertia\Response
    {
        return Inertia::render('PingGroups/Edit', [
            'resource' => $pingGroup->with(['assigned'])->firstOrFail(),
            'servers' => Server::get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function update(Request $request, PingGroup $pingGroup)
    {
        $request->validate([
            'title' => 'string|required|max:64',
            'server1_id' => 'string|required|size:8',
            'server2_id' => 'string|required|size:8',
            'server3_id' => 'string|nullable|size:8',
            'server4_id' => 'string|nullable|size:8',
            'server5_id' => 'string|nullable|size:8',
            'server6_id' => 'string|nullable|size:8',
            'server7_id' => 'string|nullable|size:8',
            'server8_id' => 'string|nullable|size:8'
        ]);

        $servers_array = array();
        $servers_array[] = $request->server1_id;//Required
        $servers_array[] = $request->server2_id;//Required
        $servers_array[] = $request->server3_id ?? null;
        $servers_array[] = $request->server4_id ?? null;
        $servers_array[] = $request->server5_id ?? null;
        $servers_array[] = $request->server6_id ?? null;
        $servers_array[] = $request->server7_id ?? null;
        $servers_array[] = $request->server8_id ?? null;

        $servers_array = array_filter(array_unique($servers_array));

        $group_id = $pingGroup->id;

        $pingGroup->update([
            'title' => $request->title,
            'amount' => count($servers_array)
        ]);

        //Delete all assigned
        DB::table('ping_group_assigned')->where('group_id', $group_id)->delete();

        //Create assigned
        foreach ($servers_array as $server_id) {

            $ping_group_assigned = new PingGroupAssigned();
            $ping_group_assigned->group_id = $group_id;
            $ping_group_assigned->server_id = $server_id;
            $ping_group_assigned->save();

        }

        return redirect(route('ping-group.show', $pingGroup))->with(['alert_type' => 'success', 'alert_message' => 'Ping group created successfully']);
    }

    public function show(PingGroup $pingGroup): \Inertia\Response
    {
        return Inertia::render('PingGroups/Show', [
            'pingGroup' => $pingGroup,
            'pings' => Ping::where('ping_group', $pingGroup->id)->with(['group', 'to_server', 'from_server'])->orderBy('created_at', 'desc')->take(999)->get(),
            'hasAlert' => \Session::exists('alert_type'),
            'alert_type' => \Session::get('alert_type'),
            'alert_message' => \Session::get('alert_message')
        ]);
    }

    public function run(PingGroup $pingGroup)
    {
        $run_pg = PingGroup::runPings($pingGroup);
        if (is_null($run_pg)){
            return redirect(route('ping-group.show', $pingGroup))->with(['alert_type' => 'failure', 'alert_message' => 'Issue running Ping group. Check action logs for more information.']);
        }
        return redirect(route('ping-group.show', $pingGroup))->with(['alert_type' => 'info', 'alert_message' => 'Ping group ran']);
    }
/*
    public function run2(PingGroup $pingGroup)
    {
        $data = $pingGroup->with(['assigned.server.conn.key', 'assigned.server.ip_ssh'])->firstOrFail();
        $amount = $pingGroup->amount;

        foreach ($data->assigned as $ip) {
            $current_server_id = $ip->server->id;
            $current_ip = $ip->server->ip_ssh->ip;
            $current_connection_type = $ip->server->connection->type;

            for ($i = 0; $i < $amount; $i++) {
                $loop_server_id = $data->assigned[$i]->server->id;
                $loop_ip = $data->assigned[$i]->server->ip_ssh->ip;

                if ($current_ip !== $loop_ip) {

                    $command = Ping::buildCommand($loop_ip, 3);//Ping loop IP address 3 times

                    if ($current_connection_type === 1) {
                        //Stored password
                        $ssh = Connection::makeConnectionPassword($current_ip, $ip->server->connection->ssh_port, $ip->server->connection->username, $ip->server->connection->password, 12);

                        $ssh_output = Connection::runCommand($ssh, $command);
                    } elseif ($current_connection_type === 3) {
                        //Key NO password

                    } elseif ($current_connection_type === 4) {
                        //Key with stored password

                    }

                    $ping_result_array = Ping::parseResult(Ping::pingOutputToArray($ssh_output));

                    $ping = new Ping();
                    $ping->ping_group = $pingGroup->id;
                    $ping->server_id = $loop_server_id;
                    $ping->from_server_id = $current_server_id;
                    $ping->min = $ping_result_array['min'] ?? null;
                    $ping->max = $ping_result_array['max'] ?? null;
                    $ping->avg = $ping_result_array['avg'] ?? null;
                    $ping->was_up = (isset($ping_result_array['avg'])) ? 1 : 0;
                    $ping->save();

                }

            }

        }

        return redirect(route('ping-group.show', $pingGroup))->with(['alert_type' => 'success', 'alert_message' => 'Ping group ran successfully']);

    }
    */


    public function destroy(PingGroup $pingGroup)
    {
        $this->authorize('delete', $pingGroup);

        $pingGroup->delete();

        return redirect(route('ping-group.index'))->with(['alert_type' => 'success', 'alert_message' => 'Ping group deleted successfully']);
    }
}
