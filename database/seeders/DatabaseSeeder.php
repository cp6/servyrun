<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(TypeSeeder::class);
        $this->call(LocationSeeder::class);
        //$this->call(OsSeeder::class);
    }
}
