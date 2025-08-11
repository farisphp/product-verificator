<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasProduct;

class ProductOwnership extends Model
{
    use HasProduct;

    protected $fillable = ["product_id", "owner_id"];

    public function owner()
    {
        return $this->belongsTo(User::class, "owner_id");
    }
}
