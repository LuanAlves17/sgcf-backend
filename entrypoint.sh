#!/bin/sh
set -e

echo "⏳ Aguardando Postgres ficar disponível..."
until pg_isready -h "$DB_HOST" -p 5432 -U "$DB_USER" > /dev/null 2>&1; do
  sleep 1
done

echo "✅ Banco disponível. Aplicando migrations..."
npx prisma migrate deploy
npx prisma generate

echo "🚀 Iniciando aplicação..."
exec "$@"
