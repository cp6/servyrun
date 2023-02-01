<?php

namespace App\Policies;

use App\Models\Key;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class KeyPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Key  $key
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Key  $key
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Key  $key
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    public function download(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Key  $key
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Key  $key
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Key $key)
    {
        return $user->id === $key->user_id;
    }
}
