FROM node:14.15.4-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 3000

RUN chmod +x docker-entrypoint.sh
CMD ["./docker-entrypoint.sh"]