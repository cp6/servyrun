<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class PingGroup extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['title', 'amount'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (PingGroup $pingGroup) {
            $pingGroup->user_id = \Auth::id();
        });

        static::created(function (PingGroup $pingGroup) {
            ActionLog::make(1, 'create', 'ping group', 'Created ping group '.$pingGroup->id);
        });

        static::updated(function (PingGroup $pingGroup) {
            ActionLog::make(1, 'update', 'ping group', 'Updated ping group '.$pingGroup->id);
        });

        static::deleted(function (PingGroup $pingGroup) {
            ActionLog::make(1, 'delete', 'ping group', 'Deleted ping group');
        });
    }

    public function assigned(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PingGroupAssigned::class, 'group_id', 'id');
    }

    public static function runPings(PingGroup $pingGroup): ?PingGroup
    {
        $data = $pingGroup->with(['assigned.conn.server.ip_ssh', 'assigned.conn.key'])->firstOrFail();

        $amount = $pingGroup->amount;

        foreach ($data->assigned as $ip) {
            $current_server = $ip->server;
            $current_server_id = $current_server->id;
            $current_ip = $current_server->ip_ssh->ip;

            if (!isset($current_server->conn->type)){
                ActionLog::make(5, "run", "ping group", "Failed running ping group for {$current_server->id} because no conn type", $current_server->id);
                continue;
            }
            $current_connection_type = $current_server->conn->type;

            for ($i = 0; $i < $amount; $i++) {
                $loop_server_id = $data->assigned[$i]->server->id;
                $loop_ip = $data->assigned[$i]->server->ip_ssh->ip;

                if ($current_ip !== $loop_ip) {

                    //echo "PINGING {$loop_ip} FROM {$current_ip}";
                    $command = Ping::buildCommand($loop_ip, 3);//Ping loop IP address 3 times

                    if ($current_connection_type === 1) {
                        //Stored password
                        $ssh = Connection::makeConnectionPassword($current_ip, $current_server->conn->ssh_port, $current_server->conn->username, Crypt::decryptString($current_server->conn->password), 12);
                    } elseif ($current_connection_type === 2) {
                        //Key with stored password
                        $ssh = Connection::makeConnectionKey($current_ip, $current_server->conn->ssh_port, $current_server->conn->username, $current_server->conn->key->saved_as, Crypt::decryptString($current_server->conn->key->password), 12);
                    } elseif ($current_connection_type === 3) {
                        //Key NO stored password
                        $ssh = Connection::makeConnectionKey($current_ip, $current_server->conn->ssh_port, $current_server->conn->username, $current_server->conn->key->saved_as, null, 12);
                    } else {
                        //Cannot run because connection not of valid type
                        ActionLog::make(5, 'create','ping group', 'Failed running ping group because conn type invalid for ' . $current_server->id);
                        return null;
                    }

                    $ssh_output = Connection::runCommand($ssh, $command);

                    if (empty($ssh_output)){
                        ActionLog::make(5, 'create','ping group', 'Failed running ping group command output was empty');
                        return null;
                    }

                    $ping_result_array = Ping::parseResult(Ping::pingOutputToArray($ssh_output));

                    $ping = new Ping();
                    $ping->ping_group = $pingGroup->id;
                    $ping->server_id = $loop_server_id;
                    $ping->from_server_id = $current_server_id;
                    $ping->min = $ping_result_array['min'] ?? null;
                    $ping->max = $ping_result_array['max'] ?? null;
                    $ping->avg = $ping_result_array['avg'] ?? null;
                    $ping->was_up = (isset($ping_result_array['avg'])) ? 1 : 0;
                    $ping->save();

                }

            }

        }

        return $pingGroup;

    }

}
