<?php

namespace App\Policies;

use App\Models\CommandGroupAssigned;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommandGroupAssignedPolicy
{
    use HandlesAuthorization;

    public function view(User $user, CommandGroupAssigned $commandGroupAssigned): bool
    {
        return $user->id === $commandGroupAssigned->user_id;
    }

    public function update(User $user, CommandGroupAssigned $commandGroupAssigned): bool
    {
        return $user->id === $commandGroupAssigned->user_id;
    }

    public function delete(User $user, CommandGroupAssigned $commandGroupAssigned): bool
    {
        return $user->id === $commandGroupAssigned->user_id;
    }

    public function restore(User $user, CommandGroupAssigned $commandGroupAssigned): bool
    {
        return $user->id === $commandGroupAssigned->user_id;
    }

    public function forceDelete(User $user, CommandGroupAssigned $commandGroupAssigned): bool
    {
        return $user->id === $commandGroupAssigned->user_id;
    }
}
