FROM node:23.11.0-slim AS build-stage

# Create app directory
WORKDIR /usr/src/app

# Install build dependencies for native modules
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

FROM node:23.11.0-slim AS production-stage

# Create app directory
WORKDIR /usr/src/app

# Copy only necessary files from build stage
COPY --from=build-stage /usr/src/app/node_modules ./node_modules
COPY --from=build-stage /usr/src/app/package*.json ./
COPY --from=build-stage /usr/src/app/dist ./dist

# Install production dependencies only (optional)
# RUN npm ci --only=production

# Clean up unnecessary files
RUN rm -rf /usr/src/app/node_modules/.cache

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application in prod mode
CMD ["npm", "run", "start:prod"]