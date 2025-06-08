<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Log;

class CustomSessionAfterLogin
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        if (!$event->user->is_admin) {
            Log::debug(json_encode($event));
            session([
                "team_id" => $event->user
                    ->merchants()
                    ->orderByPivot("created_at", "desc")
                    ->first()->id,
            ]);
        }
    }
}
