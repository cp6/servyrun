<?php

namespace App\Policies;

use App\Models\Command;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommandPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user, Command $command): bool
    {
        return $user->id === $command->user_id;
    }

    public function view(User $user, Command $command): bool
    {
        return $user->id === $command->user_id;
    }

    public function update(User $user, Command $command): bool
    {
        return $user->id === $command->user_id;
    }

    public function delete(User $user, Command $command): bool
    {
        return $user->id === $command->user_id;
    }

    public function restore(User $user, Command $command): bool
    {
        return $user->id === $command->user_id;
    }

    public function forceDelete(User $user, Command $command): bool
    {
        return $user->id === $command->user_id;
    }
}
