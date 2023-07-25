# Projet top secret

## Environment variables

An example is provided in the file `.env.example`.
You have to rename it to `.env`, fill out the variables with the actual values and copy it to the `app` and `api` folders.

## Running the project

### Dev mode

#### Start the databases

```shell
docker compose -f ./docker-compose.dev.yml up postgres
```

#### Accept Stripe webhooks

```shell
stripe login
stripe listen --forward-to localhost:8080/webhook
```

#### In Docker

```shell
docker compose -f docker-compose.dev.yml up --build
```

#### On host

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

#### In Docker

```shell
docker compose up --build -d
```
