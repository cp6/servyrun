<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConnectionSeeder extends Seeder
{
    public function run()
    {
        $connection = [
            [
                "id" => 'MOB32HBnBfny',
                "user_id" => 'aY7km3',
                "server_id" => 'X5PAoDIL',
                "type" => 1,
                "username" => 'root',
                "password" => '3DDfRfxN8TxWCuj2TSA9Ir4lo6BZIiyZ0wYGJeIOUvWHm9lbmG8FHOxu4DVV4O91',
                "ssh_port" => 22,
                "key_id" => null
            ]
        ];

        DB::table('connections')->insertOrIgnore($connection);
    }
}
