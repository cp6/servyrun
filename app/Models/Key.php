<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['password', 'original_name', 'saved_as'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function ($key) {
            $key->user_id = \Auth::id();
        });

        static::created(function () {
            ActionLog::make(1, 'create', 'key', 'Created key');
        });

        static::updated(function () {
            ActionLog::make(1, 'update', 'key', 'Updated key');
        });

        static::deleted(function () {
            ActionLog::make(1, 'delete', 'key', 'Deleted key');
        });
    }

    public function conn(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Connection::class, 'key_id', 'id');
    }

}
