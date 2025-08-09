# Bee (Laravel + React)

Монорепо:  
- **bee-srv** — Laravel API (Sanctum, sessions)
- **bee-ui** — React + Vite + Tailwind

## Быстрый старт (локально)

### Backend
```bash
cd bee-srv
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve --host=0.0.0.0 --port=8080


cd bee-ui
cp .env.example .env
npm install
npm run dev -- --port 5174
