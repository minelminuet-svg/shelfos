#!/bin/bash

echo "🚀 Starting ShelfOS..."

# Check if Docker containers are running
echo "📦 Checking Docker services..."
docker compose ps | grep -q "shelfos-postgres"
if [ $? -ne 0 ]; then
  echo "Starting Docker services..."
  docker compose up -d postgres redis
fi

# Start the development servers
echo "🔧 Starting development servers..."
pnpm dev
