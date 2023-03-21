<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use phpseclib3\Crypt\PublicKeyLoader;
use phpseclib3\Net\SFTP;

class SftpConnection extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['username', 'password', 'port', 'last_used', 'status'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (SftpConnection $sftpConnection) {
            $sftpConnection->id = \Str::random(8);
            $sftpConnection->user_id = \Auth::id();
        });

        static::created(function (SftpConnection $sftpConnection) {
            ActionLog::make(1, 'create', 'SFTP', 'Created SFTP connection ' . $sftpConnection->id, $sftpConnection->server_id);
        });

        static::updated(function (SftpConnection $sftpConnection) {
            ActionLog::make(1, 'update', 'SFTP', 'Updated SFTP connection ' . $sftpConnection->id, $sftpConnection->server_id);
        });

        static::deleted(function (SftpConnection $sftpConnection) {
            ActionLog::make(1, 'delete', 'SFTP', 'Deleted SFTP connection', $sftpConnection->server_id);
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

    public static function makeSftpConnectionPassword(string $host, int $port, string $user, string $password, int $timeout = 8): ?SFTP
    {
        $sftp = new SFTP($host, $port, $timeout);

        try {
            $sftp->login($user, $password);
        } catch (\Exception $exception) {
            ActionLog::make(5, 'connect', 'SFTP', $exception->getMessage());
            return null;
        }

        if (\Auth::user()->log_connections) {
            ActionLog::make(1, 'connected', 'sftp', "Made sftp connection {$user}:{$port} with password");
        }

        return $sftp;
    }

    public static function makeSftpConnectionKey(string $host, int $port, string $user, string $key_id, ?string $key_password = null, int $timeout = 8): ?SFTP
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

        $sftp = new SFTP($host, $port, $timeout);

        try {
            $sftp->login($user, $key);
        } catch (\Exception $exception) {
            ActionLog::make(5, 'connect', 'SSH', $exception->getMessage());
            return null;
        }

        if (\Auth::user()->log_connections) {
            ActionLog::make(1, 'connected', 'sftp', "Made sftp connection {$user}:{$port} with key: {$key_id}");
        }

        return $sftp;
    }

    public static function do(SftpConnection $sftpConnection, int $timeout = 8): ?SFTP
    {
        $connection = $sftpConnection->where('id', $sftpConnection->id)->with(['server.ip_ssh', 'key'])->firstOrFail();

        if (is_null($connection->key_id)) {//Password
            $ssh = self::makeSftpConnectionPassword($connection->server->ip_ssh->ip, $connection->port, $connection->username, Crypt::decryptString($connection->password), $timeout);
        } else if (!is_null($connection->key->password)) {//Key with a password
            $ssh = self::makeSftpConnectionKey($connection->server->ip_ssh->ip, $connection->port, $connection->username, $connection->key->saved_as, Crypt::decryptString($connection->password), $timeout);
        } elseif (is_null($connection->key->password)) {//Key with NO password
            $ssh = self::makeSftpConnectionKey($connection->server->ip_ssh->ip, $connection->port, $connection->username, $connection->key->saved_as, null, $timeout);
        } else {
            return null;
        }

        return $ssh;
    }

    public static function runSftpCommand(SFTP $sftpConnection, string $command): bool|string
    {
        return $sftpConnection->exec($command);
    }

    public static function downloadFile(SFTP $sftpConnection, string $file, bool $write_progress = false): bool|string
    {
        $file_size = $sftpConnection->filesize($file);
        return $sftpConnection->get($file, false, 0, -1, function($got) use ($file_size, $write_progress) {
            if ($write_progress){
                $progress = round(($got / $file_size) * 100);
                Storage::disk('private')->put("progress/".\Auth::id()."/download.json", json_encode(['progress' => $progress]));
            }
        });
    }

}
