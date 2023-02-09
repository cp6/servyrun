<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'id' => 'd8okvl',
            'name' => 'chief420',
            'email' => 'test@mail.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'api_token' => 'vASuNoCPgjiBxfhookSdiIQVNEu2kAZy0buHpeCUTFkg7bOtXFxT3CWGNvcg5KMC'
        ]);

        User::create([
            'id' => 'aY7km3',
            'name' => 'gazza_bazza',
            'email' => 'garry@mail.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'api_token' => '2znJJgnN0lmKS8WuN8WjUpLKAuW1gaJR9OYdS4N6HEgcc3CzAHBvvx5IDJWbbzSl'
        ]);
    }
}
