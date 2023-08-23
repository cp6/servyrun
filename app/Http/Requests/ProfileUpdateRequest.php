<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'login_ip_only' => ['ip', 'nullable', 'sometimes'],
            'api_ip_only' => ['ip', 'nullable', 'sometimes'],
            'check_uptime_server_index' => ['integer', 'required', 'min:0', 'max:1'],
            'check_uptime_connection_index' => ['integer', 'required', 'min:0', 'max:1'],
            'check_uptime_sftp_connection_index' => ['integer', 'required', 'min:0', 'max:1'],
            'check_uptime_db_connection_index' => ['integer', 'required', 'min:0', 'max:1'],
            'allow_api_db_queries' => ['integer', 'required', 'min:0', 'max:1'],
            'allow_api_access' => ['integer', 'required', 'min:0', 'max:1'],
            'log_connections' => ['integer', 'required', 'min:0', 'max:1']
        ];
    }
}
