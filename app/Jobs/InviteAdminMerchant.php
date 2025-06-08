<?php

namespace App\Jobs;

use App\Mail\AdminInvitation;
use App\Models\Invitation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class InviteAdminMerchant implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Invitation $invitation) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $name = $this->getNameFromEmail($this->invitation->email);

        Mail::to($this->invitation->email)->send(
            new AdminInvitation(
                name: $name,
                email: $this->invitation->email,
                setupUrl: route("invitation.show", [
                    "token" => $this->invitation->token,
                ])
            )
        );
    }

    /**
     * Get capitalized first name from email address.
     */
    private function getNameFromEmail(string $email): string
    {
        // Extract the part before @ symbol
        $username = explode("@", $email)[0];

        // Extract the first name (if username contains dots or underscores)
        $firstName = explode(".", str_replace("_", ".", $username))[0];

        // Capitalize the first name
        return ucfirst($firstName);
    }
}
