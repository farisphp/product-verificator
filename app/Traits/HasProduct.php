<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use App\Models\Product;

trait HasProduct
{
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeFilterByProductMerchant(
        Builder $query,
        int $merchantId
    ): void {
        if ($merchantId) {
            $query->whereHas("product", function ($query) use ($merchantId) {
                $query->where("merchant_id", $merchantId);
            });
        }
    }
}
