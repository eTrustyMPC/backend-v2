# Developer's Guide

## VSCode Setup

Install the following extensions:

- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
  - Available rules for markdown formatting: <https://github.com/DavidAnson/vscode-markdownlint#rules>

## Local Environment Setup

### Environment Variables

```sh
cp .env.example .env
```

### Database

Install latest Postgres or run it using Docker:

```sh
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

### Third Web Engine

Docs: <https://portal.thirdweb.com/engine>

```sh
docker run --name thirdweb_engine \
  -e THIRDWEB_API_SECRET_KEY="" \
  -e ADMIN_WALLET_ADDRESS="" \
  -e POSTGRES_CONNECTION_URL="postgresql://postgres:postgres@host.docker.internal:5432/postgres?sslmode=disable" \
  -e ENABLE_HTTPS=true \
  -p 3005:3005 \
  --pull=always \
  --cpus="0.5" \
  thirdweb/engine:latest
```

## Development Workflow

## Gitflow

Each task must have a dedicated branch, forked from latest `dev` branch. Each completed task must be merged back to `dev` branch.

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/en) standard.

Each commit must be performed using [commitizen cli](https://commitizen-tools.github.io/commitizen/):

```sh
npm run commit
```

### Publishing Release

Each release must be performed using npm command:

```sh
npm run release
```

All releases are published into `main` branch.
