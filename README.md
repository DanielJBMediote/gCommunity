
# Forúm Web para Jogadores (GCommunity)

## Sobre

> Este projeto é dedicado ao meu Trabalho de Conclusão de Curso - TCC da UNESC.

O Projeto é elaborar uma página no estilo de Fórum que tenha o intuido de ajudar a comunidade de jogadores de diversas plataformas. O objetivo é criar um site, onde a comunidade possa criar post de dúvidas, sugestões e/ou dicas de diversos jogos.

## Tecnologias Utilizadas

Foram utilizada as sequintes tecnologias no projeto, o **Docker** e o **NojeJS** são os requerimentos mínimos.

- [NodeJS](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [AdonisJS](https://adonisjs.com/)
- [ReactJS](https://pt-br.reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Rodando o Projeto

### 1. Configurando a máquina

É nescessário ter o [NodeJS](https://nodejs.org/en/) instalado na máquina, para baixar é só seguir as instruções. Após a instalação, você já terá acesso aos comando npm.

> Para verificar se o Node está instalado na sua máquina, basta rodar o comando: `node --version`

### 2. Baixando o repositório

Para baixar os arquivos do Projeto, basta executar o comando abaixo dentro de uma pasta vazia.

```bash
git clone https://github.com/DanielJBMediote/projeto-tcc.git
```

### 3. Rodando o projeto

> Se já tiver instalado o banco de dados PostgreSQL na sua máquina. Basta rodar o banco de dados e depois iniciar o servidor e a web. Primeiramente, deve alterar a variavel do arquivo ./server/.env para `DB_HOST=database` (caso esteja rodando na maquina local `DB_HOST=localhost`)

Dentro da pasta *./server* execute o comando, para criar as tabelas no banco de dados e iniciar o servidor

```bash
adonis migration:refresh && adonis seed:sync && adonis serve
```

> O servidor irá iniciar em http:localhost:3333

Em sequencia, na pastar *./web* execute o comando

```bash
npm start
```

### 4. Rodando o projeto no Docker

No Docker é mais simpels, não necessáriamente precise do NodeJS, apenas do Docker, pois iniciaremos o projeto dentro de Conteiners (Máquinas Virtuais)

Na pasta raiz ./ execute o comando para criar as(os) imagens/serviços do projeto.

```bash
docker-compose build
```

e depois, após as imagens estiverem prontas, rode o comando para iniciar os serviços

 ```bash
 docker-compose up
 ```

> O servidor estará rodando na <http://localhost:3333>. A página eestará rodando na <http://localhost:3000>