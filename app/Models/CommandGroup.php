<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;

class CommandGroup extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['command_id', 'title', 'server_count', 'email_output', 'timeout'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (CommandGroup $commandGroup) {
            $commandGroup->id = \Str::random(8);
            $commandGroup->user_id = \Auth::id();
        });

        static::created(function (CommandGroup $commandGroup) {
            ActionLog::make(1, 'create', 'command group', 'Created command group ' . $commandGroup->id);
        });

        static::updated(function (CommandGroup $commandGroup) {
            ActionLog::make(1, 'update', 'command group', 'Updated command group ' . $commandGroup->id);
        });

        static::deleted(function () {
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

    public static function runCommandGroup(CommandGroup $commandGroup): \Illuminate\Http\JsonResponse
    {
        $worker = $commandGroup->where('id', $commandGroup->id)->with(['the_command', 'assigned.server.ip_ssh', 'assigned.conn.key'])->first();

        $command = $worker->the_command->command;

        $output_array = [];

        foreach ($worker->assigned as $connection) {

            $time_start = microtime(true);

            if ($connection->conn->type === 1) {
                $ssh = Connection::makeConnectionPassword($connection->server->ip_ssh->ip, $connection->conn->ssh_port, $connection->conn->username, Crypt::decryptString($connection->conn->password), $commandGroup->timeout);
            } elseif ($connection->conn->type === 2) {
                $ssh = Connection::makeConnectionKey($connection->server->ip_ssh->ip, $connection->conn->ssh_port, $connection->conn->username, $connection->conn->key->saved_as, Crypt::decryptString($connection->conn->key->password), $commandGroup->timeout);
            } elseif ($connection->conn->type === 3) {
                $ssh = Connection::makeConnectionKey($connection->server->ip_ssh->ip, $connection->conn->ssh_port, $connection->conn->username, $connection->conn->key->saved_as, null, $commandGroup->timeout);
            } else {//Cannot run because connection not of valid type
                ActionLog::make(5, 'run', 'command group', 'Failed running command group because conn type invalid for ' . $commandGroup->id);
                return response()->json(array('message' => 'Failed running command group because conn type invalid for ' . $commandGroup->id))->header('Content-Type', 'application/json');
            }

            $ssh_output = Connection::runCommand($ssh, $command);

            $time_end = microtime(true);

            $output_array[] = [
                'command_group' => $commandGroup->id,
                'connection_id' => $connection->conn->id,
                'server_id' => $connection->server->id,
                'server_title' => $connection->server->title,
                'server_hostname' => $connection->server->hostname,
                'command_id' => $commandGroup->the_command->id,
                'command' => $commandGroup->the_command->command,
                'seconds_taken' => number_format($time_end - $time_start, 3),
                'output' => $ssh_output
            ];

            $command_output = new CommandOutput();
            $command_output->server_id = $connection->server->id;
            $command_output->command_id = $commandGroup->the_command->id;
            $command_output->the_command = $command;
            $command_output->output = $ssh_output;
            $command_output->seconds_taken = number_format($time_end - $time_start, 3);
            $command_output->send_email = $commandGroup->email_output;
            $command_output->save();

            if ($commandGroup->email_output) {//Send output email

                $data = [
                    'hostname' => $connection->server->hostname,
                    'command' => $command,
                    'output' => $ssh_output
                ];

                Mail::send('mail.output', $data, function ($message) {
                    $message->to(\Auth::user()->email, \Auth::user()->name)
                        ->subject('Surcuri command output');
                    $message->from(\Auth::user()->email, \Auth::user()->name);
                });
            }

        }

        return response()->json($output_array)->header('Content-Type', 'application/json');

    }

}
