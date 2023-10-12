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

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Application Requirements

This application has several requirements:

- A Posgresql database with tables User and Links

- Environment variables:

- NEWS_API_KEY (this can be gotten at https://www.thenewsapi.com)
- APP_API_KEY (this must match the front end key, but can be any secret)
- DATABASE_URL="postgresql://postgres@localhost/carallel" (the database url string)
- PORT=8080 (or any port number)
- JWT_SECRET (any random secret used to create the JWT)

## Documentation

All endpoints have an 'X-API-KEY' authentication guard.

### Users

#### POST /users
Authentication: Public
Takes an body object of {first_name: string, last_name: string, user_name: string, password: string} and creates a user.
#### GET /users/:id
Authentication: Bearer Token
Uses a parameter for the id of the user and returns the user

#### GET /users (unused)
Authentication: Bearer Token
Gets a list of users

#### PUT /users/:id (unused)
Authentication: Bearer Token
Uses a parameter for the id of the user with a body of changed fields and returns the user
#### DELETE /users/:id (unused)
Authentication: Bearer Token
Uses a parameter for the id of the user and deletes the user

### Links
#### POST /links
Authentication: Bearer Token
Takes an body object of {url: string, user_id: string} and creates a link with that user

#### GET /links/:id
Authentication: Bearer Token
Uses a parameter for the id of the user and returns a list of links

### Auth

#### POST /auth/login
Authentication: Public
Takes a body object of {user_name: string, password: string} and returns a user and JWT access token

### Articles

#### GET /articles
Authentication: Public
Gets a list of 12 of the lastest articles

#### GET /articles/related/:id
Authentication: Bearer Token
Gets a list of 6 of the related articles of the id of an article

#### GET /articles/:id
Authentication: Bearer Token
Gets a single article by parameter id
