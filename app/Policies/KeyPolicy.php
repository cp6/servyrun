<?php

namespace App\Policies;

use App\Models\Key;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class KeyPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    public function update(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    public function delete(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    public function download(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    public function restore(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    public function forceDelete(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }
}
