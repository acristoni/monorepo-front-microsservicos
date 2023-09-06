# TechSocial - Gestão de pedidos
Mono-repo contendo o Front-end em ReactJs(NextJs) e (2 microsserviços - usuário e pedidos)back-end em NestJs.

# Subir aplicação localmente
Rode o comando para subir todos os containeres da aplicação

```
sudo docker-compose up --build
```
[**Documentação microsserviço usuário, com Swagger**](http://localhost:3003/api)
[**Documentação microsserviço pedido, com Swagger**](http://localhost:3333/api)

# Testes
Realizei uma cobertura de testes unitários em cada microsserviço.

Nas pastas **microsservice-orders/ e microsservice-users/**

Teste unitários:
```
yarn test:cov
```
