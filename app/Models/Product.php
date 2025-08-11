<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;

class Product extends Model
{
    protected $fillable = [
        "name",
        "brand",
        "material",
        "description",
        "colors",
        "sizes",
        "category_id",
        "merchant_id",
    ];

    protected $casts = [
        "colors" => "array",
        "sizes" => "array",
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function owner()
    {
        return $this->hasOneThrough(User::class, ProductOwnership::class);
    }

    public function items()
    {
        return $this->hasMany(ProductItem::class);
    }

    #[Scope]
    public function filter($query, $filters): void
    {
        $query->when($filters["search"] ?? null, function (
            Builder $query,
            $search,
        ) {
            $query
                ->where("name", "like", "%" . $search . "%")
                ->orWhere("brand", "like", "%" . $search . "%");
        });
    }
}
