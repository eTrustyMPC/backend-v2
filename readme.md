# eTrusty Backend (v2)

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Initial setup for developer

See [DEVELOPING.md](./DEVELOPING.md)

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

On server:

```sh
npm start
```

During development:

```sh
npm run start:dev
```

You can also run `node .` to skip the build step.

Open <http://127.0.0.1:3000> in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

```sh
npm run test
```

## Run migrations

```sh
npm run migrate
```

## Modules

- CRUD:
  - API Component: <https://www.npmjs.com/package/loopback-component-crud>
  - REST Package: <https://github.com/loopbackio/loopback-next/tree/master/packages/rest-crud>
- Third Web Supabase Auth: <https://github.com/thirdweb-example/thirdweb-auth-supabase>
- Migration: <https://github.com/nflaig/loopback4-migration#update-directory-and-naming-convention>

## Links

- Full auth setup example for Loopback 4: <https://loopback.io/doc/en/lb4/migration-auth-access-control-example.html>
- How to create custom CRUD connector: <https://github.com/loopbackio/loopback-datasource-juggler/blob/master/docs/datasource-connector.md>

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
