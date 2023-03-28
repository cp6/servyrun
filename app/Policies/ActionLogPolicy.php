<?php

namespace App\Policies;

use App\Models\ActionLog;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ActionLogPolicy
{
    use HandlesAuthorization;

    public function view(User $user, ActionLog $actionLog)
    {
        return $user->id === $actionLog->user_id;
    }

    public function update(User $user, ActionLog $actionLog)
    {
        return $user->id === $actionLog->user_id;
    }

    public function delete(User $user, ActionLog $actionLog)
    {
        return $user->id === $actionLog->user_id;
    }

    public function restore(User $user, ActionLog $actionLog)
    {
        return $user->id === $actionLog->user_id;
    }

    public function forceDelete(User $user, ActionLog $actionLog)
    {
        return $user->id === $actionLog->user_id;
    }
}
