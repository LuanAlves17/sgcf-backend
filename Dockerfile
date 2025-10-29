# Dockerfile — Backend Node + Prisma

# Use a versão slim do Node (Debian) para reduzir tamanho da imagem
FROM node:23.11.0-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (para cache do Docker)
COPY package*.json ./

# Instala dependências do sistema e do Node
RUN apt-get update && \
    apt-get install -y openssl libssl-dev curl && \
    npm ci --omit=dev && \
    rm -rf /var/lib/apt/lists/*

# Copia o restante do projeto para dentro do container
COPY . .

# Gera o Prisma Client para Linux (debian-openssl-1.1.x)
RUN npx prisma generate

# Define variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3002

# Expõe a porta que o backend vai rodar
EXPOSE 3002

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
