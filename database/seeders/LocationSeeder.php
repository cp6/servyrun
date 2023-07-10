<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    public function run()
    {
        $locations = array(
            array(
                "name" => "Adelaide, Australia",
            ),
            array(
                "name" => "Amsterdam, Netherlands",
            ),
            array(
                "name" => "Atlanta, USA",
            ),
            array(
                "name" => "Auckland, New Zealand",
            ),
            array(
                "name" => "Bangkok, Thailand",
            ),
            array(
                "name" => "Barcelona, Spain",
            ),
            array(
                "name" => "Beijing, China",
            ),
            array(
                "name" => "Bengaluru, India",
            ),
            array(
                "name" => "Berlin, Germany",
            ),
            array(
                "name" => "Brisbane, Australia",
            ),
            array(
                "name" => "Brussels, Belgium",
            ),
            array(
                "name" => "Bucharest, Romania",
            ),
            array(
                "name" => "Buenos Aires, Argentina",
            ),
            array(
                "name" => "Charlotte, USA",
            ),
            array(
                "name" => "Chennai, India",
            ),
            array(
                "name" => "Chicago, USA",
            ),
            array(
                "name" => "Christchurch, New Zealand",
            ),
            array(
                "name" => "Dallas, USA",
            ),
            array(
                "name" => "Denver, USA",
            ),
            array(
                "name" => "Dhaka, Bangladesh",
            ),
            array(
                "name" => "Dublin, Ireland",
            ),
            array(
                "name" => "Frankfurt, Germany",
            ),
            array(
                "name" => "Hamburg, Germany",
            ),
            array(
                "name" => "Helsinki, Finland",
            ),
            array(
                "name" => "Hong Kong",
            ),
            array(
                "name" => "Houston, USA",
            ),
            array(
                "name" => "Istanbul, Turkey",
            ),
            array(
                "name" => "Jacksonville, USA",
            ),
            array(
                "name" => "Jakarta, Indonesia",
            ),
            array(
                "name" => "Johannesburg, South Africa",
            ),
            array(
                "name" => "Kansas City, USA",
            ),
            array(
                "name" => "Kharkiv, Ukraine",
            ),
            array(
                "name" => "Kuala Lumpur, Malaysia",
            ),
            array(
                "name" => "Kyiv, Ukraine",
            ),
            array(
                "name" => "Las Vegas, USA",
            ),
            array(
                "name" => "Lisbon, Portugal",
            ),
            array(
                "name" => "London, United kingdom",
            ),
            array(
                "name" => "Los Angeles, USA",
            ),
            array(
                "name" => "Luxembourg",
            ),
            array(
                "name" => "Lyon, France",
            ),
            array(
                "name" => "Madrid, Spain",
            ),
            array(
                "name" => "Manchester, United Kingdom",
            ),
            array(
                "name" => "Melbourne, Australia",
            ),
            array(
                "name" => "Mexico City, Mexico",
            ),
            array(
                "name" => "Miami, USA",
            ),
            array(
                "name" => "Milan, Italy",
            ),
            array(
                "name" => "Montreal, Canada",
            ),
            array(
                "name" => "Moscow, Russia",
            ),
            array(
                "name" => "Mumbai, India",
            ),
            array(
                "name" => "Munich, Germany",
            ),
            array(
                "name" => "New Delhi, India",
            ),
            array(
                "name" => "New Jersey, USA",
            ),
            array(
                "name" => "New York, USA",
            ),
            array(
                "name" => "Newcastle, United Kingdom",
            ),
            array(
                "name" => "Nuremberg, Germany",
            ),
            array(
                "name" => "Ogden, USA",
            ),
            array(
                "name" => "Osaka, Japan",
            ),
            array(
                "name" => "Oslo, Norway",
            ),
            array(
                "name" => "Paris, France",
            ),
            array(
                "name" => "Perth, Australia",
            ),
            array(
                "name" => "Philadelphia, USA",
            ),
            array(
                "name" => "Phoenix, USA",
            ),
            array(
                "name" => "Portland, USA",
            ),
            array(
                "name" => "Prague, Czechia",
            ),
            array(
                "name" => "Quebec, Canada",
            ),
            array(
                "name" => "Riga, Latvia",
            ),
            array(
                "name" => "Rome, Italy",
            ),
            array(
                "name" => "Rotterdam, Netherlands",
            ),
            array(
                "name" => "Salt Lake City, USA",
            ),
            array(
                "name" => "San Diego, USA",
            ),
            array(
                "name" => "San Francisco, USA",
            ),
            array(
                "name" => "San Jose, USA",
            ),
            array(
                "name" => "Sao Paulo, Brazil",
            ),
            array(
                "name" => "Seattle, USA",
            ),
            array(
                "name" => "Seoul, South Korea",
            ),
            array(
                "name" => "Shanghai, China",
            ),
            array(
                "name" => "Silicon Valley, USA",
            ),
            array(
                "name" => "Singapore",
            ),
            array(
                "name" => "Sofia, Bulgaria",
            ),
            array(
                "name" => "St Petersburg, Russia",
            ),
            array(
                "name" => "Stockholm, Sweden",
            ),
            array(
                "name" => "Sydney, Australia",
            ),
            array(
                "name" => "Taipei, Taiwan",
            ),
            array(
                "name" => "Tampa, USA",
            ),
            array(
                "name" => "Tokyo, Japan",
            ),
            array(
                "name" => "Toronto, Canada",
            ),
            array(
                "name" => "Vancouver, Canada",
            ),
            array(
                "name" => "Warsaw, Poland",
            ),
            array(
                "name" => "Washington, USA",
            ),
            array(
                "name" => "Wellington, New Zealand",
            ),
            array(
                "name" => "Zurich, Switzerland",
            ),
        );

        DB::table('locations')->insertOrIgnore($locations);
    }
}
