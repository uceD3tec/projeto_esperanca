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

### 1. Clone o Repositório

Primeiro, clone o repositório para a sua máquina local:

```bash
git clone https://github.com/uceD3tec/projeto_esperanca.git
cd projeto-esperanca
2. Configuração do Backend (Node.js)
Passo 1: Acesse a pasta do Backend
cd backend
Passo 2: Instale as dependências
Se você ainda não tem o Node.js instalado, instale a versão mais recente do Node.js.

Agora, instale as dependências do Backend:

npm install
Passo 3: Configuração do Banco de Dados
Crie um arquivo .env na pasta do backend com as configurações do banco de dados:
MONGODB_URI=mongodb://localhost:27017/projeto_esperanca
JWT_SECRET=seu-segredo

Passo 4: Inicie o Servidor
Com tudo configurado, inicie o backend com o comando:
npm start
O servidor estará rodando na URL: http://localhost:3000.

3. Configuração do Admin Panel (React)
Passo 1: Acesse a pasta do Admin Panel
cd admin-panel

Passo 2: Instale as dependências
Se você ainda não tem o Node.js e o npm instalados, baixe.
Agora, instale as dependências do Admin Panel:
npm install

Passo 3: Inicie o Admin Panel
Após instalar as dependências, inicie o Admin Panel com:
npm run dev
O painel será aberto em http://localhost:5173.

4. Configuração do Frontend (HTML/CSS)
A pasta frontend contém as páginas estáticas com HTML e CSS. Para visualizá-las:
Abra a pasta frontend.
Abra o arquivo index.html diretamente em seu navegador.

Utilizando o Sistema
1. Autenticação de Admin
No painel de administração (Admin Panel), você será solicitado a fazer login.

Campos:

Usuário: Insira o nome de usuário do administrador.

Senha: Insira a senha do administrador.

Após o login, você terá acesso ao painel de administração.


2. Rotas da API Backend
2.1 Login do Admin
URL: POST http://localhost:3000/api/admin/login

Corpo da Requisição (JSON):

json
Copiar
{
  "username": "admin",
  "password": "senha"
}
Resposta:
Se bem-sucedido, retorna o token JWT para autenticação:

json
Copiar
{
  "token": "seu-token-aqui"
}
2.2 Criar Conteúdo
URL: POST http://localhost:3000/api/content

Cabeçalhos:

Authorization: Bearer <seu-token>

Corpo da Requisição (form-data):

contentName: Nome do conteúdo.

description: Descrição do conteúdo.

section: Seção do conteúdo (por exemplo: HOME, PROJETOS).

image: Arquivo de imagem (opcional).

2.3 Atualizar Conteúdo
URL: PUT http://localhost:3000/api/content/:id

Cabeçalhos:

Authorization: Bearer <seu-token>

Corpo da Requisição (form-data):

contentName: Nome do conteúdo.

description: Descrição do conteúdo.

section: Seção do conteúdo (por exemplo: HOME, PROJETOS).

image: Arquivo de imagem (opcional).

2.4 Deletar Conteúdo
URL: DELETE http://localhost:3000/api/content/:id

Cabeçalhos:

Authorization: Bearer <seu-token>

2.5 Obter Conteúdos por Seção
URL: GET http://localhost:3000/api/content/:section

Cabeçalhos:

Authorization: Bearer <seu-token>

Resposta:

Retorna todos os conteúdos da seção solicitada.

2.6 Obter publicações do instagram
URL: GET http://localhost:3000/api/instagram/posts

Resposta:
Retorna um array de postagens referentes as postagens do instagram do Projeto Esperança. Exemplo:
[
    {
        "link": "https://www.instagram.com/p/DMEopj6MUJI/",
        "img": "https://scontent.cdninstagram.com/v/t51.82787-15/519101752_18383972716193093_3550432812862055594_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=1-7&_nc_sid=18de74&_nc_ohc=hfmAM34QIQ8Q7kNvwGoCKb6&_nc_oc=Adm0DM8dsgWfAfDf68hl5FenpE91l3msxFFG4D-Nr9njx9z5FTkgSpeFNEgAaLEt9eo&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=VglKUYD8gMsLj3_fHoNLrQ&oh=00_AfQZ02MM-i5yLHRbmSDz02okSDyccI1Yp-wi7IjMXvxLAQ&oe=687F19D0"
    },
    {
        "link": "https://www.instagram.com/reel/DL-DVf8OEs2/",
        "img": "https://scontent.cdninstagram.com/v/t51.71878-15/517579465_1295830425669162_4280748279777459057_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=Ierhlc0t3lUQ7kNvwGZrNBU&_nc_oc=Adl3PnC_jEmp4RzgusDZrj6wT97md95Aia-PnZKU-JhnmYlVl_KD8vlBmFBPhq8KpcI&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=VglKUYD8gMsLj3_fHoNLrQ&oh=00_AfTmll_wqUcpqIEbuQUkLYJV5crZBH-jPPpG4PCauUYA5A&oe=687F3932"
    }
]

OBS: A resposta vem com todas as publicações do instagram da pagina.


3. Testando as Requisições Manualmente
Você pode testar as requisições manualmente usando Postman ou cURL.

Exemplo com cURL:

Para login:
curl -X POST http://localhost:3000/api/admin/login \
-H "Content-Type: application/json" \
-d '{"username": "admin", "password": "admin123"}'
Para criar conteúdo:
curl -X POST http://localhost:3000/api/content \
-H "Authorization: Bearer seu-token-aqui" \
-F "contentName=Novo conteúdo" \
-F "description=Descrição do conteúdo" \
-F "section=HOME" \
-F "image=@caminho/para/imagem.png"

Conclusão
Agora, você tem um painel de administração funcional com autenticação e as APIs para manipular conteúdos.

Se precisar de mais algum detalhe ou ajuda com alguma parte do processo, estou à disposição!
```
