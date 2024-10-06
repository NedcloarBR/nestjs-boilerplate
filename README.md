<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript custom starter boilerplate repository.

### Changes

- [`Fastify`](https://fastify.dev/) instead of [Express](https://expressjs.com/)
- [`@nestjs/config`](https://docs.nestjs.com/techniques/configuration) Module initialized
- [`nestjs-prisma`](https://nestjs-prisma.dev/) Module initialized
- `class-validator`, `class-transformer` and `ValidationPipe` [configured](https://docs.nestjs.com/techniques/validation)
- [`BiomeJS`](https://biomejs.dev) configured with `@nedcloarbr/biome-config` instead of [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- [`@nestjs/swagger`](https://docs.nestjs.com/openapi/introduction) Configured
- [`@nestjs/terminus`](https://docs.nestjs.com/recipes/terminus) Health checks for `api` and `prisma`
- [`Vitest`](https://vitest.dev/) with Vitest UI and coverage-v8 instead of [Jest](https://jestjs.io/)
- [`nestjs-otel`](https://github.com/pragmaticivan/nestjs-otel)/[`Open Temeletry`](https://github.com/pragmaticivan/nestjs-otel-prom-grafana-tempo) Pre-configured
- [`Docker`](https://www.docker.com/) compose file


## Installation

```bash
# install packages
$ yarn install

# initialize prisma client and sync with database
$ yarn prisma migrate dev
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:coverage
```

## Using Docker

```bash
# Start container
$ docker compose up -d

# View logs
$ docker compose logs -f
```

## Viewing Metrics

- Swagger: `http://localhost:9000/docs`
- Grafana: `http://localhost:3000`

> [!Warning]
> PORTS THAT CANNOT BE USED IN THIS PROJECT \
> \
> Metrics API(`src/lib/metrics.ts`) \
> `8081` -> OtelSDK \
> \
> Metrics otel-collector(`docker-compose.metrics.yml`) \
> `1888` -> pprof extension  \
> `8888` -> Prometheus metrics exposed by the collector  \
> `8889` -> Prometheus exporter metrics  \
> `13133` -> health_check extension \
> `4317` -> OTLP gRPC receiver \
> `4318` -> OTLP HTTP receiver \
> `55679` -> zpages extension \
> \
> Metrics tempo(`docker-compose.metrics.yml`) \
> `14268` -> jaeger ingest \
> `3200` -> tempo \
> `4317` -> otlp grpc \
> `4318` -> otlp http \
> `9411` -> zipkin \
> \
> Metrics loki(`docker-compose.metrics.yml`) \
> `3100` -> loki \
> \
> Metrics prometheus(`docker-compose.metrics.yml`) \
> `9090` -> prometheus 

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author
  - NestJS [Kamil Myśliwiec](https://kamilmysliwiec.com)
  - Boilerplate [NedcloarBR](https://github.com/NedcloarBR)
- Website
  - NestJS [https://nestjs.com](https://nestjs.com/)
  - Boilerplate [NedcloarBR](https://github.com/NedcloarBR)
- Twitter
  - NestJS [@nestframework](https://twitter.com/nestframework)
  - Boilerplate [@BrNedcloar](https://twitter.com/BrNedcloar)

## License

Nest is [MIT licensed](LICENSE).
