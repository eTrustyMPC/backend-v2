# Developer's Guide

We use Visual Studio Code for developing LoopBack and recommend the same to our
users.

## VSCode Setup

Install the following extensions:

- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
  - Available rules for markdown formatting: <https://github.com/DavidAnson/vscode-markdownlint#rules>

## Local Environment Setup

### Database

Install latest Postgres or run it using Docker:

```sh
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

## Third Web

### Auth

Backend auth integrated with ThirdWeb accounts. All user profiles must be created as [Embedded Wallets](https://portal.thirdweb.com/wallets/embedded-wallet/overview). User wallet keys is stored on client side: <https://portal.thirdweb.com/wallets/embedded-wallet/how-it-works>

- Custom JSON Web Token setup page: <https://thirdweb.com/dashboard/wallets/embedded>

#### JWKS

- Backend JWKS public key URL: <https://v2.api.etrusty.io/.well-known/jwks.json>
- JWKS `aud` value: `eTrusty`
- Backend JWT auth API: `/api/auth/login`, `/api/auth/whoAmI`

#### OIDC

- Custom auth OIDC config: <https://portal.thirdweb.com/wallets/embedded-wallet/custom-auth/configuration>
- Custom auth server setup: <https://portal.thirdweb.com/wallets/embedded-wallet/custom-auth/custom-jwt-auth-server>

### Engine

Docs: <https://portal.thirdweb.com/engine>

```sh
docker run --name thirdweb_engine -d \
  -e THIRDWEB_API_SECRET_KEY="" \
  -e ADMIN_WALLET_ADDRESS="" \
  -e POSTGRES_CONNECTION_URL="postgresql://postgres:postgres@host.docker.internal:5432/postgres?sslmode=disable" \
  -e ENABLE_HTTPS=true \
  -p 3005:3005 \
  --pull=always \
  --cpus="0.5" \
  thirdweb/engine:latest
```

Third Web engine uses Google Cloud KMS service: <https://portal.thirdweb.com/engine/backend-wallets#google-cloud-kms-wallet>

## Google Cloud

### CLI

Docs: <https://cloud.google.com/sdk/docs/install>

```sh
snap install google-cloud-cli --classic
gcloud init
gcloud auth login --no-launch-browser
```

## Development Workflow

### Visual Studio Code

1. Start the build task (Cmd+Shift+B) to run TypeScript compiler in the
   background, watching and recompiling files as you change them. Compilation
   errors will be shown in the VSCode's "PROBLEMS" window.

2. Execute "Run Rest Task" from the Command Palette (Cmd+Shift+P) to re-run the
   test suite and lint the code for both programming and style errors. Linting
   errors will be shown in VSCode's "PROBLEMS" window. Failed tests are printed
   to terminal output only.

### Other Editors/IDEs

1. Open a new terminal window/tab and start the continuous build process via
   `npm run build:watch`. It will run TypeScript compiler in watch mode,
   recompiling files as you change them. Any compilation errors will be printed
   to the terminal.

2. In your main terminal window/tab, run `npm run test:dev` to re-run the test
   suite and lint the code for both programming and style errors. You should run
   this command manually whenever you have new changes to test. Test failures
   and linter errors will be printed to the terminal.

3. To activate watch mode for "start" command use `npm run start:dev`.

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
