<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $headerKey = $request->header('api_key');
        $apiKey = config('system.api_key');

        if (!$headerKey || $apiKey !== $headerKey) {
            return response()->json([
                'success' => false,
                'message' => 'API Key not found',
                'error' => 'Unauthorized'
            ], 401);
        }

        return $next($request);
    }
}
