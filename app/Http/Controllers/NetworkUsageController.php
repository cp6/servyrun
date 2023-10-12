<?php

namespace App\Http\Controllers;

use App\Models\NetworkUsage;
use App\Models\Server;

class NetworkUsageController extends Controller
{
    public function store(Server $server): \Illuminate\Http\JsonResponse
    {
        $this->authorize('view', $server);

        return NetworkUsage::insertNetworkUsageLastHour($server);
    }
}
