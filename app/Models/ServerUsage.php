<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServerUsage extends Model
{
    use HasFactory;

    protected $fillable = ['cpu_usage', 'ram_used_percent', 'disk_used_percent', 'disk_used', 'disk_available', 'uptime'];


    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (ServerUsage $serverUsage) {
            $serverUsage->user_id = \Auth::id();
        });

        static::created(function (ServerUsage $serverUsage) {
            ActionLog::make(1, 'create', 'server usage', 'Added server usage ', $serverUsage->server_id);
        });

        static::deleted(function () {
            ActionLog::make(1, 'delete', 'server usage', 'Deleted server usage');
        });
    }

    public function server(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Server::class, 'id', 'server_id');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

}
