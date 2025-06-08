<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class TeamsPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Log::debug(
            "team permission middleware: " . json_encode(auth()->user())
        );
        Log::debug(session("team_id"));
        if (!empty(auth()->user())) {
            setPermissionsTeamId(session("team_id"));
        }
        return $next($request);
    }
}
