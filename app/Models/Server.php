<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Server extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['location_id', 'type_id', 'operating_system', 'hostname', 'title', 'cpu', 'cpu_cores', 'cpu_freq', 'disk_gb', 'disk_tb', 'ram_mb', 'ram_gb', 'swap_mb', 'bandwidth_gb', 'port_speed', 'ping_port', 'price', 'price_usd', 'currency', 'payment_term', 'next_due_date'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
        //self::preventSilentlyDiscardingAttributes(true);
    }

    protected static function booted(): void
    {
        static::creating(function (Server $server) {
            $server->id = \Str::random(8);
            $server->user_id = \Auth::id();
        });

        static::created(function (Server $server) {
            ActionLog::make(1, 'create', 'server', 'Created server ' . $server->title, $server->id);
        });

        static::updated(function (Server $server) {
            ActionLog::make(1, 'update', 'server', 'Updated server ' . $server->title, $server->id);
        });

        static::deleted(function (Server $server) {
            ActionLog::make(1, 'delete', 'server', 'Deleted server');
        });
    }

    public function location(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Location::class, 'id', 'location_id');
    }

    public function type(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Type::class, 'id', 'type_id');
    }

    public function conn(): \Illuminate\Database\Eloquent\Relations\HasOne
    {//Connection
        return $this->hasOne(Connection::class, 'server_id', 'id');
    }

    public function conns(): \Illuminate\Database\Eloquent\Relations\HasMany
    {//All connections
        return $this->hasMany(Connection::class, 'server_id', 'id');
    }

    public function sftp_conn(): \Illuminate\Database\Eloquent\Relations\HasOne
    {//SFTP Connection
        return $this->hasOne(SftpConnection::class, 'server_id', 'id');
    }

    public function ip_ssh(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(IpAddress::class, 'server_id', 'id')->where('is_ssh', 1);
    }

    public function ips(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(IpAddress::class, 'server_id', 'id');
    }

    public function pings(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Ping::class, 'server_id', 'id');
    }

    public function command_outputs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CommandOutput::class, 'server_id', 'id');
    }

    public function usages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ServerUsage::class, 'server_id', 'id');
    }

    public function usage(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ServerUsage::class, 'server_id', 'id')->orderBy('id', 'desc');
    }

    public static function getCpuOsDetails(Server $server): bool
    {
        $connection = Connection::where('server_id', $server->id)->with('server', 'key')->firstOrFail();

        $ssh = Connection::do($connection, 10);

        $cpu_freq = Connection::runCommand($ssh, "lscpu | grep  MHz");
        $cpu_freq_array = explode("\n", $cpu_freq);

        if (isset($cpu_freq_array[0]) && str_contains($cpu_freq_array[0], "CPU MHz:")) {
            $freq = (float)str_replace("CPU MHz:", "", $cpu_freq_array[0]);
        } else {
            $freq = null;
        }

        $cpu_count = (int)Connection::runCommand($ssh, "grep -c ^processor /proc/cpuinfo");

        $cpu_name = trim(Connection::runCommand($ssh, 'lscpu | grep "Model name" | cut -f 2 -d ":"'));

        $os = trim(Connection::runCommand($ssh, 'cat /etc/issue.net'));

        return $server->update([
            'operating_system' => $os,
            'cpu' => $cpu_name,
            'cpu_freq' => ($freq / 1000),
            'cpu_cores' => $cpu_count
        ]);

    }

    public static function getRamDiskDetails(Server $server): bool
    {
        $connection = Connection::where('server_id', $server->id)->with('server', 'key')->firstOrFail();

        $ssh = Connection::do($connection, 10);

        $ram = Connection::runCommand($ssh, "free -m | grep 'Mem'");

        $ram_array = explode(" ", preg_replace('/\s+/', ' ', $ram));

        $ram_mb = $ram_array[1];

        $swap = Connection::runCommand($ssh, "free -m | grep 'Swap'");

        $swap_array = explode(" ", preg_replace('/\s+/', ' ', $swap));

        $swap_mb = $ram_array[1];

        $disk = Connection::runCommand($ssh, "df -BG");
        $disk_array = explode(" ", preg_replace('/\s+/', ' ', $disk));

        $disk_gb = 0;
        for ($i = 8; $i <= 62; $i += 6) {//Start at index 8 and jump by 6 until at or below 62
            if (isset($disk_array[$i])) {
                $disk_gb += (int)$disk_array[$i];
            }
        }

        return $server->update([
            'ram_mb' => $ram_mb,
            'swap_mb' => $swap_mb,
            'disk_gb' => $disk_gb
        ]);

    }

    public static function getServerUsage(Server $server): \Illuminate\Http\JsonResponse
    {
        $connection = Connection::where('server_id', $server->id)->with('server', 'key')->firstOrFail();

        $ssh = Connection::do($connection, 10);

        if (is_null($ssh)) {
            return response()->json(['success' => false, 'message' => 'SSH could not connect'], 400)->header('Content-Type', 'application/json');
        }

        $cpu_used_percent = Connection::getCpuUsedPercent($ssh);
        $ram_used_percent = Connection::getRamUsedPercent($ssh);
        $disk_used_percent = Connection::getDiskUsedPercent($ssh);
        $disk_used = Connection::getDiskUsed($ssh);
        $disk_avail = Connection::getDiskAvailable($ssh);
        //$port_speed = Connection::getPortSpeed($ssh);//Does not work for VPS

        return response()->json(
            [
                'success' => true,
                'cpu_used_percent' => (float)number_format($cpu_used_percent, 4),
                'ram_used_percent' => (float)number_format($ram_used_percent, 4),
                'disk_used_percent' => $disk_used_percent,
                'disk_used' => $disk_used,
                'disk_used_gb' => (float)number_format($disk_used / 1024 / 1024, 4),
                'disk_available' => $disk_avail,
                'disk_available_gb' => (float)number_format($disk_avail / 1024 / 1024, 4),
            ]
        )->header('Content-Type', 'application/json');

    }

}
