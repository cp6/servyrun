<?php

namespace App\Policies;

use App\Models\CommandOutput;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommandOutputPolicy
{
    use HandlesAuthorization;

    public function view(User $user, CommandOutput $commandOutput)
    {
        return $user->id === $commandOutput->user_id;
    }

    public function update(User $user, CommandOutput $commandOutput)
    {
        return $user->id === $commandOutput->user_id;
    }

    public function delete(User $user, CommandOutput $commandOutput)
    {
        return $user->id === $commandOutput->user_id;
    }

    public function restore(User $user, CommandOutput $commandOutput)
    {
        return $user->id === $commandOutput->user_id;
    }

    public function forceDelete(User $user, CommandOutput $commandOutput)
    {
        return $user->id === $commandOutput->user_id;
    }
}
