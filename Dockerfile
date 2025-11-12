# Usa uma imagem leve do Node
FROM node:23.11.0-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas dependências primeiro (melhor uso de cache)
COPY package*.json ./

# Instala dependências do sistema e Node.js
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openssl libssl-dev curl postgresql-client dos2unix && \
    npm ci --omit=dev && \
    rm -rf /var/lib/apt/lists/*

# Copia o restante do código
COPY . .

# Corrige quebras de linha do Windows -> Unix (evita erro no entrypoint)
RUN dos2unix entrypoint.sh

# Gera o Prisma Client (importante pro runtime)
RUN npx prisma generate

# Dá permissão de execução pro entrypoint
RUN chmod +x entrypoint.sh

# Define variáveis padrão
ENV NODE_ENV=production
ENV PORT=3301

# Expõe a porta da aplicação
EXPOSE 3301

# Usa o entrypoint pra gerenciar o start e migrations
ENTRYPOINT ["./entrypoint.sh"]

# Comando principal (executado após o entrypoint)
CMD ["node", "server.js"]
