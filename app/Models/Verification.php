<?php

namespace App\Models;

use App\Traits\HasProduct;
use Illuminate\Database\Eloquent\Model;

class Verification extends Model
{
    use HasProduct;

    protected $fillable = ["product_id", "ip_address", "user_agent"];
}
