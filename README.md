# Projet top secret

## Running the project

### Dev mode

#### In Docker

```shell
docker compose -f docker-compose.dev.yml up --build
```

#### On host

Open two terminal to run these commands concurrently:

```shell
npm run dev -w api
npm run dev -w app
```

### Production mode

#### In Docker

```shell
docker compose up --build -d
```

#### Start Postgres

```shell
docker compose -f .\docker-compose.dev.yml up postgres
```