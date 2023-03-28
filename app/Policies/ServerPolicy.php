<?php

namespace App\Policies;

use App\Models\Server;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ServerPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user, Server $server)
    {
        return $user->id === $server->user_id;
    }

    public function view(User $user, Server $server)
    {
        return $user->id === $server->user_id;
    }

    public function update(User $user, Server $server)
    {
        return $user->id === $server->user_id;
    }

    public function delete(User $user, Server $server)
    {
        return $user->id === $server->user_id;
    }

    public function restore(User $user, Server $server)
    {
        return $user->id === $server->user_id;
    }

    public function forceDelete(User $user, Server $server)
    {
        return $user->id === $server->user_id;
    }
}
