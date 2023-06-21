<?php

namespace App\Policies;

use App\Models\SftpConnection;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SftpConnectionPolicy
{
    use HandlesAuthorization;

    public function view(User $user, SftpConnection $sftpConnection): bool
    {
        return $user->id === $sftpConnection->user_id;
    }

    public function update(User $user, SftpConnection $sftpConnection): bool
    {
        return $user->id === $sftpConnection->user_id;
    }

    public function delete(User $user, SftpConnection $sftpConnection): bool
    {
        return $user->id === $sftpConnection->user_id;
    }

    public function restore(User $user, SftpConnection $sftpConnection): bool
    {
        return $user->id === $sftpConnection->user_id;
    }

    public function forceDelete(User $user, SftpConnection $sftpConnection): bool
    {
        return $user->id === $sftpConnection->user_id;
    }
}
