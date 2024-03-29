<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use PDO;

class DatabaseConnection extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['host', 'title', 'port', 'username', 'password', 'type', 'version', 'privileges'];

    public \PDO $db_con;

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (DatabaseConnection $databaseConnection) {
            $databaseConnection->id = \Str::random(8);
            $databaseConnection->user_id = \Auth::id();
        });

        static::created(function (DatabaseConnection $databaseConnection) {
            ActionLog::make(1, 'create', 'database connection', 'Created database connection ' . $databaseConnection->id);
        });

        static::updated(function (DatabaseConnection $databaseConnection) {
            ActionLog::make(1, 'delete', 'database connection', 'Updated database connection ' . $databaseConnection->id);
        });

        static::deleted(function () {
            ActionLog::make(1, 'delete', 'database connection', 'Deleted database connection');
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

    public function databases(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Database::class, 'db_connection_id', 'id');
    }

    public static function tryConnection(DatabaseConnection $databaseConnection): bool
    {
        try {
            $db = new PDO("mysql:host=$databaseConnection->host;dbname=;charset=utf8mb4", $databaseConnection->username, Crypt::decryptString($databaseConnection->password), [PDO::ATTR_TIMEOUT => 3]);
        } catch (\Exception $e) {
            return false;
        }
        if (\Auth::user()->log_connections) {
            ActionLog::make(1, 'connected', 'database', "Made database connection to {$databaseConnection->username}@{$databaseConnection->host}");
        }
        return true;
    }

    public function dbConnect(DatabaseConnection $databaseConnection, string $database): PDO|bool
    {
        try {
            $this->db_con = new PDO("mysql:host=$databaseConnection->host;dbname=$database;charset=utf8mb4", $databaseConnection->username, Crypt::decryptString($databaseConnection->password));
            if (\Auth::user()->log_connections) {
                ActionLog::make(1, 'connected', 'database', "Made database connection to {$databaseConnection->username}@{$databaseConnection->host} {$database}");
            }
            return $this->db_con;
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
        try {
            return $this->db_con->query("SELECT COUNT(*) AS total FROM `{$table->name}`;")->fetchColumn();
        } catch (\Exception $exception){
            return null;
        }
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

    public function getTableColumnData(DatabaseTable $databaseTable, DatabaseTableColumn $databaseTableColumn): ?array
    {
        if (!isset($this->db_con)) {
            return null;
        }
        return $this->db_con->query("SELECT `{$databaseTableColumn->name}` FROM `{$databaseTable->name}`;")->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getVersion(): ?string
    {
        if (!isset($this->db_con)) {
            return null;
        }
        return $this->db_con->query("SELECT VERSION();")->fetchColumn();
    }

    public function getCurrentUser(): ?string
    {
        if (!isset($this->db_con)) {
            return null;
        }
        return $this->db_con->query("SELECT CURRENT_USER();")->fetchColumn();
    }

    public function getPrivileges(string $host, string $user): bool|array
    {
        if (!isset($this->db_con)) {
            return false;
        }
        try {
            $select = $this->db_con->prepare("SELECT Select_priv, Insert_priv, Update_priv, Delete_priv, Reload_priv, Alter_priv, Create_user_priv, Create_tmp_table_priv FROM `mysql`.`user` WHERE `host` = ? AND `user` = ?;");
            $select->execute([$host, $user]);
            return $select->fetchAll(PDO::FETCH_ASSOC);
        } catch (\Exception $exception) {
            return false;
        }

    }

}
