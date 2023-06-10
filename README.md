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
