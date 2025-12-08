# Estágio de Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install --frozen-lockfile --production=false

COPY . .

# Supressão de warnings no build
ENV NODE_OPTIONS="--no-warnings"
ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn build

# Estágio de Produção
FROM node:20-alpine AS runner

RUN addgroup --system --gid 1001 nextjs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN chown -R nextjs:nextjs /app

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

USER nextjs

CMD ["yarn", "start"]
