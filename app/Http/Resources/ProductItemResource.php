<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductItemResource extends JsonResource
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
            "product_id" => $this->product_id,
            "serial_number" => $this->serial_number,
            "manufacture_date" => $this->manufacture_date,
            "sku" => $this->sku,
            "color" => $this->color,
            "size" => $this->size,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "product" => $this->whenLoaded("product", function () {
                return [
                    "id" => $this->product->id,
                    "name" => $this->product->name,
                    "brand" => $this->product->brand,
                ];
            }),
        ];
    }
}
