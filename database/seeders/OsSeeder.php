<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OsSeeder extends Seeder
{
    public function run()
    {
        $os = array(
            array(
                "id" => \Str::random(6),
                "name" => "AlmaLinux 8.3 (Purple Manul)",
            ),
            array(
                "id" => \Str::random(6),
                "name" => "AlmaLinux 8.6 (Sky Tiger)",
            ),
            array(
                "id" => \Str::random(6),
                "name" => "AlmaLinux 9.0 (Emerald Puma)",
            ),
            array(
                "id" => \Str::random(6),
                "name" => "Arch Linux",
            ),
            array(
                "id" => \Str::random(6),
                "name" => "CentOS Linux 7 (Core)",
            ),
            array(
                "id" => \Str::random(6),
                "name" => "CentOS Linux 8",
            ),
            array(
                "id" => \Str::random(6),
                "name" => "CentOS Stream 8",
            ),
            array(
                "id" => \Str::random(6),
                "name" => "CloudLinux 7.9 (Boris Yegorov)",
            ),
            array(
                "id" => \Str::random(6),
                "name" => "Debian GNU/Linux 10 (buster)",
            ),
            array("id" => \Str::random(6),
                "name" => "Debian GNU/Linux 11 (bullseye)",
            ),
            array("id" => \Str::random(6),
                "name" => "Debian GNU/Linux bookworm/sid",
            ),
            array("id" => \Str::random(6),
                "name" => "Red Hat Enterprise Linux 8.6 (Ootpa)",
            ),
            array("id" => \Str::random(6),
                "name" => "Red Hat Enterprise Linux 9.0 (Plow)",
            ),
            array("id" => \Str::random(6),
                "name" => "Rocky Linux 8.6 (Green Obsidian)",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 16.04.7 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 18.04 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 18.04.1 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 18.04.2 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 18.04.3 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 18.04.5 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 18.04.6 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 19.04",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 20.04 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 20.04.1 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 20.04.2 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 20.04.3 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 20.04.4 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 20.04.5 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 22.04 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 22.04.1 LTS",
            ),
            array("id" => \Str::random(6),
                "name" => "Ubuntu 22.10",
            ),
            array("id" => \Str::random(6),
                "name" => "Zorin OS 16.1",
            ),
        );

        DB::table('operating_systems')->insertOrIgnore($os);
    }
}
