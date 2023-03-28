<?php

namespace App\Policies;

use App\Models\DatabaseConnection;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DatabaseConnectionPolicy
{
    use HandlesAuthorization;

    public function view(User $user, DatabaseConnection $databaseConnection)
    {
        return $user->id === $databaseConnection->user_id;
    }

    public function update(User $user, DatabaseConnection $databaseConnection)
    {
        return $user->id === $databaseConnection->user_id;
    }

    public function delete(User $user, DatabaseConnection $databaseConnection)
    {
        return $user->id === $databaseConnection->user_id;
    }

    public function restore(User $user, DatabaseConnection $databaseConnection)
    {
        return $user->id === $databaseConnection->user_id;
    }

    public function forceDelete(User $user, DatabaseConnection $databaseConnection)
    {
        return $user->id === $databaseConnection->user_id;
    }
}
