FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /application

COPY package.json yarn.lock tsconfig.json /application
RUN yarn --frozen-lockfile


FROM base AS builder
WORKDIR /application

ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn run build


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /application

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=deps src /application/src
COPY --from=deps public /application/public
EXPOSE 3000
ENV PORT=3000

# to run the container indefinitely 
# CMD tail -f /dev/null
CMD yarn start
