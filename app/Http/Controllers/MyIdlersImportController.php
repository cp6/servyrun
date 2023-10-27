<?php

namespace App\Http\Controllers;

use App\Models\IpAddress;
use App\Models\Location;
use App\Models\Server;
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
            'api_url' => 'url|required',
            'api_token' => 'string|required|size:60'
        ]);

        $call = Http::withHeaders(['Authorization' => 'Bearer ' . $request->api_token, 'Accept' => 'application/json'])->get($request->api_url);

        if ($call->successful()) {

            $servers = $call->json();

            $count_success = $count_fail = 0;

            foreach ($servers as $server) {

                try {
                    //Try to match location
                    $location_name = $server['location']['name'];
                    $explode = explode(",", $location_name);
                    $location = Location::where('city', $explode[0])->where('country', $explode[1])->first();

                    $new_server = new Server();
                    $new_server->hostname = $server['hostname'];
                    $new_server->title = $server['id'];
                    $new_server->type_id = $server['server_type'];
                    $new_server->bandwidth_gb = $server['bandwidth'];
                    $new_server->ram_mb = $server['ram_as_mb'];
                    $new_server->cpu_cores = $server['cpu'];
                    $new_server->disk_gb = $server['disk_as_gb'];
                    $new_server->operating_system = $server['os']['name'] ?? null;
                    $new_server->location_id = $location->id;
                    $new_server->price = $server['price']['price'] ?? null;
                    $new_server->currency = $server['price']['currency'] ?? null;
                    $new_server->payment_term = $server['price']['term'] ?? null;
                    $new_server->price_usd = $server['price']['as_usd'] ?? null;
                    $new_server->next_due_date = $server['price']['next_due_date'] ?? null;
                    $new_server->save();

                    if (isset($server['ips'][0])) {
                        $new_ip = new IpAddress();
                        $new_ip->server_id = $new_server->id;
                        $new_ip->ip = $server['ips'][0]['address'];
                        $new_ip->is_ipv4 = $server['ips'][0]['is_ipv4'];
                        $new_ip->is_main = 1;
                        $new_ip->save();

                        IpAddress::fetchUpdateIpDetails($new_ip->ip);//Get IP ASN and GEO data etc
                    }

                    $count_success++;

                } catch (\Exception $exception) {
                    $count_fail++;
                    \Log::error("IMPORTING: " . $exception->getMessage());
                }

            }

            if ($count_fail === 0) {
                return redirect(route('import.index'))->with(['alert' => ['type' => 'success', 'message' => "Imported $count_success servers"]]);
            }

            return redirect(route('import.index'))->with(['alert' => ['type' => 'failure', 'message' => "Imported $count_success servers, $count_fail could not be imported. Check your logs"]]);

        }

        return redirect(route('import.index'))->with(['alert' => ['type' => 'failure', 'message' => "Call to the URL returned status code " . $call->status()]]);

    }

}
