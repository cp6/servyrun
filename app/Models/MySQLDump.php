<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MySQLDump extends Model
{
    use HasFactory;

    protected $table = 'mysql_dumps';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['connection_id', 'server_id', 'database_id', 'db_connection_id', 'user_id', 'certain_tables', 'save_to', 'save_as', 'compress', 'quick', 'opt', 'lock_tables', 'single_transaction', 'last_ran'];



}
