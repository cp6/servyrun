<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Ping extends Model
{
    use HasFactory;

    protected $fillable = ['from_server_id', 'ping_group', 'was_up', 'avg', 'min', 'max'];

    protected $with = ['to_server', 'from_server'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (Ping $ping) {
            $ping->user_id = \Auth::id();
        });

        static::created(function (Ping $ping) {
            ActionLog::make(1, 'create', 'ping', 'from: ' . $ping->from_server->hostname . ' to: ' . $ping->to_server->hostname, $ping->from_server_id);
        });

    }

    public function server(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Server::class, 'id', 'server_id');
    }

    public function to_server(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Server::class, 'id', 'server_id');
    }

    public function from_server(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Server::class, 'id', 'from_server_id');
    }

    public function group(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(PingGroup::class, 'id', 'ping_group');
    }

    public static function checkIsUp(Server $server, int $port = 80, int $timeout = 4): array
    {
        $data = Server::where('id', $server->id)->with(['ip_ssh'])->firstOrFail();

        if (isset($data->ip_ssh->ip)) {

            try {

                $fp = fSockOpen($data->ip_ssh->ip, $port, $errno, $errstr, $timeout);
                $is_up = $fp !== false;

                $array = ['is_up' => $is_up, 'ip' => $data->ip_ssh->ip, 'message' => null];

            } catch (\Exception $exception) {

                $array = ['is_up' => false, 'ip' => $data->ip_ssh->ip, 'message' => $exception->getMessage()];
            }

        } else {
            $array = ['is_up' => false, 'ip' => null, 'message' => 'Could not find an IP to check'];
        }

        $ping = new Ping();
        $ping->server_id = $server->id;
        $ping->was_up = $array['is_up'];
        $ping->save();

        return $array;
    }

    public static function buildCommand(string $ip_address, int $amount = 4): string
    {
        return "ping -c {$amount} {$ip_address}";
    }

    public static function pingOutputToArray(string $output): array
    {
        $string = str_replace("min/avg/max/mdev = ", "", substr($output, strpos($output, "min/avg/max/mdev")));
        return explode("/", trim($string));
    }

    public static function parseResult(array $result): array
    {
        return [
            'min' => $result[0] ?? null,
            'max' => $result[2] ?? null,
            'avg' => $result[1] ?? null
        ];
    }

    public static function fromServerToServer(Server $server_from, Server $server_to): ?Ping
    {
        $to = Server::where('id', $server_to->id)->with(['ip_ssh'])->firstOrFail();

        $command = self::buildCommand($to->ip_ssh->ip, 4);

        $connection = Server::where('id', $server_from->id)->with(['conn.key', 'conn', 'ip_ssh'])->firstOrFail();

        if ($connection->conn->type === 1) {//Stored password
            $ssh = Connection::makeConnectionPassword($connection->ip_ssh->ip, $connection->conn->ssh_port, $connection->conn->username, Crypt::decryptString($connection->conn->password), 20);
        } elseif ($connection->conn->type === 2) { //Key with stored password
            $ssh = Connection::makeConnectionKey($connection->ip_ssh->ip, $connection->conn->ssh_port, $connection->conn->username, $connection->conn->key->saved_as, Crypt::decryptString($connection->conn->key->password), 20);
        } elseif ($connection->conn->type === 3) { //Key NO stored password
            $ssh = Connection::makeConnectionKey($connection->ip_ssh->ip, $connection->conn->ssh_port, $connection->conn->username, $connection->conn->key->saved_as, null, 20);
        } else {        //Cannot run because connection not of valid type
            ActionLog::make(5, 'run', 'ping', 'Failed running ping from to because conn type invalid for ' . $server_from->id);
            return null;
        }

        if (is_null($ssh)) {
            return null;
        }

        $ssh_output = Connection::runCommand($ssh, $command);

        $ping_result_array = self::parseResult(self::pingOutputToArray($ssh_output));

        $ping = new Ping();
        $ping->server_id = $server_to->id;
        $ping->from_server_id = $server_from->id;
        $ping->min = $ping_result_array['min'] ?? null;
        $ping->max = $ping_result_array['max'] ?? null;
        $ping->avg = $ping_result_array['avg'] ?? null;
        $ping->was_up = (isset($ping_result_array['avg'])) ? 1 : 0;
        $ping->save();

        return $ping;

    }

}
