<x-mail::message>
# Your command output

### server: {{$contents['server']['hostname']}}

### command: `{{$contents['the_command']}}`

### seconds: `{{$contents['seconds_taken']}}`

### output:

`{{$contents['output']}}`

</x-mail::message>
