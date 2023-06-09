## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
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
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

[REST-CLIENT DOC](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Versões para esse curso
node: v.18.0
npm: 9.5.1

mysql no compose:
`docker-compose up -d db`

Yarn
`npm install --global yarn`

Nest cli
`npm i -g @nestjs/cli`

New project
`nest new nest-api`

# CONCEITOS FUNDAMENTAIS PARTE 1

Clico vida REQUEST

Em geral o ciclo de vida completo de uma solicitação em ordem é:

1. Incoming request
2. Globally bound middleware
3. Module bound middleware
4. Global guards
5. Controller guards
6. Route guards
7. Global interceptors (pre-controller)
8. Controller interceptors (pre-controller)
9. Route interceptors (pre-controller)
10. Global pipes
11. Controller pipes
12. Route pipes
13. Route parameter pipes
14. Controller (method handler)
15. Service (if exists)
16. Route interceptor (post-request)
17. Controller interceptor (post-request)
18. Global interceptor (post-request)
19. Exception filters (route, then controller, then global)
20. Server response

BOOTSTRAP

- modulo inicial do nest.js, arquivo src/main.ts, quem diz que o arquivo é esse é a config nest-cli.json

[TYPESCRIPT DECORATORS](https://www.typescriptlang.org/docs/handbook/decorators.html)
[NEST DECORATORS](https://docs.nestjs.com/openapi/decorators)

- mesmo conceito do decorator do python, faz umw wrapper e realizaçã ação antes ou depois de executar a função que esta invocando

MODULES

- Agrupa recursos (controller, services) e podem ser utilizado em outros modules e utilizar outros modules

CONTROLLER

- Mesmo conceito

[DTO](https://github.com/typestack/class-validator#validation-decorators)
tipos de dados inclusive com validação

Packages para auxilio de validaçõe do DTO
`yarn add class-validator class-transformer`

Recursos adicionais devem ser aplicados no bootstrap

VALIDATION PIPE

Permitir utilizar generics padronizados para o nest
`yarn add @nestjs/mapped-types`

# BD ORM PRISMA

configurando o PRISMA depois TYPEORM

`yarn add -D prisma`

`npx prisma`

configuração inicial, basicamente cria as envs no .env e uma pasta primsa com um schema
`npx prisma init`

`CREATE SCHEMA api ;`

mudar o driver no schema para mysql

prisma gerar arquivos, ele olha as tabelas no banco e gera
`npx prisma db pull`

`npx prisma generate`

Rodando migrate
`npx prisma migrate dev --name addBirthAt`
`npx prisma generate`

PIPE TRANSFORM

Pipes padrão do nest (built - in pipes)

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe
- ParseFilePipe

INTERCEPTORS

- antes ou apos uma intrução eu posso fazer algo a um método
- Posso utilizar dentro de um controller, um metodo ou de forma global no bootstrap

MIDDLAWARES

- FUNÇÕES que são chamadas ANTES de um manipulador de rotas
- Um middleware pode chamar outro
- Exclusivo a requisições http
- Necessario implementar NestModule no modulo que vai utilizar

GUARDS

- so terá uma responsabilidade, ideal para autenticação

Exceptions Filter

Param Decorators

Custom Decorators

JWT Conceitos básicos

composto 3 partes separados por ponto em base64
header - codifficado
payload - codificado
Signature - criptografado

Chaves reservadas

"iss": Esta chave que é a abreviação da palavra issuer serve para identificar o principal emissor do JWT e o seu uso é opcional.

"sub": Esta chave que é a abreviação da palavra subject serve para identificar o principal assunto do JWT e o emissor deve encarar esse valor como exclusivo, o uso é opcional.

"aud": Esta chave que é a abreviação da palavra audience serve para identificar o destinatário do token, o uso é opcional.

"exp": Esta chave que é a abreviação da expressão expiration time serve para identificar o tempo de expiração do token, o uso é opcional.

"nbf": Esta chave que é a abreviação da expressão not before serve para identificar o tempo de inicio da validade do token, seu uso é opcional.

"iat": Esta chave que é a abreviação da expressão issued at serve para identificar o momento da criação do token e assim saber qual a sua idade, o seu uso é opcional.

"jti": Esta chave que é a abreviação da expressão JWT ID serve para identificar de forma única um token, isso é útil para uma aplicação que possui mais de um emissor de tokens, o seu uso é opcional.

NEST JWT

`yarn add @nestjs/jwt`

IMPLEMENTANDO GUARD

como dito anteriormente, sua função é dizer se um manipulador de rota pode prosseguir ou nao

AUTORIZAÇÃO RBAC (ROLE BASED ACCESS CONTROL)
controle de acesso por meio de roles, utilizando estrategia de decorators e guard

CIRCULAR DEPENDECY
import { forwardRef } from '@nestjs/common';
forwardRef(() => AuthModule)
basicamente isso acontece qunado temos Dois modulos se chamando fazendo com que entrem em loop, para resolver basta adicinalo dentro da função forwardRef()

HASH PASSWORD com BCRYPT
`yarn add bcrypt`
`yarn add -D @types/bcrypt`

CORS

configuração fica no bootstrap do nest
app.enableCors();

posso passar configs por meio de oobjeto

RATE LIMIT

`yarn add @nestjs/throttler`

podemos ter configuração padrao e ajustar para cada handler ou classe
