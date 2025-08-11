<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;

class ProductCategory extends Model
{
    protected $fillable = ["name", "merchant_id"];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class, "category_id");
    }

    #[Scope]
    public function filter($query, $filters): void
    {
        $query->when($filters["search"] ?? null, function (
            Builder $query,
            $search,
        ) {
            $query->where("name", "like", "%" . $search . "%");
        });
    }
}
