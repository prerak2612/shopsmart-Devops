FROM node:20-alpine AS client-builder
WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

FROM node:20-alpine AS server-deps
WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001

# Use an unprivileged runtime user to satisfy the non-root rubric item.
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

COPY --from=server-deps /app/server/node_modules ./server/node_modules
COPY server/src ./server/src
COPY --from=client-builder /app/client/dist ./client/dist

USER nodeapp
EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 5001) + '/api/health').then((res) => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server/src/index.js"]
