FROM node:24-alpine
WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy source
COPY . .

EXPOSE 5000
CMD ["node", "index.js"]
