# backend/Dockerfile

FROM php:8.2-fpm

# Установим зависимости
RUN apt-get update && apt-get install -y \
    git curl libzip-dev unzip libpng-dev libonig-dev libxml2-dev zip \
    && docker-php-ext-install pdo_mysql zip

# Установим Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install

CMD ["php-fpm"]
