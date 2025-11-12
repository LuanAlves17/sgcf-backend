FROM node:23-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

RUN apt-get update && apt-get install -y openssl

COPY . .
RUN npx prisma generate

ENV NODE_ENV=production
ENV PORT=3301

EXPOSE 3301
ENTRYPOINT ["./entrypoint.sh"]