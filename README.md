# TechSocial - Gestão de pedidos
Mono-repo contendo o Front-end em ReactJs(NextJs) e (2 microsserviços - usuário e pedidos)back-end em NestJs.

# Rodar localmente
1. Primeiro é necessário rodar os banco de dados, para isso preparei um docker-compose na pasta raiz

```
sudo docker-compose up -d
```

*Caso der algum problema nesse passo é provável que as portas 5432, 8080 e/ou 3306 já estejam sendo usadas*

2. Instalar dependências do microsserviço usuário
*Ainda na mesma pasta back*
```
cd microsservice-users/
```
```
yarn
```

3. Rodar back-end microsserviço usuário localmente
```
yarn start
```
[**Nesse passo, a documentação desse microsserviço api, com Swagger**](http://localhost:3003/api)

4. Instalar dependências do microsserviço usuário
```
cd ..
```
```
cd microsservice-orders/
```
```
yarn
```
[**Nesse passo, a documentação desse microsserviço api, com Swagger**](http://localhost:3333/api)

5. Rodar back-end microsserviço pedido localmente
```
yarn start
```

6. Instalar dependências do front-end, agora é necessário ir para a pasta do front
```
cd ..
```
```
cd front/
```
```
yarn
```

7. Rodar front-end
```
yarn dev
```
[**Nesse passo, o front (incompleto) está rodando aqui**](http://localhost:3000/)

8. Rodar tests
Realizei uma cobertura de testes unitários em cada microsserviço.

Nas pastas **microsservice-orders/ e microsservice-users/**

Teste unitários:
```
yarn test:cov
```
