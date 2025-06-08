<?php

namespace App\Providers;

use App\Http\Middleware\TeamsPermission;
use Illuminate\Foundation\Http\Kernel;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // /** @var Kernel $kernel */
        // $kernel = app()->make(Kernel::class);

        // $kernel->addToMiddlewarePriorityBefore(
        //     SubstituteBindings::class,
        //     TeamsPermission::class
        // );

        Event::listen(
            \Illuminate\Auth\Events\Login::class,
            \App\Listeners\CustomSessionAfterLogin::class
        );
    }
}
