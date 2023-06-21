<?php

namespace App\Policies;

use App\Models\Connection;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ConnectionPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Connection $connection): bool
    {
        return $user->id === $connection->user_id;
    }

    public function update(User $user, Connection $connection): bool
    {
        return $user->id === $connection->user_id;
    }

    public function delete(User $user, Connection $connection): bool
    {
        return $user->id === $connection->user_id;
    }

    public function restore(User $user, Connection $connection): bool
    {
        return $user->id === $connection->user_id;
    }

    public function forceDelete(User $user, Connection $connection): bool
    {
        return $user->id === $connection->user_id;
    }
}
