<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandOutput extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['the_command', 'output', 'send_email', 'is_public', 'seconds_taken'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    public function removeUserOwnedScope()
    {
        return $this->withoutGlobalScope('UserOwnedScope');
    }

    protected static function booted(): void
    {
        static::creating(function (CommandOutput $commandOutput) {
            $commandOutput->user_id = \Auth::id();
        });

        static::created(function (CommandOutput $commandOutput) {
            ActionLog::make(1, 'ran', 'command', 'Ran command: '.$commandOutput->the_command.' seconds: '.$commandOutput->seconds_taken, $commandOutput->server_id ?? null, $commandOutput->command_id ?? null);
        });
    }

    public function command(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Command::class, 'id', 'command_id');
    }

    public function server(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Server::class, 'id', 'server_id');
    }

}
