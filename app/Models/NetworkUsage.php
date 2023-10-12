<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class NetworkUsage extends Model
{
    use HasFactory;

    protected $fillable = ['server_id', 'user_id', 'rx', 'tx', 'total', 'rx_mb', 'tx_mb', 'total_mb', 'datetime'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    public static function insertNetworkUsageLastHour(Server $server): ?\Illuminate\Http\JsonResponse
    {
        $connection = Connection::withoutGlobalScope(new UserOwnedScope())->where('server_id', $server->id)->with('serverNoOwner', 'keyNoOwner')->first();

        if (is_null($connection)) {
            return response()->json(['success' => false, 'message' => 'No Connection found for server ' . $server->id], 400)->header('Content-Type', 'application/json');
        }

        $ssh = Connection::doNoOwner($connection, 8, false);

        if (is_null($ssh)) {
            return response()->json(['success' => false, 'message' => 'SSH could not connect for connection ' . $connection->id], 400)->header('Content-Type', 'application/json');
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

        try {
            $network = self::firstOrCreate(['server_id' => $server->id, 'datetime' => $datetime], [
                'server_id' => $server->id,
                'user_id' => $server->user_id,
                'rx' => $data['rx'],
                'tx' => $data['tx'],
                'total' => ($data['rx'] + $data['tx']),
                'rx_mb' => $rx_mb,
                'tx_mb' => $tx_mb,
                'total_mb' => $rx_mb + $tx_mb,
                'datetime' => $datetime
            ]);

            return response()->json($network)->header('Content-Type', 'application/json');

        } catch (\Exception $exception) {

            return response()->json(['message' => $exception->getMessage()], 400)->header('Content-Type', 'application/json');
        }

    }

}
