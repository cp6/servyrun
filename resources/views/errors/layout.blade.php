<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>
    <style>.full-height,body,html{height:100vh}body,html{background-color:#fff;color:#636b6f;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-weight:100;margin:0}.flex-center{align-items:center;display:flex;justify-content:center}.position-ref{position:relative}.content{text-align:center}.title{font-size:36px;padding:20px}</style>
</head>
<body>
<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            @yield('message')
        </div>
    </div>
</section>
</body>
</html>
