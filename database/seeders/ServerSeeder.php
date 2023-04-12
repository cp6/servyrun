<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServerSeeder extends Seeder
{
    public function run()
    {
        $server = [
            [
                "id" => 'X5PAoDIL',
                "user_id" => 'aY7km3',
                "hostname" => 'hidden.com',
                "title" => 'cannotSeeMe'
            ]
        ];

        DB::table('servers')->insertOrIgnore($server);
    }
}
