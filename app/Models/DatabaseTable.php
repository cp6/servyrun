<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatabaseTable extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['name', 'row_count', 'size_mb'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (DatabaseTable $databaseTable) {
            $databaseTable->id = \Str::random(8);
            $databaseTable->user_id = \Auth::id();
        });

        static::created(function (DatabaseTable $databaseTable) {
            ActionLog::make(1, 'create', 'database table', 'Created database table '.$databaseTable->id);
        });

        static::updated(function (DatabaseTable $databaseTable) {
            ActionLog::make(1, 'delete', 'database table', 'Updated database table '.$databaseTable->id);
        });

        static::deleted(function () {
            ActionLog::make(1, 'delete', 'database table', 'Deleted database table');
        });
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function database(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Database::class, 'id', 'database_id');
    }

    public function columns(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(DatabaseTableColumn::class, 'table_id', 'id');
    }

}
