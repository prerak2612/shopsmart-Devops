#!/bin/bash
# deploy.sh — Idempotent EC2 deployment script for ShopSmart
#
# Called by GitHub Actions via SSH on every push to main.
# Safe to re-run at any time — all steps are idempotent.

set -euo pipefail

# ── Config ───────────────────────────────────────────────────────────────────
APP_DIR="${APP_DIR:-/home/ubuntu/shopsmart}"
REPO_URL="${REPO_URL:-https://github.com/prerak2612/shopsmart-Devops.git}"
NODE_ENV="${NODE_ENV:-production}"
PORT="${PORT:-5001}"
PM2_APP_NAME="shopsmart"

echo "══════════════════════════════════════════"
echo "  ShopSmart Deploy"
echo "  Time : $(date -u '+%Y-%m-%dT%H:%M:%SZ')"
echo "  Dir  : $APP_DIR"
echo "  Node : $(node --version 2>/dev/null || echo 'not found')"
echo "  npm  : $(npm --version 2>/dev/null || echo 'not found')"
echo "  pm2  : $(pm2 --version 2>/dev/null || echo 'not found')"
echo "══════════════════════════════════════════"

# ── Step 1: Clone or pull ─────────────────────────────────────────────────────
echo ""
echo "▶ Step 1: Sync code"

# Create parent dir if it doesn't exist (idempotent)
mkdir -p "$(dirname "$APP_DIR")"

if [ -d "$APP_DIR/.git" ]; then
  echo "  → Repo exists — pulling latest from main"
  cd "$APP_DIR"
  git fetch --all --prune
  git checkout main
  git reset --hard origin/main
else
  echo "  → Repo missing — cloning from $REPO_URL"
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
  git checkout main
fi

echo "  ✓ Code is at commit: $(git rev-parse --short HEAD)"

# ── Step 2: Install server dependencies ──────────────────────────────────────
echo ""
echo "▶ Step 2: Install server dependencies"
cd "$APP_DIR/server"
npm install --no-audit --prefer-offline
echo "  ✓ Server node_modules ready"

# ── Step 3: Install client dependencies ──────────────────────────────────────
echo ""
echo "▶ Step 3: Install client dependencies"
cd "$APP_DIR/client"
npm install --no-audit --prefer-offline
echo "  ✓ Client node_modules ready"

# ── Step 4: Build frontend ────────────────────────────────────────────────────
echo ""
echo "▶ Step 4: Build frontend for production"
cd "$APP_DIR/client"
npm run build
echo "  ✓ Frontend build complete → client/dist/"

# ── Step 5: Prisma migrations (skip if no schema) ────────────────────────────
echo ""
echo "▶ Step 5: Database migrations"
cd "$APP_DIR/server"
if [ -f "prisma/schema.prisma" ]; then
  npx prisma migrate deploy
  echo "  ✓ Prisma migrations applied"
else
  echo "  ℹ No prisma/schema.prisma found — skipping"
fi

# ── Step 6: Start / reload via PM2 ───────────────────────────────────────────
echo ""
echo "▶ Step 6: PM2 process management"
cd "$APP_DIR/server"

# Check if process already exists in pm2
if pm2 describe "$PM2_APP_NAME" > /dev/null 2>&1; then
  echo "  → Process '$PM2_APP_NAME' exists — reloading (zero-downtime)"
  PORT=$PORT NODE_ENV=$NODE_ENV pm2 reload "$PM2_APP_NAME" --update-env
else
  echo "  → Process '$PM2_APP_NAME' not found — starting fresh"
  PORT=$PORT NODE_ENV=$NODE_ENV pm2 start src/index.js \
    --name "$PM2_APP_NAME" \
    --log "$APP_DIR/logs/app.log" \
    --error "$APP_DIR/logs/error.log" \
    --time
  pm2 save
fi

echo "  ✓ PM2 process is running"

# ── Step 7: Verify deployment ─────────────────────────────────────────────────
echo ""
echo "▶ Step 7: Verify deployment"

# Wait up to 10 seconds for the server to come up
for i in 1 2 3 4 5; do
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/api/health" || echo "000")
  if [ "$HTTP_STATUS" = "200" ]; then
    echo "  ✓ Health check passed (HTTP $HTTP_STATUS)"
    break
  fi
  echo "  … waiting for server (attempt $i/5, got HTTP $HTTP_STATUS)"
  sleep 2
done

if [ "$HTTP_STATUS" != "200" ]; then
  echo "  ✗ Health check failed after 5 attempts — showing PM2 logs:"
  pm2 logs "$PM2_APP_NAME" --lines 30 --nostream
  exit 1
fi

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════"
pm2 list
echo ""
echo "  Deploy complete ✅"
echo "  App running at http://localhost:$PORT"
echo "══════════════════════════════════════════"
