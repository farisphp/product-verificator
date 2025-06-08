<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MerchantCollection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $res = $this->collection->map(
            fn($merchant) => [
                "id" => $merchant->id,
                "name" => $merchant->name,
                "phone" => $merchant->phone,
                "email" => $merchant->email,
                "address" => $merchant->address,
                "logo" => $merchant->logo
                    ? url()->route("image", [
                        "path" => $merchant->logo,
                        "w" => 60,
                        "h" => 60,
                        "fit" => "crop",
                    ])
                    : null,
            ]
        );
        return $res->toArray();
    }
}
