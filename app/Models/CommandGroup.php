<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CommandGroup extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['command_id', 'title', 'server_count', 'email_output'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (CommandGroup $commandGroup) {
            $commandGroup->id = Str::random(8);
            $commandGroup->user_id = \Auth::id();
        });

        static::created(function (CommandGroup $commandGroup) {
            ActionLog::make(1, 'create', 'command group', 'Created command group '.$commandGroup->id);
        });

        static::updated(function (CommandGroup $commandGroup) {
            ActionLog::make(1, 'update', 'command group', 'Updated command group '.$commandGroup->id);
        });

        static::deleted(function (CommandGroup $commandGroup) {
            ActionLog::make(1, 'delete', 'command group', 'Deleted command group');
        });
    }

    public function the_command(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Command::class, 'id', 'command_id');
    }

    public function assigned(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CommandGroupAssigned::class, 'group_id', 'id');
    }

}
