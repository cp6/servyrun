<x-mail::message>
    # surcuri login alert

    {{ $contents['name'] }} there was a login for your email: {{ $contents['email'] }} at {{ config('app.url') }}

</x-mail::message>
