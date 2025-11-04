# FROM node:18-alpine AS builder
FROM node:20-alpine AS builder


WORKDIR /app
RUN apk add --no-cache curl
COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app /app 

EXPOSE 5000

CMD ["node","server.js"]

