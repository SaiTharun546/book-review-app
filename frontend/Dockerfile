# Stage 1 — deps (install prod deps for runtime later)
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

# Stage 2 — builder (install all deps and build)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Build Next app
RUN npm run build

# Stage 3 — runtime (small image with only runtime artifacts)
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Copy runtime files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
# Copy production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
# Use next start for production (ensure package.json start = "next start -p 3000")
CMD ["npm", "start"]
