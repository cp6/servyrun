<?php

namespace App\Listeners;

use App\Mail\LoggedIn;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendLoginEmail
{
    public function handle(Login $event): void
    {
        if ($event->user->email_when_login) {
            //Send login email
            $contents = [
                'email' => $event->user->email,
                'name' => $event->user->name
            ];

            Mail::to($event->user->email)->send(new LoggedIn($contents));

        }
    }

}
