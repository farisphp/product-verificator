<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "brand" => $this->brand,
            "material" => $this->material,
            "description" => $this->description,
            "colors" => $this->colors,
            "sizes" => $this->sizes,
            "category" => $this->category,
            "merchant_id" => $this->merchant_id,
            "totalItems" => 0,
            "totalClaimed" => 0,
        ];
    }
}
