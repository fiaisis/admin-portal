FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /application

COPY package.json yarn.lock tsconfig.json /application
RUN yarn --frozen-lockfile

COPY src /application/src
COPY public /application/public
COPY node_modules /application/node_modules

FROM base AS builder
WORKDIR /application

ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn run build


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /application

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=deps --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

# to run the container indefinitely 
# CMD tail -f /dev/null
CMD yarn start
