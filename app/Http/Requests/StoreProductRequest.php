<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|min:2|max:50",
            "brand" => "required|string|min:2|max:50",
            "category" => "required|string|min:1",
            "merchant_id" => "sometimes|required|exists:merchants,id",
            "material" => "nullable|string",
            "description" => "nullable|string",
            "colors" => "sometimes|array",
            "colors.*.label" => "required|string",
            "colors.*.value" => "required|string",
            "sizes" => "sometimes|array",
            "sizes.*.label" => "required|string",
            "sizes.*.value" => "required|string",
        ];
    }
}
