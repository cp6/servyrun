<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActionLog extends Model
{
    use HasFactory;

    protected $fillable = ['server_id', 'connection_id', 'database_id', 'command_id', 'result', 'resource_type', 'action', 'message'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (ActionLog $actionLog) {
            $actionLog->user_id = \Auth::id();
        });
    }

    public function server(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Server::class, 'id', 'server_id');
    }

    public function command(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Command::class, 'id', 'command_id');
    }

    public function connection(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Connection::class, 'id', 'connection_id');
    }

    public function database(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Database::class, 'id', 'database_id');
    }

    public static function make(int $result, string $action, string $resource_type, ?string $message = null, ?string $server_id = null, ?string $command_id = null, ?string $connection_id = null, ?string $database_id = null): ActionLog
    {//Insert an action log
        try {

            $action_log = new ActionLog();
            $action_log->result = $result;
            $action_log->action = $action;
            $action_log->resource_type = $resource_type;
            $action_log->message = $message;
            $action_log->server_id = $server_id;
            $action_log->command_id = $command_id;
            $action_log->connection_id = $connection_id;
            $action_log->database_id = $database_id;
            $action_log->save();
            return $action_log;

        } catch (\Exception $exception) {
            $action_log = new ActionLog();
            $action_log->result = 5;
            $action_log->action = 'create';
            $action_log->resource_type = 'log';
            $action_log->message = 'Failed to create log: ' . $exception->getMessage();
            $action_log->save();
            return $action_log;
        }

    }

}
