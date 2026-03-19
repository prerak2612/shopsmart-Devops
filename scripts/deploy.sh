#!/bin/bash
# deploy.sh — Idempotent EC2 deployment script for ShopSmart
#
# Run on the EC2 instance (called by GitHub Actions via SSH).
# All commands are designed to be safe to re-run (idempotent).

set -euo pipefail

APP_DIR="${APP_DIR:-/home/ubuntu/shopsmart}"

echo "──────────────────────────────────────────"
echo "  ShopSmart Deploy  — $(date -u '+%Y-%m-%dT%H:%M:%SZ')"
echo "  Directory: $APP_DIR"
echo "──────────────────────────────────────────"

# 1. Pull latest code from main
cd "$APP_DIR"
git fetch --all
git checkout main
git pull origin main
echo "✓ Code pulled from origin/main"

# 2. Install server dependencies (prefer offline cache, skip redundant installs)
cd "$APP_DIR/server"
npm install --prefer-offline --no-audit
echo "✓ Server dependencies installed"

# 3. Install client dependencies
cd "$APP_DIR/client"
npm install --prefer-offline --no-audit
echo "✓ Client dependencies installed"

# 4. Build frontend for production
npm run build
echo "✓ Client production build complete"

# 5. Run Prisma migrations (safe — skips already-applied migrations)
cd "$APP_DIR/server"
if [ -f prisma/schema.prisma ]; then
  npx prisma migrate deploy
  echo "✓ Prisma migrations applied"
else
  echo "ℹ No Prisma schema found — skipping migrations"
fi

# 6. Restart the application via pm2 (reload keeps zero-downtime)
#    Falls back to start if the process doesn't exist yet.
if pm2 list | grep -q "shopsmart"; then
  pm2 reload shopsmart --update-env
  echo "✓ pm2 process reloaded (zero-downtime)"
else
  pm2 start "$APP_DIR/server/src/index.js" \
    --name shopsmart \
    --env production
  pm2 save
  echo "✓ pm2 process started and saved"
fi

echo "──────────────────────────────────────────"
echo "  Deploy complete ✅"
echo "──────────────────────────────────────────"
