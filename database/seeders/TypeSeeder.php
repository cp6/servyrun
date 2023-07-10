<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeSeeder extends Seeder
{
    public function run()
    {
        $items = [
            [
                "id" => 1,
                "name" => "KVM",
            ],
            [
                "id" => 2,
                "name" => "OVZ",
            ],
            [
                "id" => 3,
                "name" => "NAT",
            ],
            [
                "id" => 4,
                "name" => "DEDI",
            ],
            [
                "id" => 5,
                "name" => "XEN",
            ],
            [
                "id" => 6,
                "name" => "LXC",
            ],
            [
                "id" => 7,
                "name" => "OTHER",
            ]
        ];

        DB::table('types')->insertOrIgnore($items);
    }
}
