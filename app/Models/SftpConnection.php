<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SftpConnection extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['server_id', 'user_id', 'key_id', 'username', 'password', 'port', 'last_used'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function ($sftpConnection) {
            $sftpConnection->id = Str::random(8);
            $sftpConnection->user_id = \Auth::id();
        });

        static::created(function (SftpConnection $sftpConnection) {
            ActionLog::make(1, 'create', 'SFTP', 'Created SFTP connection', $sftpConnection->server_id);
        });

        static::updated(function (SftpConnection $sftpConnection) {
            ActionLog::make(1, 'update', 'SFTP', 'Updated SFTP connection', $sftpConnection->server_id);
        });

        static::deleted(function (SftpConnection $sftpConnection) {
            ActionLog::make(1, 'delete', 'SFTP', 'Deleted SFTP connection', $sftpConnection->server_id);
        });
    }

    public function server(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Server::class, 'server_id', 'id');
    }

    public function key(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Key::class, 'id', 'key_id');
    }

}
