<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class IpAddress extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['server_id', 'ip', 'is_ipv4', 'is_main', 'is_ssh', 'asn', 'org', 'isp', 'timezone_gmt', 'country', 'city', 'continent'];

    protected static function boot(): void
    {
        parent::boot();
        static::addGlobalScope(new UserOwnedScope());
    }

    protected static function booted(): void
    {
        static::creating(function (IpAddress $ipAddress) {
            $ipAddress->id = \Str::random(8);
            $ipAddress->user_id = \Auth::id();
            $ipAddress->is_ipv4 = (filter_var($ipAddress->is_ipv4, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) ? 0 : 1;
        });

        static::created(function (IpAddress $ipAddress) {
            ActionLog::make(1, 'create', 'ip', 'Created ip address ' . $ipAddress->id);
        });

        static::updated(function (IpAddress $ipAddress) {
            ActionLog::make(1, 'update', 'ip', 'Updated ip address ' . $ipAddress->id);
        });

        static::deleted(function () {
            ActionLog::make(1, 'deleted', 'ip', 'Deleted ip address');
        });
    }

    public function server(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Server::class, 'id', 'server_id');
    }

    public static function fetchUpdateIpDetails(IpAddress $ipAddress): bool
    {//Gets data about the IP address thanks to ipwhois
        $fetch = Http::acceptJson()->get("https://ipwhois.app/json/{$ipAddress->ip}");

        if ($fetch->status() === 200) {

            try {
                $data = json_decode($fetch->body(), true, 512, JSON_THROW_ON_ERROR);

                return $ipAddress->update(
                    [
                        'asn' => $data['asn'],
                        'org' => $data['org'],
                        'isp' => $data['isp'],
                        'timezone_gmt' => $data['timezone_gmt'],
                        'country' => $data['country'],
                        'city' => $data['city'],
                        'continent' => $data['continent'],
                        'is_ipv4 ' => (filter_var($ipAddress->ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) ? 0 : 1
                    ]
                );

            } catch (\Exception $exception) {

                return false;
            }

        }

        return false;
    }

}
