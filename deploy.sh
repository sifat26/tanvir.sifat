#!/bin/bash

# Portfolio Deployment Quick Start
# This script helps prepare your project for VPS deployment

echo "========================================"
echo "Sifat Portfolio - Deployment Prep"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Run lint
echo "🔍 Running ESLint..."
npm run lint
echo ""

# Build the project
echo "🔨 Building for production..."
npm run build
echo ""

# Check build output
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Build output in dist/ folder:"
    du -sh dist/
    echo ""
    echo "📊 Build contents:"
    ls -lah dist/
    echo ""
    echo "🚀 Ready to deploy!"
    echo ""
    echo "Next steps:"
    echo "1. Copy dist/ folder to your VPS:"
    echo "   scp -r dist/ username@your-vps-ip:/var/www/portfolio/"
    echo ""
    echo "2. Or push to Git and pull on VPS:"
    echo "   git push"
    echo ""
    echo "3. Visit: https://tanvir-sifat.duckdns.org"
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi
