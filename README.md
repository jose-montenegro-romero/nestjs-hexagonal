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

## Docker compose commands for localstack

docker compose --file docker-compose-localstack.yaml up -d
docker ps
docker-compose down


## LocalStack Commands

### Estado de localstack:

`http://localhost:4566/_localstack/health`

### Listar tablas de Dynamodb:

`aws dynamodb list-tables --endpoint-url http://localhost:4566`

Puedes hacer consultas usando scan para obtener todos los elementos:

`
aws dynamodb scan \
--endpoint-url http://localhost:4566 \
--table-name products
`

O puedes realizar una consulta query para obtener un elemento específico según la clave primaria:

`
aws dynamodb query \
--endpoint-url http://localhost:4566 \
--table-name products \
--key-condition-expression "id = :id" \
--expression-attribute-values '{":id":{"S":"1"}}'
`

### Crear tabla de dynamodb para Products

`
aws dynamodb create-table \
--endpoint-url http://localhost:4566 \
--table-name products \
--attribute-definitions AttributeName=id,AttributeType=S \
--key-schema AttributeName=id,KeyType=HASH \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
`
### Agregar datos a la tabla Products
`
aws dynamodb put-item \
--endpoint-url http://localhost:4566 \
--table-name products \
--item '{
"id": {"S": "1"},
"name": {"S": "Chocorramo"},
"price": {"N": "100"},
"description": {"S": "Producto de prueba 1"}
}'
`

`
aws dynamodb put-item \
--endpoint-url http://localhost:4566 \
--table-name products \
--item '{
"id": {"S": "2"},
"name": {"S": "Gansito"},
"price": {"N": "200"},
"description": {"S": "Producto de prueba 2"}
}'
`