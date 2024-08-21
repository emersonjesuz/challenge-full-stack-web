# Modulo academico - API

## Como rodar a API

#### Banco [postgres]

Na raiz do projeto tem o `script.sql` com os comandos para criar o banco e suas tabelas. Nesse script tambem tem um comando para inserir um usuario admin com email e senha, que deve ser executado para que o login funcione.

- `email`: admin@email.com
- `password`: admin123

### Ambiente

Na raiz do projeto tem um arquivo `example.env` com as variaveis de ambiente necessarias para a conexao com o banco e para gerar a seguranca para o JWT. E obrigatorio que adicione as variaveis ambiente ao `.env`

### Inicializar Api

Para inicializar a api é necessário executar o seguinte comando no terminal na raiz do projeto:

- Execute `npm install` para instalar as dependências do projeto.
- Execute `npm run build` para compilar o projeto com tsc.
- Execute `npm start` para inicializar o projeto.

## Endpoints

### Usuario

#### [POST] /signIn

##### Body

- `email`: string - email do usuario
- `password`: string - senha do usuario

##### Response

caso de sucesso

- `token`: string - token jwt para ser enviado como autorização

caso de erro

- `message`: string - mensagem do erro

### Informações adicionais

Para acessar as rotas da api a seguir é necessário enviar um token retornado no login por bearer token. Exemplo:

- Header:
  - Authorization: Bearer token_retornado_no_login

### Alunos

#### [POST] /students

Cria um novo aluno

##### Body

- `nome`: string - nome do aluno
- `email`: string - email do aluno
- `cpf`: string - cpf do aluno
- `registrationNumber`: number - registro academico do aluno

##### Response

caso de sucesso

- `id`: number - id do aluno
- `nome`: string - nome do aluno
- `email`: string - email do aluno
- `cpf`: string - cpf do aluno
- `registrationNumber`: string - registro academico do aluno

caso de erro

- `message`: string - mensagem do erro

#### [GET] /students

Busca todos os alunos, ordenar ou filtrar

##### Query

- `by`: "name" | "cpf" | "registrationNumber" - campo pelo qual deseja fazer a ordenação
- `type`: "ASC" | "DESC" - tipo de ordenação
- `search`: string - fazer busca na lista de aluno por name, cpf ou registro academico

##### Response

caso de sucesso

- `alunos`: array - lista de alunos

caso de erro

- `message`: string - mensagem do erro

#### [GET] /students/:registrationNumber

Busca um aluno por registro academico

##### Response

caso de sucesso

- `aluno`: object - aluno

caso de erro

- `message`: string - mensagem do erro

#### [PUT] /students/:registrationNumber

Atualiza um aluno

##### Body

- `nome`: string - nome do aluno
- `email`: string - email do aluno

##### Response

caso de sucesso

- `aluno`: object - aluno

caso de erro

- `message`: string - mensagem do erro

#### [DELETE] /students/:registrationNumber

Deleta um aluno

##### Response

caso de sucesso

- `mensagem`: object - aluno

caso de erro

- `message`: string - mensagem do erro
