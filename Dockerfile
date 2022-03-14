FROM node:16

WORKDIR /app

RUN npm install -g npm@latest

COPY package.json package-lock.json ./
RUN npm i

COPY . .

# Skip type check on build to save resources
RUN mv next.config.js next.config.js.base && \
  echo "module.exports={...require('./next.config.js.base'),typescript:{ignoreBuildErrors:true}}" >| next.config.js

ARG SENTRY_DSN
ARG SENTRY_URL
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_LOG_LEVEL=info

ENV SENTRY_DSN=$SENTRY_DSN
ENV SENTRY_URL=$SENTRY_URL
ENV SENTRY_ORG=$SENTRY_ORG
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ENV SENTRY_LOG_LEVEL=$SENTRY_LOG_LEVEL

ENV NEXT_PUBLIC_SENTRY_DSN=$SENTRY_DSN

RUN npm run build

ENTRYPOINT npm run start

