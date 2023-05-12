<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use phpseclib3\Crypt\PublicKeyLoader;
use phpseclib3\Net\SSH2;

class Connection extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['server_id', 'user_id', 'type', 'username', 'ssh_port', 'key_id', 'password', 'submit_password', 'sudo', 'last_used'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (Connection $connection) {
            $connection->id = Str::random(12);
            $connection->user_id = \Auth::id();
            if (!isset($connection->key_id)){
                $connection->type = 1;//Password
            } elseif (!isset($connection->password) || is_null($connection->password)){
                $connection->type = 3;//Key NO password
            } else {
                $connection->type = 2;//Key with a password
            }
        });

        static::created(function (Connection $connection) {
            ActionLog::make(1, 'create', 'connection', 'Created connection', $connection->server_id, null, $connection->id);
        });

        static::updated(function (Connection $connection) {
            ActionLog::make(1, 'update', 'connection', 'Updated connection', $connection->server_id, null, $connection->id);
        });

        static::deleted(function (Connection $connection) {
            ActionLog::make(1, 'delete', 'connection', 'Deleted connection', $connection->server_id);
        });
    }

    public function server(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Server::class, 'server_id', 'id');
    }

    public function key(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Key::class, 'id', 'key_id');
    }

    public function outputs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CommandOutput::class, 'connection_id', 'id')->orderBy('created_at');
    }

    public function outputsLast3(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CommandOutput::class, 'connection_id', 'id')->orderBy('created_at', 'desc')->take(3);
    }

    public static function runCommand(SSH2 $connection, string $command): bool|string
    {
        return $connection->exec($command);
    }

    public static function do(Connection $connection, int $timeout = 10): ?SSH2
    {
        $conn = $connection->where('id', $connection->id)->with(['server.ip_ssh', 'key'])->firstOrFail();

        if ($conn->type === 1) {
            //Password auto
            $ssh = self::makeConnectionPassword($conn->server->ip_ssh->ip, $conn->ssh_port, $conn->username, Crypt::decryptString($conn->password), $timeout);
        } else if ($conn->type === 2) {
            //Key with a password
            $ssh = self::makeConnectionKey($conn->server->ip_ssh->ip, $conn->ssh_port, $conn->username, $conn->key->saved_as, Crypt::decryptString($conn->password), $timeout);
        } elseif ($conn->type === 3) {
            //Key with NO password
            $ssh = self::makeConnectionKey($conn->server->ip_ssh->ip, $conn->ssh_port, $conn->username, $conn->key->saved_as, null, $timeout);
        } else {
            return null;
        }

        return $ssh;
    }

    public static function makeConnectionPassword(string $host, int $port, string $user, string $password, int $timeout = 8): ?SSH2
    {
        $ssh = new SSH2($host, $port, $timeout);

        try {
            $ssh->login($user, $password);
        } catch (\Exception $exception) {
            ActionLog::make(5, 'connect', 'SSH', $exception->getMessage());
            return null;
        }

        if (\Auth::user()->log_connections) {
            ActionLog::make(1, 'connected', 'connection', "Made connection {$user}:{$port} with password");
        }

        return $ssh;
    }

    public static function makeConnectionKey(string $host, int $port, string $user, string $key_id, ?string $key_password = null, int $timeout = 8): ?SSH2
    {
        if (!is_null($key_password)) {

            try {
                $key = PublicKeyLoader::load(Storage::disk('private')->get("keys/$key_id"), $key_password);
            } catch (\Exception $exception) {
                return null;
            }

        } else {//No key password
            try {
                $key = PublicKeyLoader::load(Storage::disk('private')->get("keys/$key_id"));
            } catch (\Exception $exception) {
                return null;
            }
        }

        $ssh = new SSH2($host, $port, $timeout);

        try {
            $ssh->login($user, $key);
        } catch (\Exception $exception) {
            ActionLog::make(5, 'connecting', 'connection', $exception->getMessage());
            return null;
        }

        if (\Auth::user()->log_connections) {
            ActionLog::make(1, 'connected', 'connection', "Made connection {$user}:{$port} with key: {$key_id}");
        }

        return $ssh;
    }

    public static function getCpuUsedPercent(SSH2 $connection): float
    {
        $command = "cat /proc/stat |grep cpu |tail -1|awk '{print ($5*100)/($2+$3+$4+$5+$6+$7+$8+$9+$10)}'|awk '{print 100-$1}'";
        return $connection->exec($command);
    }

    public static function getRamUsedPercent(SSH2 $connection): float
    {
        $command = "free | grep Mem | awk '{print $3/$2 * 100.0}'";
        return $connection->exec($command);
    }

    public static function getDiskUsedPercent(SSH2 $connection): int
    {
        $command = "df / --output=pcent | tail -n 1";
        return trim(str_replace("%", "", $connection->exec($command)));
    }

    public static function getDiskUsed(SSH2 $connection): ?int
    {
        $command = "df / --output=used | tail -n 1";
        return $connection->exec($command);
    }

    public static function getDiskAvailable(SSH2 $connection): ?int
    {
        $command = "df / --output=avail | tail -n 1";
        return $connection->exec($command);
    }

    public static function getPortSpeed(SSH2 $connection)
    {
        $command = "lshw -C Network -json";
        $output = str_replace(["WARNING: you should run this program as super-user.\n", "\n", '\/', "WARNING: output may be incomplete or inaccurate, you should run this program as super-user."], "", $connection->exec($command));
        return json_decode($output);
    }

    public static function formattedUptime(SSH2 $connection): array
    {
        $command = "uptime";
        $output = $connection->exec($command);
        //00:40:10 up 16 days, 21:49, 0 users, load average: 0.02, 0.02, 0.00

        $uptime_string = trim(strtok($output, ','));

        $users_count_raw = strstr($output, 'user', true);
        $users_count = trim(substr($users_count_raw, strpos($users_count_raw, ", ") + 9));

        $load = trim(substr($output, strpos($output, " load average:") + 14));
        $load_array = explode(",", str_replace(" ", "", $load));

        return [
            'uptime' => $uptime_string,
            'users' => (int)$users_count,
            'last_minute' => (float)$load_array[0],
            'last_5_minutes' => (float)$load_array[1],
            'last_15_minutes' => (float)$load_array[2]
        ];

    }

}
