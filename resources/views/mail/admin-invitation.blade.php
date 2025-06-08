<x-mail::message>
# Admin Invitation

Hello {{ $name }},

You have been invited to access the Merchant Dashboard as an administrator. To set up your account, please click the button below.

<x-mail::button :url="$setupUrl">
Set Up Your Account
</x-mail::button>

If you did not expect this invitation, please ignore this email.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
