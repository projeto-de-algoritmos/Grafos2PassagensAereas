# Grafos2PassagensAereas

**Número da Lista**: 22<br>
**Conteúdo da Disciplina**: Kruskal<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 17/0013987 |  João Victor de Oliveira Matos |
| 17/0011119  |  Geraldo Victor Alves Barbosa |

## Sobre 
Kruskal é um jovem mochileiro que deseja saber quanto seria o menor valor que ele gastaria em passagens aéreas para visitar todos os países da europa que ele tem vontade de conhecer, com isso o projeto tem o objetivo de ajudar esse viajante. Nosso projeto permite que o viajante escolha os países que deseja visitar e seu país de origem, todos os valores de passagens são gerados aleatóriamente, pois não conseguimos acesso a nenhuma api que fosse gratuita para consultar o valor das passagens. Após a escolha do país de origem e todos os países de destino é gerado um grafo onde é possível ter uma noção visual de todos os países que ele vistaria e o custo envolvido em cada viagem e custo total.

## Screenshots
![Tela Vazia](./screenshots/Screenshot%20from%202022-12-05%2010-57-19.png)
![Preenchimento campos](./screenshots/Screenshot%20from%202022-12-05%2010-56-15.png)
![Resultado](./screenshots/Screenshot%20from%202022-12-05%2010-56-53.png)

## Instalação 
**Linguagem**: Javascript<br>
**Framework**: React<br>
É necessário ter o node instalado na máquina para rodar o projeto.
Para instalar as dependências do projeto execute os seguintes comandos.

`cd passagens_aereas`

`npm install`

Para rodar o projeto execute o seguinte comando:

`npm run dev`

Clique no link 
http://localhost:5173/

## Uso 
Escolha o país de origem e clique em adicionar, em seguida escolha os países de destino e clique em adicionar para cada país desejado, quando terminar os países de destino clique em gerar passagens. Em seguida será exibido o custo total e um grafo que exibe o resultado (o grafo permite interação para melhor visualização).





