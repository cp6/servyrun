<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IpAddressSeeder extends Seeder
{
    public function run()
    {
        $ip = [
            [
                "id" => 'U6zhSUjt',
                "user_id" => 'aY7km3',
                "server_id" => 'X5PAoDIL',
                "ip" => '37.48.15.174',
                "is_ipv4" => 1,
                "is_main" => 1,
                "is_ssh" => 1
            ]
        ];

        DB::table('ip_addresses')->insertOrIgnore($ip);
    }
}
