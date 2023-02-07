<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

class MySQLDump extends Model
{
    use HasFactory;

    protected $table = 'mysql_dumps';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['connection_id', 'server_id', 'database_id', 'db_connection_id', 'user_id', 'these_tables', 'save_to', 'save_as', 'compress', 'option', 'flags', 'last_ran'];

    protected static function booted(): void
    {
        static::creating(function (MySQLDump $mySQLDump) {
            $mySQLDump->id = Str::random(8);
            $mySQLDump->user_id = \Auth::id();
        });

        static::created(function (MySQLDump $mySQLDump) {
            ActionLog::make(1, 'create', 'MySQLdump', 'Created MySQLdump '.$mySQLDump->id);
        });

        static::updated(function (MySQLDump $mySQLDump) {
            ActionLog::make(1, 'update', 'MySQLdump', 'Updated MySQLdump '.$mySQLDump->id);
        });

        static::deleted(function (MySQLDump $mySQLDump) {
            ActionLog::make(1, 'deleted', 'MySQLdump', 'Deleted MySQLdump');
        });

    }

    protected static function createCommand(MySQLDump $mySQLDump): string
    {
        $db = Database::where('id', $mySQLDump->database_id)->with(['conn'])->firstOrFail();

        $password = Crypt::decryptString($db->conn->password);

        if (!is_null($mySQLDump->save_to)) {
            $save_to = "-T{$mySQLDump->save_to}";
        } else {
            $save_to = "";
        }

        if (is_null($mySQLDump->these_tables)) {
            $db_tables = "--databases {$db->name}";
        } else {
            $db_tables = "{$db->name} " . trim($mySQLDump->these_tables);
        }

        if ($mySQLDump->option === 1) {
            $option = "--quick";
        } elseif ($mySQLDump->option === 2) {
            $option = "--opt";
        } elseif ($mySQLDump->option === 3) {
            $option = "--add-locks";
        } elseif ($mySQLDump->option === 4) {
            $option = "--single-transaction";
        } else {
            $option = '';
        }

        if ($mySQLDump->compress === 1) {
            $compress = '| gzip >';
        } else {
            $compress = '>';
        }

        return "mysqldump -u {$db->conn->username} -p{$password} {$save_to} {$db_tables} {$option} {$mySQLDump->flags} {$compress} {$mySQLDump->save_as}";
    }

    protected static function runCommand(MySQLDump $mySQLDump): ?string
    {
        $conn = Connection::where('id', $mySQLDump->connection_id)->firstOrFail();

        $connection = Connection::do($conn, 30);

        $command = self::createCommand($mySQLDump);

        return Connection::runCommand($connection, $command);
    }

}
