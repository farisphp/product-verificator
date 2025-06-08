<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invitation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "token",
        "merchant_id",
        "invited_by",
        "email",
        "role",
    ];

    /**
     * Get the merchant associated with the invitation.
     */
    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }

    /**
     * Get the user who created the invitation.
     */
    public function inviter(): BelongsTo
    {
        return $this->belongsTo(User::class, "invited_by");
    }
}
