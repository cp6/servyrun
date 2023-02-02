<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use PDO;

class DatabaseConnection extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['user_id', 'server_id', 'host', 'title', 'port', 'username', 'password', 'type', 'version'];

    public \PDO $db_con;

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function ($server) {
            $server->id = Str::random(8);
            $server->user_id = \Auth::id();
        });
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function server(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Server::class, 'id', 'server_id');
    }

    public static function tryConnection(DatabaseConnection $databaseConnection): bool
    {
        try {
            $db = new PDO("mysql:host=$databaseConnection->host;dbname=;charset=utf8mb4", $databaseConnection->username, Crypt::decryptString($databaseConnection->password));
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    public function dbConnect(DatabaseConnection $databaseConnection, string $database): PDO|bool
    {
        try {
            return $this->db_con = new PDO("mysql:host=$databaseConnection->host;dbname=$database;charset=utf8mb4", $databaseConnection->username, Crypt::decryptString($databaseConnection->password));
        } catch (\Exception $e) {
            return false;
        }
    }

    public function returnDatabases(): bool|array
    {
        if (!isset($this->db_con)) {
            return false;
        }
        return $this->db_con->query('SHOW DATABASES')->fetchAll(PDO::FETCH_COLUMN);
    }

    public function returnTables(): bool|array
    {
        if (!isset($this->db_con)) {
            return false;
        }
        return $this->db_con->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
    }

    public function returnColumns(string $table): bool|array
    {
        if (!isset($this->db_con)) {
            return false;
        }
        return $this->db_con->query('SHOW COLUMNS FROM ' . $table)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function returnTableRowCount(DatabaseTable $table): ?int
    {
        if (!isset($this->db_con)) {
            return null;
        }
        return $this->db_con->query("SELECT COUNT(*) AS total FROM `{$table->name}`;")->fetchColumn();
    }

    public function returnTableSizeMb(DatabaseTable $table): ?float
    {
        if (!isset($this->db_con)) {
            return null;
        }
        return $this->db_con->query("SELECT round(((data_length + index_length) / 1024 / 1024), 2) `MB` FROM information_schema.TABLES WHERE table_name = '{$table->name}';")->fetchColumn();
    }

    public function getAllTableData(DatabaseTable $databaseTable): ?array
    {
        if (!isset($this->db_con)) {
            return null;
        }
        return $this->db_con->query("SELECT * FROM `{$databaseTable->name}`;")->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getVersion(): ?string
    {
        if (!isset($this->db_con)) {
            return null;
        }
        return $this->db_con->query("SELECT VERSION();")->fetchColumn();
    }

}
