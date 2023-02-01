<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TypeSeeder extends Seeder
{
    public function run()
    {
        $items = [
            [
                "id" => Str::random(6),
                "name" => "KVM",
            ],
            [
                "id" => Str::random(6),
                "name" => "OVZ",
            ],
            [
                "id" => Str::random(6),
                "name" => "NAT",
            ],
            [
                "id" => Str::random(6),
                "name" => "DEDI",
            ],
            [
                "id" => Str::random(6),
                "name" => "XEN",
            ],
            [
                "id" => Str::random(6),
                "name" => "LXC",
            ],
            [
                "id" => Str::random(6),
                "name" => "OTHER",
            ]
        ];

        DB::table('types')->insertOrIgnore($items);
    }
}
