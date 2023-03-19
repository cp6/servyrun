<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class CreateServerLimitTest extends TestCase
{
    public function test_server_limit_hit(): void
    {
        $servers_count = 92;

        if ($servers_count >= config('custom.maxServersPerAccount')) {
            $did_abort = true;
        } else {
            $did_abort = false;
        }

        $this->assertTrue($did_abort);
    }
}
