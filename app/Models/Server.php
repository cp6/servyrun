<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Server extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    protected $fillable = ['location_id', 'type_id', 'operating_system', 'hostname', 'title', 'cpu', 'cpu_cores', 'cpu_freq', 'disk_gb', 'ram_mb', 'swap_mb', 'bandwidth_gb', 'ping_port'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
        //self::preventSilentlyDiscardingAttributes(true);
    }

    protected static function booted(): void
    {
        static::creating(function ($server) {
            $server->id = Str::random(8);
            $server->user_id = \Auth::id();
        });

        static::created(function ($server) {
            ActionLog::make(1, 'create', 'server', 'Created server', $server->id);
        });

        static::updated(function ($server) {
            ActionLog::make(1, 'update', 'server', 'Updated server', $server->id);
        });

        static::deleted(function ($server) {
            ActionLog::make(1, 'delete', 'server', 'Deleted server', $server->id);
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


}
