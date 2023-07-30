## Temp config (dev)

Crie um arquivo de nome `.env` na raiz do projeto. 

Acesse o [card no Trello](https://trello.com/c/uItOzG6b) e coloque o token de acesso no arquivo .env:

```TOKEN=[token]```.

Substitua `[token]` pelo token encontrado no card.

#

Para comunicar com o backend, realize a configuração abaixo:

No arquivo `utils/constants.ts`, mude o valor da variável `API_URL` para:

```JS
export const API_URL = 'http://localhost:8080/api';
```

#

