#!/bin/bash

echo "🚀 Starting deployment process..."

# Build the project
echo "📦 Building project..."
npm run build

# Commit and push to main branch
echo "📝 Committing changes..."
git add .
git commit -m "Deploy: $(date)"

# Push to main branch
echo "⬆️ Pushing to main branch..."
git push origin main

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment completed successfully!"
echo "🔗 Your app should be available at: https://aiwlrma.github.io/aiwlrma-gridatech-nursing-dashboard-web-/"
