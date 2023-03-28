<?php

namespace App\Policies;

use App\Models\PingGroup;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PingGroupPolicy
{
    use HandlesAuthorization;

    public function view(User $user, PingGroup $pingGroup)
    {
        return $user->id === $pingGroup->user_id;
    }

    public function update(User $user, PingGroup $pingGroup)
    {
        return $user->id === $pingGroup->user_id;
    }

    public function delete(User $user, PingGroup $pingGroup)
    {
        return $user->id === $pingGroup->user_id;
    }

    public function restore(User $user, PingGroup $pingGroup)
    {
        return $user->id === $pingGroup->user_id;
    }

    public function forceDelete(User $user, PingGroup $pingGroup)
    {
        return $user->id === $pingGroup->user_id;
    }
}
