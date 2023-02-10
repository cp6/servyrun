<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PingGroupAssigned extends Model
{
    use HasFactory;

    protected $table = 'ping_group_assigned';

    protected $fillable = ['group_id', 'server_id', 'user_id'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (PingGroupAssigned $pingGroupAssigned) {
            $pingGroupAssigned->user_id = \Auth::id();
        });

        static::created(function (PingGroupAssigned $pingGroupAssigned) {
            ActionLog::make(1, 'ran', 'Ping group assigned','Ping group assigned '.$pingGroupAssigned->id, $pingGroupAssigned->server_id);
        });
    }

    public function group(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(PingGroup::class, 'id', 'group_id');
    }

    public function server(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Server::class, 'server_id', 'id');
    }

    public function conn(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Connection::class, 'connection_id', 'id');
    }

}
