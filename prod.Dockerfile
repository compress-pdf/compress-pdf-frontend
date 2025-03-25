FROM node:22.14.0 AS base

# Install dependencies
FROM base AS dependencies
WORKDIR /app
COPY package.json ./
RUN npm install

# Build the application
FROM base AS build
WORKDIR /app

# Copy everything needed to build the app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Run the application
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    HOSTNAME="0.0.0.0"

# Copy built standalone output
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

CMD ["node", "server.js"]
