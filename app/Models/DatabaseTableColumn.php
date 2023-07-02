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
        static::creating(function (DatabaseTableColumn $databaseTableColumn) {
            $databaseTableColumn->user_id = \Auth::id();
        });

        static::created(function (DatabaseTableColumn $databaseTableColumn) {
            ActionLog::make(1, 'create', 'database column', 'Created database column ' . $databaseTableColumn->name . ' (' . $databaseTableColumn->type . ')');
        });

    }

    public function table(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(DatabaseTable::class, 'id', 'table_id');
    }

    public function createNew(DatabaseTable $databaseTable, array $column): DatabaseTableColumn
    {
        $table_column = new DatabaseTableColumn();
        $table_column->table_id = $databaseTable->id;
        $table_column->name = $column['Field'];
        $table_column->type = $column['Type'];
        $table_column->is_nullable = ($column['Null'] === 'NO') ? 0 : 1;
        $table_column->key = ($column['Key'] === '') ? null : $column['Key'];
        $table_column->default = $column['Default'];
        $table_column->extra = ($column['Extra'] === '') ? null : $column['Extra'];
        $table_column->save();
        return $table_column;
    }

}
