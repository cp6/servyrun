<?php

namespace App\Policies;

use App\Models\Database;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DatabasePolicy
{
    use HandlesAuthorization;

    public function view(User $user, Database $database): bool
    {
        return $user->id === $database->user_id;
    }

    public function update(User $user, Database $database): bool
    {
        return $user->id === $database->user_id;
    }

    public function delete(User $user, Database $database): bool
    {
        return $user->id === $database->user_id;
    }

    public function restore(User $user, Database $database): bool
    {
        return $user->id === $database->user_id;
    }

    public function forceDelete(User $user, Database $database): bool
    {
        return $user->id === $database->user_id;
    }
}
