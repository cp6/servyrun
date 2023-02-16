<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LoggedIn extends Mailable
{
    use Queueable, SerializesModels;

    public array $contents;

    public function __construct($contents)
    {
        $this->contents = $contents;
    }

    public function envelope()
    {
        return new Envelope(
            subject: 'Login alert',
        );
    }

    public function content()
    {
        return new Content(
            markdown: 'emails.loggedin',
        );
    }

    public function build(): LoggedIn
    {
        return $this->markdown('emails.loggedin')
            ->with('contents', $this->contents);
    }

}
