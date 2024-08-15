# My Wallet Backend

## Descrição

My Wallet Backend é uma API RESTful desenvolvida para gerenciar transações financeiras de usuários. Esta aplicação permite que os usuários registrem, visualizem, atualizem e excluam suas transações, além de fornecer um saldo atual baseado nas transações registradas. A API foi construída usando Node.js, Express, MongoDB, e JWT para autenticação.

## Funcionalidades

- **Autenticação de Usuários:**
  - Registro de novos usuários (`sign-up`).
  - Login de usuários existentes (`sign-in`) com geração de token JWT.

- **Gerenciamento de Transações:**
  - **Criação de Transações:** Permite que os usuários adicionem transações do tipo `deposit` ou `withdraw`.
  - **Visualização de Transações:** Lista as transações do usuário com suporte a paginação.
  - **Atualização de Transações:** Permite que os usuários atualizem suas próprias transações.
  - **Exclusão de Transações:** Permite que os usuários excluam suas próprias transações.

- **Consulta de Saldo:**
  - Calcula e retorna o saldo atual do usuário, considerando todas as transações registradas.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MongoDB**
- **JWT (JSON Web Token)**
- **Joi** para validação de dados
- **dotenv** para gerenciamento de variáveis de ambiente

## Instalação

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **MongoDB** (local ou remoto)
- **npm** ou **yarn**

### Passos para Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/felipe-bms/my-wallet-backend.git
   cd my-wallet-backend

2. **Instale as dependências:**
   ```bash
   npm install

3. **Configure as variáveis de ambiente:**
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
   ```bash
  PORT=5000
  DATABASE_URL=seu-endereco-da-database-mongo
  JWT_SECRET=sua-chave-secreta-jwt

4. **Inicie o servidor:**
   ```bash
   npm start

## Endpoints da API

### Autenticação

- **POST** `/sign-up` - Registro de novos usuários
- **POST** `/sign-in` - Login de usuários e obtenção de token JWT

### Transações

- **POST** `/transactions` - Criação de uma nova transação
- **GET** `/transactions?page=` - Visualização de transações com suporte a paginação
- **PUT** `/transactions/:id` - Atualização de uma transação existente
- **DELETE** `/transactions/:id` - Exclusão de uma transação

### Saldo

- **GET** `/balance` - Retorna o saldo atual do usuário

## Exemplos de Requisição

### Registro de Usuário

**POST** `/sign-up`

   ```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "securepassword123"
}

**POST** `/sign-in`

   ```json
    {
      "email": "jane.doe@example.com",
      "password": "securepassword123"
    }


### Criação de Transação (Rotas com Autenticação)

**POST (NEW TRANSACTION)** `/transactions`

   ```json
{
  "value": 100.50,
  "description": "Grocery shopping",
  "type": "withdraw"
}

**GET ALL CLIENT TRANSACTIONS** `/transactions`

**PUT (UPDATE TRANSACTION)** `/transactions/:id`

   ```json
{
  "value": 100.50,
  "description": "Grocery shopping",
  "type": "withdraw"
}

**DELETE TRANSACTION** `/transactions/:id`



### Consulta de Saldo

**GET** `/balance`

Resposta:

   ```json
{
  "balance": 500.00
}

## Estrutura do Projeto

```bash
├── src
│   ├── config
│   │   └── db.js            # Configuração da conexão com o MongoDB
│   ├── controllers
│   │   └── transactionController.js  # Lógica de negócios para transações
│   ├── middlewares
│   │   ├── authMiddleware.js  # Middleware para autenticação JWT
│   │   └── schemaValidator.js # Middleware para validação de schemas
│   ├── routes
│   │   ├── authRoutes.js      # Rotas de autenticação
│   │   └── transactionRoutes.js # Rotas de transações
│   ├── schemas
│   │   └── transactionSchema.js # Validação de transações usando Joi
│   └── app.js                 # Arquivo principal da aplicação
├── .env                       # Variáveis de ambiente
├── .gitignore
├── package.json
└── README.md

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

