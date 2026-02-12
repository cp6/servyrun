#!/bin/sh
set -e

# Validate required environment variables
for var in DB_HOST DB_DATABASE DB_USERNAME DB_PASSWORD APP_URL; do
    eval val=\$$var
    if [ -z "$val" ]; then
        echo "Error: $var is not set"
        exit 1
    fi
done

# Run setup only if .env file doesn't exist
if [ ! -e .env ]; then
    cat > .env << EOF
APP_NAME=Servyrun
APP_ENV=production
APP_DEBUG=false
APP_KEY=

DB_CONNECTION=mysql
DB_HOST=${DB_HOST}
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}
APP_URL=${APP_URL}
EOF
    php artisan key:generate --no-interaction --force
fi

# Run migrations (safe for production - won't drop tables)
php artisan migrate --force

php artisan serve --host=0.0.0.0 --port=8000
