<?php

namespace Tests\Unit;

use Tests\TestCase;

class CreateServerLimitTest extends TestCase
{
    public function test_server_limit_hit(): void
    {
        $servers_count = 92;

        $servers_limit = config('custom.maxServersPerAccount');//20

        if ($servers_count >= $servers_limit) {
            $did_abort = true;
        } else {
            $did_abort = false;
        }

        $this->assertTrue($did_abort);
    }
}
