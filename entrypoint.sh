#!/bin/sh
set -e

echo "Rodando migrations..."
npx prisma migrate deploy

echo "Iniciando backend..."
exec node server.js
