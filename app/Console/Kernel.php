<?php

namespace App\Console;

use App\Models\NetworkUsage;
use App\Models\Scopes\UserOwnedScope;
use App\Models\Server;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $servers = Server::where('scheduled_get_usage', 1)->withoutGlobalScope(new UserOwnedScope())->get();

        $schedule->call(function () use ($servers) {
            foreach ($servers as $server) {//Get usage data for each server
                Server::insertServerUsage($server);
            }
        })->everyTwoMinutes();

        $schedule->call(function () use ($servers) {
            foreach ($servers as $server) {//Get usage data for each server
                NetworkUsage::insertNetworkUsageLastHour($server);
            }
        })->hourlyAt(3);//3 minutes into each hour

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
