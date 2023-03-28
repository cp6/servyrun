<?php

namespace App\Policies;

use App\Models\DatabaseTableColumn;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DatabaseTableColumnPolicy
{
    use HandlesAuthorization;

    public function view(User $user, DatabaseTableColumn $databaseTableColumn)
    {
        return $user->id === $databaseTableColumn->user_id;
    }

    public function update(User $user, DatabaseTableColumn $databaseTableColumn)
    {
        return $user->id === $databaseTableColumn->user_id;
    }

    public function delete(User $user, DatabaseTableColumn $databaseTableColumn)
    {
        return $user->id === $databaseTableColumn->user_id;
    }

    public function restore(User $user, DatabaseTableColumn $databaseTableColumn)
    {
        return $user->id === $databaseTableColumn->user_id;
    }

    public function forceDelete(User $user, DatabaseTableColumn $databaseTableColumn)
    {
        return $user->id === $databaseTableColumn->user_id;
    }
}
