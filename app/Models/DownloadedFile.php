<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DownloadedFile extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['sftp_connection_id', 'filename', 'from_dir', 'to_dir', 'saved_as', 'size'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (DownloadedFile $downloadedFile) {
            $downloadedFile->id = \Str::random(8);
            $downloadedFile->user_id = \Auth::id();
        });

        static::created(function (DownloadedFile $downloadedFile) {
            ActionLog::make(1, 'downloaded', 'sftp download', "Downloaded file {$downloadedFile->from_dir}/{$downloadedFile->filename} to server as {$downloadedFile->saved_as}");
        });
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function conn(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(SftpConnection::class, 'id', 'sftp_connection_id');
    }

}
