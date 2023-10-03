<?php

namespace App\Policies;

use App\Models\Location;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LocationPolicy
{
    public function viewAny(User $user, Location $location): bool
    {
        return $user->id === $location->user_id;
    }

    public function view(User $user, Location $location): bool
    {
        return $user->id === $location->user_id;
    }

    public function update(User $user, Location $location): bool
    {
        return $user->id === $location->user_id;
    }

    public function delete(User $user, Location $location): bool
    {
        return $user->id === $location->user_id;
    }

    public function restore(User $user, Location $location): bool
    {
        return $user->id === $location->user_id;
    }

    public function forceDelete(User $user, Location $location): bool
    {
        return $user->id === $location->user_id;
    }
}
