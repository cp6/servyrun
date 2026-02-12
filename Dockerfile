FROM php:8.2-fpm-alpine

# Combine RUN commands to reduce layers
RUN apk add --no-cache linux-headers \
    && docker-php-ext-install pdo pdo_mysql

# Use multi-stage composer copy
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install additional extensions if needed
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions sockets

WORKDIR /app

# Copy composer files first for better layer caching
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Then copy the rest of the application
COPY . .
RUN composer dump-autoload --optimize

# Set environment and don't run as root
ENV APP_ENV=production
RUN adduser -D appuser && chown -R appuser:appuser /app
USER appuser

ENTRYPOINT ["/app/run.sh"]
