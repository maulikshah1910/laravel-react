<?php

namespace App\Providers;

use App\Http\Middleware\VerifyApiKey;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->mapApiRoutes();
    }

    private function mapApiRoutes()
    {
        Route::aliasMiddleware('verify.api.key', VerifyApiKey::class);
        // API Routes
        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));

        // API Version based routes
        Route::prefix('api/v1')
            ->middleware(['api', 'verify.api.key'])
            ->group(base_path('routes/api/v1.php'));
    }
}
