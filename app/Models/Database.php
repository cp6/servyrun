<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Database extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'databases';

    protected $fillable = ['name'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (Database $database) {
            $database->id = \Str::random(8);
            $database->user_id = \Auth::id();
        });

        static::created(function (Database $database) {
            ActionLog::make(1, 'create', 'database', 'Created database ' . $database->id);
        });
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function conn(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(DatabaseConnection::class, 'id', 'db_connection_id');
    }

}
