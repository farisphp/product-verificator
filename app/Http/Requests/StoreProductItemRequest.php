<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductItemRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "serial_number" => "required|string|min:2",
            "manufacture_date" => "required|date",
            "sku" => "required|string|min:1",
            "color" => "sometimes|required",
            "size" => "sometimes|required",
        ];
    }
}
