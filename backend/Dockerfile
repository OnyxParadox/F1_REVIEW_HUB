# Node.js Alpine base image for low footprint production
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Install curl for Docker health check
RUN apk add --no-cache curl

# Copy package manifests first for optimal layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose backend API port
EXPOSE 5000

# Docker Container Healthcheck
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Environment variable defaults
ENV NODE_ENV=production
ENV PORT=5000

# Start server
CMD ["node", "src/server.js"]
