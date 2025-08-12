# Projeto Esperança - Painel de Admin e Backend

Este projeto envolve **três principais componentes**:

1. **Backend**: API construída com **Node.js**.
2. **Admin Panel**: Interface de administração construída com **React e Bootstrap**.
3. **Frontend**: Estrutura de páginas utilizando **HTML e CSS**.

---

## Tecnologias Usadas

- **Backend**: Node.js, Express, Mongoose (MongoDB)
- **Admin Panel**: React, Bootstrap, Axios
- **Frontend**: HTML, CSS (sem frameworks)

---

## Estrutura do Projeto

/projeto-esperanca
├── /backend # Backend em Node.js
├── /admin-panel # Painel de administração (React)
└── /frontend # Frontend (HTML, CSS)

yaml
Copiar

---

## Instalação e Configuração


## 1. Clonar o Repositório

```bash
git clone https://github.com/uceD3tec/projeto_esperanca.git
cd projeto-esperanca
```

---

## 2. Configuração do Backend (Node.js)

### Passo 1 – Acessar a pasta do backend

```bash
cd backend
```

### Passo 2 – Instalar dependências

* Caso não possua o **Node.js**, instale a versão mais recente.
* Depois, instale as dependências:

```bash
npm install
```

### Passo 3 – Configurar banco de dados

Crie um arquivo `.env` dentro da pasta **backend** com o seguinte conteúdo:

```
MONGODB_URI=mongodb://localhost:27017/projeto_esperanca
JWT_SECRET=seu-segredo
```

### Passo 4 – Iniciar servidor

```bash
npm start
```

O backend estará disponível em:
**[http://localhost:3000](http://localhost:3000)**

---

## 3. Configuração do Admin Panel (React)

### Passo 1 – Acessar a pasta

```bash
cd admin-panel
```

### Passo 2 – Instalar dependências

* Caso ainda não possua **Node.js** e **npm**, instale-os.
* Instale as dependências:

```bash
npm install
```

### Passo 3 – Iniciar o painel

```bash
npm run dev
```

O painel será aberto em:
**[http://localhost:5173](http://localhost:5173)**

---

## 4. Frontend (HTML/CSS)

A pasta **frontend** contém páginas estáticas.
Para visualizar:

1. Abra a pasta `frontend`.
2. Dê um duplo clique no arquivo **index.html**.

---

## 5. Utilizando o Sistema

### 5.1 – Autenticação de Admin

No **Admin Panel**, será solicitado login:

* **Usuário:** nome do administrador
* **Senha:** senha do administrador

Após autenticar, você terá acesso ao painel.

---

## 6. Rotas da API Backend

### 6.1 – Login do Admin

**POST** `http://localhost:3000/api/admin/login`
**Body (JSON):**

```json
{
  "username": "admin",
  "password": "senha"
}
```

**Resposta:**

```json
{
  "token": "seu-token-aqui"
}
```

---

### 6.2 – Criar Conteúdo

**POST** `http://localhost:3000/api/content`
**Headers:**

```
Authorization: Bearer <seu-token>
```

**Body (form-data):**

* `contentName`: Nome do conteúdo
* `description`: Descrição
* `section`: Ex. HOME, PROJETOS
* `image`: Arquivo (opcional)

---

### 6.3 – Atualizar Conteúdo

**PUT** `http://localhost:3000/api/content/:id`
Headers e body iguais ao criar.

---

### 6.4 – Deletar Conteúdo

**DELETE** `http://localhost:3000/api/content/:id`
**Headers:**

```
Authorization: Bearer <seu-token>
```

---

### 6.5 – Obter Conteúdos por Seção

**GET** `http://localhost:3000/api/content/:section`
**Headers:**

```
Authorization: Bearer <seu-token>
```

---

### 6.6 – Obter Publicações do Instagram

**GET** `http://localhost:3000/api/instagram/posts`
**Resposta (exemplo):**

```json
[
  {
    "link": "https://www.instagram.com/p/DMEopj6MUJI/",
    "img": "https://scontent.cdninstagram.com/..."
  },
  {
    "link": "https://www.instagram.com/reel/DL-DVf8OEs2/",
    "img": "https://scontent.cdninstagram.com/..."
  }
]
```

> Retorna todas as publicações do Instagram do Projeto Esperança.

---

## 7. Testando as Requisições (Postman ou cURL)

### Exemplo – Login

```bash
curl -X POST http://localhost:3000/api/admin/login \
-H "Content-Type: application/json" \
-d '{"username": "admin", "password": "admin123"}'
```

### Exemplo – Criar Conteúdo

```bash
curl -X POST http://localhost:3000/api/content \
-H "Authorization: Bearer seu-token-aqui" \
-F "contentName=Novo conteúdo" \
-F "description=Descrição do conteúdo" \
-F "section=HOME" \
-F "image=@caminho/para/imagem.png"
```

---

