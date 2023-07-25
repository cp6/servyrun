<?php

namespace App\Console;

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

        $schedule->call(function () {
            $servers = Server::withoutGlobalScope(new UserOwnedScope())->get();
            foreach ($servers as $server) {//Get usage data for each server
                Server::insertServerUsage($server);
            }
        })->everyTwoMinutes();

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
