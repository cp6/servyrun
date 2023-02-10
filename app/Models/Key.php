<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
        static::creating(function (Key $key) {
            $key->user_id = \Auth::id();
        });

        static::created(function (Key $key) {
            ActionLog::make(1, 'create', 'key', 'Created key ' . $key->id);
        });

        static::updated(function (Key $key) {
            ActionLog::make(1, 'update', 'key', 'Updated key ' . $key->id);
        });

        static::deleting(function (Key $key) {
            $delete = Storage::disk('private')->delete('keys/' . $key->saved_as);
            ActionLog::make(1, 'delete', 'key', 'Attempted to delete key, result:' . ($delete) ? 'success' : 'failed');
        });

        static::deleted(function (Key $key) {
            ActionLog::make(1, 'delete', 'key', 'Deleted key');
        });
    }

    public function conn(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Connection::class, 'key_id', 'id');
    }

}
