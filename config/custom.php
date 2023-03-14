<?php

return [
    'maxAccounts' => env('MAX_ACCOUNTS', 1),
    'maxServersPerAccount' => env('MAX_SERVERS_PER_ACCOUNT', 20),
    'maxCommandsPerAccount' => env('MAX_COMMANDS_PER_ACCOUNT', 30),
    'canPing' => env('CAN_PING', true)
];
