<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CommandOutput extends Mailable
{
    use Queueable, SerializesModels;

    public \App\Models\CommandOutput $commandOutput;

    public function __construct(\App\Models\CommandOutput $commandOutput)
    {
        $this->commandOutput = $commandOutput;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Servyrun command output',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.output',
        );
    }

    public function build(): CommandOutput
    {
        return $this->markdown('emails.output')
            ->with('contents', $this->commandOutput);
    }

}
