#!/bin/sh
set -e

npx prisma migrate reset --force

echo "Rodando migrations..."
npx prisma migrate dev --name test

echo "Iniciando backend..."
exec node server.js