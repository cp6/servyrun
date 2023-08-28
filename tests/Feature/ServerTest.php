<?php

namespace Tests\Feature;

use App\Models\Location;
use App\Models\Server;
use App\Models\Type;
use App\Models\User;
use Tests\TestCase;

class ServerTest extends TestCase
{
    public function test_server_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $this->be($user);

        Type::create(['name' => 'KVM']);

        $server = Server::create([
            'type_id' => 1,
            'hostname' => 'google.com'
        ]);

        $response = $this
            ->get('/servers/'.$server->id);

        $response->assertOk();
    }

    public function test_server_information_can_be_updated(): void
    {
        $user = User::factory()->create();

        $this->be($user);

        $server = Server::create([
            'type_id' => 1,
            'hostname' => 'google.com'
        ]);

        Location::create(['name' => 'Test location']);

        $response = $this
            ->patch('/servers/'.$server->id, [
                'hostname' => 'domain.com',
                'scheduled_get_usage' => 1,
                'ip' => '127.0.0.1',
                'ping_port' => 21,
                'server_type' => 1,
                'location' => 1
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/servers/'.$server->id);

        $server->refresh();

        $this->assertSame('domain.com', $server->hostname);
    }



}
