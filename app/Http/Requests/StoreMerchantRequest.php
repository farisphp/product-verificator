<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMerchantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->is_admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required"],
            "email" => ["required", Rule::email()->rfcCompliant(strict: false)],
            "admin_email" => [
                "required",
                Rule::email()->rfcCompliant(strict: false),
            ],
            "phone" => ["required"],
            "address" => ["required"],
            "logo" => ["nullable"],
            "website" => ["nullable"],
        ];
    }
}
