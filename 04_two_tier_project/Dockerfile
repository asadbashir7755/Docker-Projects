# ---------- Stage 1: Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy and install dependencies
COPY nodejs-mysql-links/package*.json ./
RUN npm ci --only=production

# Copy rest of the app source
COPY nodejs-mysql-links/ .

# ---------- Stage 2: Final ----------
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only the built app and node_modules
COPY --from=builder /app /app

EXPOSE 4000
CMD ["npm", "run", "dev"]
