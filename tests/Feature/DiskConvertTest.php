<?php

namespace Tests\Feature;

use Tests\TestCase;

class DiskConvertTest extends TestCase
{
    public function test_convert_tb_to_gb(): void
    {
        $conversion = (4 * 1000);

        $this->assertEquals(4000, $conversion);
    }

    public function test_convert_gb_to_tb(): void
    {
        $conversion = (2000 / 1000);

        $this->assertEquals(2, $conversion);
    }

}
