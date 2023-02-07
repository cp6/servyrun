<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use PDO;

class Database extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    protected $table = 'databases';

    protected $fillable = ['db_connection_id', 'user_id', 'name'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function ($database) {
            $database->id = Str::random(8);
            $database->user_id = \Auth::id();
        });

        static::created(function (Database $database) {
            ActionLog::make(1, 'create', 'database', 'Created database '.$database->id);
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
