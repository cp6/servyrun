import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        react({
            include: "**/*.jsx",
        }),
        ["prismjs", {
            "languages": ["javascript", "css", "markup", "sql", "ini", "php", "html", "log"],
            "plugins": ["line-numbers"],
            "theme": "atom-dark",
            "css": true
        }]
    ],
    server: {
        host: 'surcuri.test'
    }
});
