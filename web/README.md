# Documentação web

### Inicializando o projeto

Para inicializar o projeto, execute os seguintes comandos no terminal na pasta raiz:

- `npm install`: Baixe as dependências do projeto.
- `npm run build`: Compile o projeto.
- `npm start`: Inicialize o servidor web.

### Interfaces

##### Endereço do servidor: http://localhost:5173/

![alt text](/web/public/signIn.png)

- **Email:** admin@email.com
- **Senha:** admin123

---

##### Endereço do servidor: http://localhost:5173/home

![alt text](/web/public/home.png)

- No menu esquerdo, um botão `Alunos` que abre a tela com:
  - Uma caixa de texto para buscar alunos pelo nome, cpf ou registro acadêmico.
  - Um botão `Cadastrar Aluno` para abrir a tela de cadastro.
  - Uma lista de alunos com os seguintes campos:
    - `Registro Acadêmico`
    - `Nome`
    - `Email`
    - `CPF`
  - Botões `Editar` e `Excluir` para cada aluno na lista, que abrem a tela para editar ou excluir o aluno respectivamente.
  - A lista é ordenada por `Registro Acadêmico`, `Nome` ou `CPF` clicando nos cabeçalhos das colunas.
    ![alt text](/web/public/formStudents.png)
  - Caso clique no botão `Editar` ou `Cadastrar Aluno` abrirá um formulário com os seguintes campos:
    - `Nome`
    - `Email`
    - `Registro Acadêmico`
    - `CPF`
    - Caso seja edição, os campos estarão preenchidos com os dados do aluno.
    - Caso seja cadastro, os campos estarão vazios.

![alt text](/web//public/delete.png)

- Caso clique no botão `Excluir` abrirá um modal com a seguinte mensagem:
  - `Você tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita`
