# Stage 1 — builder (install dev deps, run build if any)
FROM node:18-alpine AS builder
WORKDIR /app
# Copy package files first to use Docker cache
COPY backend/package*.json ./
# Install all deps (dev + prod) needed for build
RUN npm ci
# Copy source
COPY backend/ ./
# If your backend has a build step (TypeScript/transpile), run it:
# RUN npm run build
# If not, noop (keeps source as-is)

# Stage 2 — runtime (production)
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies (fresh install for smallest image)
COPY backend/package*.json ./
RUN npm ci --production

# Copy runtime artifacts from builder
# If you used a build step and generated /dist, copy /dist; otherwise copy src
# Adjust according to your project:
# COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json

# Expose runtime port
EXPOSE 3001

# Use a simple start command; adjust if your package.json has a different start script
CMD ["node", "src/server.js"]
