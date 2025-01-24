## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## References link

https://medium.com/@pranavubarhande3/dockerizing-nestjs-server-with-prisma-orm-and-postgresql-database-using-docker-63bf6d8c652b

## Docker commands

docker build -t nestjs-app:latest .
docker run -p 3000:3000 nestjs-app:latest

## Docker compose commands

docker-compose up -d
docker ps
docker-compose down