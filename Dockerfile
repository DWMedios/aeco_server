# Base image
FROM node:20.11.1-slim

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

# Set node environment to development to have access to all deps
ENV NODE_ENV development

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application in prod mode
CMD ["npm", "run", "start:prod"]