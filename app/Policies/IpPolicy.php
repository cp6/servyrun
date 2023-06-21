<?php

namespace App\Policies;

use App\Models\IpAddress;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class IpPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }

    public function view(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }

    public function update(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }

    public function delete(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }

    public function restore(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }

    public function forceDelete(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }
}
