FROM node:16

WORKDIR /app

ARG NODE_OPTIONS
ARG SENTRY_DSN
ARG SENTRY_URL
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN

EXPOSE $PORT

RUN npm install -g npm@latest

COPY package.json package-lock.json ./
RUN npm i

COPY . .

# Skip type check on build to save resources
RUN mv next.config.js next.config.js.base && \
  echo "module.exports={...require('./next.config.js.base'),typescript:{ignoreBuildErrors:true}}" >| next.config.js

RUN SENTRY_DSN=${SENTRY_DSN} \
    SENTRY_URL=${SENTRY_URL} \
    SENTRY_ORG=${SENTRY_ORG} \
    SENTRY_PROJECT=${SENTRY_PROJECT} \
    SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN} \
    npm run build

CMD ["npm", "run", "start"]
