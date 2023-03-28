<?php

namespace App\Policies;

use App\Models\DatabaseTable;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DatabaseTablePolicy
{
    use HandlesAuthorization;

    public function view(User $user, DatabaseTable $databaseTable)
    {
        return $user->id === $databaseTable->user_id;
    }

    public function update(User $user, DatabaseTable $databaseTable)
    {
        return $user->id === $databaseTable->user_id;
    }

    public function delete(User $user, DatabaseTable $databaseTable)
    {
        return $user->id === $databaseTable->user_id;
    }

    public function restore(User $user, DatabaseTable $databaseTable)
    {
        return $user->id === $databaseTable->user_id;
    }

    public function forceDelete(User $user, DatabaseTable $databaseTable)
    {
        return $user->id === $databaseTable->user_id;
    }
}
