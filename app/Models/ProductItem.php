<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;

class ProductItem extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        "product_id",
        "serial_number",
        "manufacture_date",
        "sku",
        "color",
        "size",
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        "manufacture_date" => "datetime",
    ];

    /**
     * Get the product that owns the product item.
     *
     * @return BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    #[Scope]
    public function filter($query, $filters): void
    {
        $query->when($filters["search"] ?? null, function (
            Builder $query,
            $search,
        ) {
            $query
                ->where("product_id", "like", "%" . $search . "%")
                ->orWhere("serial_number", "like", "%" . $search . "%")
                ->orWhere("sku", "like", "%" . $search . "%")
                ->orWhere("color", "like", "%" . $search . "%");
        });
    }
}
