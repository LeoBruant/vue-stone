FROM node:18-alpine AS app_builder
WORKDIR /app

COPY app/package.json ./

RUN npm install

COPY app .

ARG VITE_API_URI
ARG VITE_STRIPE_PK

RUN npm run build

FROM node:18-alpine AS prod
WORKDIR /api

COPY api/package.json ./

RUN npm install

COPY api .
COPY --from=app_builder /app/dist ./static

ENV PORT 8080
EXPOSE $PORT

CMD npm start
