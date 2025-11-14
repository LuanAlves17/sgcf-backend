# Usa imagem leve do Node
FROM node:23.11.0-slim

WORKDIR /app

# Copia apenas dependências para aproveitar cache
COPY package*.json ./

# Instala dependências do sistema e Node
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        openssl \
        libssl-dev \
        curl \
        postgresql-client \
        dos2unix && \
    npm ci --omit=dev && \
    rm -rf /var/lib/apt/lists/*

# Copia restante do código
COPY . .

# Usa shell padrão da imagem (sh)
SHELL ["/bin/sh", "-c"]

# Corrige quebras de linha do Windows
RUN dos2unix entrypoint.sh

# Dá permissão de execução pro entrypoint
RUN chmod +x entrypoint.sh

# Gera Prisma Client
RUN npx prisma generate

# Variáveis padrão
ENV NODE_ENV=production
ENV PORT=3301

EXPOSE 3301

# Entrypoint e comando principal
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "server.js"]
