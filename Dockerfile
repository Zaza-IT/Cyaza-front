# Dockerfile front
FROM node:20-alpine AS base

# 1. Dependências
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilita telemetria durante o build
ENV NEXT_TELEMETRY_DISABLED 1

# Faz o build do projeto
RUN npm run build

# 3. Runner (Imagem final leve)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia os arquivos necessários do build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 4200

ENV PORT 4200
ENV HOSTNAME "0.0.0.0"

# Executa o servidor otimizado do Next
CMD ["node", "server.js"]