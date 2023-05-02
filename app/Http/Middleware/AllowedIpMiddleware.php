<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class AllowedIpMiddleware
{
    public function handle(Request $request, Closure $next)
    {//Allow only whitelisted IP for account to login
        $account_ip = User::where('email', $request->email)->select('login_ip_only')->first();

        if (isset($account_ip->login_ip_only) && !is_null($account_ip->login_ip_only) && $request->ip() !== $account_ip->login_ip_only) {
            abort(401);
        }

        return $next($request);
    }
}
