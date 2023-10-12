<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class NetworkUsage extends Model
{
    use HasFactory;

    protected $fillable = ['server_id', 'rx', 'tx', 'total', 'rx_mb', 'tx_mb', 'total_mb', 'datetime'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (NetworkUsage $networkUsage) {
            $networkUsage->user_id = \Auth::id();
        });
    }

    public static function insertNetworkUsageLastHour(Server $server): ?\Illuminate\Http\JsonResponse
    {
        $connection = Server::where('id', $server->id)->with(['conn.key', 'conn', 'ip_ssh'])->firstOrFail();

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

        $ssh_output = Connection::runCommand($ssh, "vnstat --json");

        $result = json_decode($ssh_output, true);

        $valid_json = json_last_error() === JSON_ERROR_NONE;

        if (!$valid_json) {
            return response()->json(['message' => 'Please install vnstat'], 400)->header('Content-Type', 'application/json');
        }

        $second_last = count($result['interfaces'][0]['traffic']['hour']) - 2;
        $data = $result['interfaces'][0]['traffic']['hour'][$second_last];
        $previous_date = $data['date'];
        $date = "{$previous_date['year']}-{$previous_date['month']}-{$previous_date['day']}";
        $hour = sprintf("%02d", $data['time']['hour']);
        $datetime = "$date $hour:00:00";

        $rx_mb = $data['rx'] / 1024 / 1024;
        $tx_mb = $data['tx'] / 1024 / 1024;

        $network = self::firstOrCreate(['server_id' => $connection->id, 'datetime' => $datetime], [
            'server_id' => $connection->id,
            'rx' => $data['rx'],
            'tx' => $data['tx'],
            'total' => ($data['rx'] + $data['tx']),
            'rx_mb' => $rx_mb,
            'tx_mb' => $tx_mb,
            'total_mb' => $rx_mb + $tx_mb,
            'datetime' => $datetime
        ]);

        return response()->json($network)->header('Content-Type', 'application/json');
    }

}
