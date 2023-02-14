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

    protected $fillable = ['type', 'username', 'ssh_port', 'key_id', 'password', 'last_used'];

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

    public static function runCommand($connection, string $command)
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
        ActionLog::make(1, 'connected', 'connection', "Made connection {$user}:{$port} with password");

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
            ActionLog::make(1, 'connected', 'connection', "Made connection with key: {$key_id} and password");
        } else {//No key password
            try {
                $key = PublicKeyLoader::load(Storage::disk('private')->get("keys/$key_id"));
            } catch (\Exception $exception) {
                return null;
            }
            ActionLog::make(1, 'connected', 'connection', "Made connection with key: {$key_id}");
        }

        $ssh = new SSH2($host, $port, $timeout);

        try {
            $ssh->login($user, $key);
        } catch (\Exception $exception) {
            ActionLog::make(5, 'connecting', 'connection', $exception->getMessage());
            return null;
        }

        return $ssh;
    }

}
