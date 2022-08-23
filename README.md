# BEM AMIGOS DA REDE GITHUB ... ⚽️ #

## Trybe Futebol Club ##

Esse projeto consiste de uma aplicação fullstack

### Como utilizar ###

- clonar o repositório 

- rodar o comando `npm install`

- rodar o comando `npm run postinstall`  // executa o npm install dentro das pastas frontend e backend

- rodar o comando `npm run compose:up` // para que o docker-compose faça o up da aplicação

O frontend pode ser acessado em `http://localhost:3000`

O backend pode ser acessado em `http://localhost:3001`

### Tecnologias utilizadas ###

O backend foi desenvolvido utilizando Node com Express e TypeScrypt aplicando alguns dos principios SOLID e o sequelize como ORM. 
Ainda foram utilizadas as bibliotecas JWT para geração de token, bcrypt para salvar a senha encryptada no banco de dados e joi para validações.

O frontend foi desenvolvido em react pela Trybe.

### Rotas ###

- POST /login

Essa rota permite o usuário logar. E é esperado que seja passado no corpo da requisicão um JSON como mostra o exemplo:

```
{
  "email": "admin@admin.com",
  "password": "secret_admin"
}
```

E o retorno é um token com status 200.

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjEyOTEyNDQsImV4cCI6MTY2Mzg4MzI0NH0.4iRnrMwEuEBXePFs1ThI8nqbdNFKgkKlik_zPBD-CJk"
}
```

- GET /login/validate

Essa rota permite ter acesso ao `role` do usuário. É esperado que seja passado um token no headers, como mostra o exemplo: 

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjA4MjIyNjEsImV4cCI6MTY2MzQxNDI2MX0.Kcpg5WGH6avfhk5hzSbTKCCJrC9G8YtA_iWCER96KM8
```

E o retorno é um JSON com o status 200.

```
{
    "role": "admin"
}
```

- GET /teams

Essa rota permite listar todos os times cadastrados e o retorno é o JSON com status 200.

```
[
    {
        "id": 1,
        "teamName": "Avaí/Kindermann"
    },
    {
        "id": 2,
        "teamName": "Bahia"
    },
    {
        "id": 3,
        "teamName": "Botafogo"
    }
    ...
]
```

- GET /teams/:id 

Essa rota permite buscar um time pelo seu id. E retorna um JSON com status 200 ao fazer a seguinte requisição `http://localhost:3001/teams/1`

```
{
    "id": 1,
    "teamName": "Avaí/Kindermann"
}
```

- GET /matches

Essa rota permite listar todas as partidas, o retorno dessa requisição é um JSON como mostra o exemplo abaixo e o status 200.

```
[
    {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "São Paulo"
        },
        "teamAway": {
            "teamName": "Grêmio"
        }
    },
    {
        "id": 2,
        "homeTeam": 9,
        "homeTeamGoals": 1,
        "awayTeam": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Internacional"
        },
        "teamAway": {
            "teamName": "Santos"
        }
    },
    {
        "id": 3,
        "homeTeam": 4,
        "homeTeamGoals": 3,
        "awayTeam": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Corinthians"
        },
        "teamAway": {
            "teamName": "Napoli-SC"
        }
    }
    ...
]
```

- POST /matches 

Essa rota permite criar uma nova partida de futebol. É esperado que seja passado um token via headers e no corpo da requisição um JSON 

```
{
  "homeTeam": 1,
  "awayTeam": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}
```

E o retorno esperado é um JSON com o status 201

```
{
    "id": 1,
    "homeTeam": 1,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true
}
```
 ⚠️ Não é permitido criar uma partida com um time jogando contra ele mesmo
 ⚠️ Não é permitido criar uma partida com um time inexistente 

- PATCH /matches/:id/finish

Essa rota permite atualizar o status de um jogo em andamento para finalizado. É esperado que o id da partida seja passado na url e um token via headers

O retorno é um JSON com o status 200 

```
{
    "message": "Finished"
}
```

- PATCH /matches/:id 

Essa rota permite atualizar a quantidade de gols marcados em uma partida. É esperado que seja passado um JSON no corpo da requisição com o seguinte formato

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

O retorno é um JSON com status 200 

```
{
    "message": "Updated!"
}
```

- GET /leaderboard/home

Essa rota permite listar a tabela de classificação de todos os times quando em que foram mandates. O retorno é um JSON com o status 200.

```
[
    {
        "name": "Palmeiras",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 7,
        "goalsOwn": 0,
        "goalsBalance": 7,
        "efficiency": 100
    },
    {
        "name": "Corinthians",
        "totalPoints": 6,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 6,
        "goalsOwn": 2,
        "goalsBalance": 4,
        "efficiency": 66.67
    },
    {
        "name": "Internacional",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 3,
        "goalsOwn": 0,
        "goalsBalance": 3,
        "efficiency": 100
    }
]
```

- GET /leaderboard/away 

Essa rota permite listar a tabela de classificação de todos os times quando em que foram visitantes. O retorno é um JSON com o status 200.

```
[
    {
        "name": "Palmeiras",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 7,
        "goalsOwn": 0,
        "goalsBalance": 7,
        "efficiency": 100
    },
    {
        "name": "Corinthians",
        "totalPoints": 6,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 6,
        "goalsOwn": 2,
        "goalsBalance": 4,
        "efficiency": 66.67
    },
    {
        "name": "Internacional",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 3,
        "goalsOwn": 0,
        "goalsBalance": 3,
        "efficiency": 100
    }
]
```

- GET /leaderboard

Essa rota permite listar a tabela de classificação geral dos times. O retorno esperado é um JSON com status 200.

```
[
    {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": 86.67
    },
    {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": 80
    },
    {
        "name": "Internacional",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 9,
        "goalsOwn": 6,
        "goalsBalance": 3,
        "efficiency": 80
    }
]
```

