<?php

namespace App\Policies;

use App\Models\Server;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PingPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Server $server): bool
    {
        return $user->id === $server->user_id;
    }

}
