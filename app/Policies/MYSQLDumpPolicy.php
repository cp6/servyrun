<?php

namespace App\Policies;

use App\Models\MYSQLDump;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MYSQLDumpPolicy
{
    use HandlesAuthorization;

    public function view(User $user, MYSQLDump $mYSQLDump)
    {
        return $user->id === $mYSQLDump->user_id;
    }

    public function update(User $user, MYSQLDump $mYSQLDump)
    {
        return $user->id === $mYSQLDump->user_id;
    }

    public function delete(User $user, MYSQLDump $mYSQLDump)
    {
        return $user->id === $mYSQLDump->user_id;
    }

    public function restore(User $user, MYSQLDump $mYSQLDump)
    {
        return $user->id === $mYSQLDump->user_id;
    }

    public function forceDelete(User $user, MYSQLDump $mYSQLDump)
    {
        return $user->id === $mYSQLDump->user_id;
    }
}
