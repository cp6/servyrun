<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'country', 'lat', 'lon'];

    public function server(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Server::class, 'location_id', 'id');
    }
}
