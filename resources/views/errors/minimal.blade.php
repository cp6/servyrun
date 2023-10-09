<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('code') - @yield('title')</title>
    @vite(['resources/css/app.css', 'resources/css/app.jsx', 'resources/js/switcher.js'])
</head>
<body class="antialiased bg-gray-50 dark:bg-gray-800">
<section class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-800">
    <div class="px-4 mx-auto max-w-screen-xl lg:px-6 text-center">
        <h1 class="mb-4 text-6xl font-bold lg:text-7xl text-gray-800 dark:text-white">@yield('code')</h1>
        <p class="mb-6 text-2xl tracking-tight font-bold text-gray-700 md:text-3xl dark:text-gray-200">@yield('message')</p>
        <a href="{{url()->previous()}}"
           class="inline-flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-7 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go
            back</a>
        <a href="{{route('dashboard')}}"
           class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-6 py-2 text-center dark:focus:ring-primary-900 my-4">Home</a>
    </div>
</section>
</body>
</html>
