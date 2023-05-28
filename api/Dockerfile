FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

FROM node:18-alpine AS dev
WORKDIR /app

ARG USER=1000
ARG GROUP=1000

USER $USER:$GROUP

CMD npm install && npm run dev

FROM node:18-alpine AS prod
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

CMD npm start
