<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AllowedIpApiMiddleware
{
    public function handle(Request $request, Closure $next)
    {//Allow only whitelisted IP for account to make API calls
        $account_ip = User::where('id', Auth::guard('api')->user()->id)->select('api_ip_only')->first();

        if (!is_null($account_ip->api_ip_only) && $request->ip() !== $account_ip->api_ip_only) {
            abort(401);
        }

        return $next($request);
    }
}
