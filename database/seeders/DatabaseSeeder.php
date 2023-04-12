<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(TypeSeeder::class);
        $this->call(LocationSeeder::class);
        //$this->call(ServerSeeder::class);
        //$this->call(IpAddressSeeder::class);
        //$this->call(ConnectionSeeder::class);
    }
}
