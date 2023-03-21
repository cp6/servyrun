<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandGroupAssigned extends Model
{
    use HasFactory;

    protected $table = 'command_group_assigned';

    protected $fillable = ['group_id', 'server_id', 'connection_id'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (CommandGroupAssigned $commandGroupAssigned) {
            $commandGroupAssigned->user_id = \Auth::id();
        });

        static::created(function (CommandGroupAssigned $commandGroupAssigned) {
            ActionLog::make(1, 'create', 'command group assigned', 'Created command group assigned'.$commandGroupAssigned->id);
        });

        static::updated(function (CommandGroupAssigned $commandGroupAssigned) {
            ActionLog::make(1, 'update', 'command group assigned', 'Updated command group assigned'.$commandGroupAssigned->id);
        });

        static::deleted(function () {
            ActionLog::make(1, 'delete', 'command group assigned', 'Deleted command group assigned');
        });
    }

    public function group(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(CommandGroup::class, 'id', 'group_id');
    }

    public function server(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Server::class, 'id', 'server_id');
    }

    public function conn(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Connection::class, 'id', 'connection_id');
    }

}
