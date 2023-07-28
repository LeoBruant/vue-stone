FROM node:18-alpine AS app_builder
WORKDIR /app

COPY app/package.json ./

RUN npm install

COPY app .

ARG VITE_API_URI
ARG VITE_STRIPE_PK
ARG VITE_SOCKET_URL

RUN npm run build

FROM node:18-alpine AS fixtures
WORKDIR /api

COPY api/package.json ./

RUN npm install

COPY api .

CMD npm run fixtures

FROM fixtures AS prod

COPY --from=app_builder /app/dist ./static

ENV PORT 8080
EXPOSE $PORT

CMD npm start
