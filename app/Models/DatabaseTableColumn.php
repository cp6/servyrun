<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatabaseTableColumn extends Model
{
    use HasFactory;

    protected $fillable = ['table_id', 'name', 'type', 'is_nullable', 'key', 'default', 'extra', 'comment'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function ($server) {
            $server->user_id = \Auth::id();
        });
    }

}
