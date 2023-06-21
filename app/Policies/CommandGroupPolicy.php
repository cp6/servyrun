<?php

namespace App\Policies;

use App\Models\CommandGroup;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommandGroupPolicy
{
    use HandlesAuthorization;

    public function view(User $user, CommandGroup $commandGroup): bool
    {
        return $user->id === $commandGroup->user_id;
    }

    public function update(User $user, CommandGroup $commandGroup): bool
    {
        return $user->id === $commandGroup->user_id;
    }

    public function delete(User $user, CommandGroup $commandGroup): bool
    {
        return $user->id === $commandGroup->user_id;
    }

    public function restore(User $user, CommandGroup $commandGroup): bool
    {
        return $user->id === $commandGroup->user_id;
    }

    public function forceDelete(User $user, CommandGroup $commandGroup): bool
    {
        return $user->id === $commandGroup->user_id;
    }
}
