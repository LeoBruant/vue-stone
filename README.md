# Projet top secret

## Environment variables

An example is provided in the file `.env.example`.
You have to copy, rename it to `.env` and copy it to the `app` and `api` folders.

## Running the project

### Dev mode

#### Start the databases

```shell
docker compose -f docker-compose.dev.yml up postgres mongo -d
```

#### Accept Stripe webhooks

This is required only in development mode to receive Stripe events.

```shell
stripe login
stripe listen --forward-to localhost:8080/api/webhook
```

#### Run the fixtures

This will add the initial data in Postgres and Mongo so that the application can be used.

Also a default admin user will be created using the credentials provided by the environment variables `INIT_EMAIL` and `INIT_PASSWORD`. Check `.env.example` for an example on how to set them up.

```shell
npm run -w api fixtures
```

#### In Docker

> Running the project in Docker in dev mode is not up-to-date. It is recommended to run it on the host machine.

```shell
docker compose -f docker-compose.dev.yml up --build
```

#### On host

The project uses [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

1. Install dependencies:

   ```shell
   npm --workspaces install
   ```

2. Open two terminal to run these commands concurrently:

   ```shell
   npm run dev -w api
   npm run dev -w app
   ```

### Production mode

This is a production-like setup, the actual production runs behind a Traefik proxy, as such, the actual configuration differs a bit from this sample.

In order for the production docker-compose file to work, you must have an `.env` file at the root of the project containing all app, api and fixtures variables.

#### In Docker

```shell
docker compose up --build -d
```
