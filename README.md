# 💈 Golden Chair

Sistema de agendamento para barbearias, com área do cliente e painel de administração. Projeto pessoal desenvolvido do zero, com foco em boas práticas de back-end, autenticação segura e modelagem de banco de dados.

> 🚧 **Status: em desenvolvimento.** O back-end está sendo construído (versão 1). O front-end ainda será desenvolvido.

---

## 📌 Sobre o projeto

O objetivo é permitir que clientes agendem horários online e que a barbearia gerencie sua agenda, serviços e clientes em um só lugar, substituindo anotações em papel e conversas de WhatsApp.

## ✨ Funcionalidades

### Versão 1 (escopo atual)
- [x] Cadastro e login de usuários
- [x] Autenticação com JWT e senhas criptografadas
- [ ] Controle de acesso por tipo de usuário (cliente / admin)
- [ ] Agendamento de horários
- [ ] Cancelamento com antecedência mínima
- [ ] Perfil do cliente
- [ ] Painel do administrador (agenda, serviços e clientes)

### Versão 2 (planejado)
- [ ] Escolha de barbeiro
- [ ] Aviso de vagas liberadas após cancelamentos
- [ ] Pagamento online

## 🛠️ Tecnologias

- **Node.js** + **Express**
- **Supabase** (PostgreSQL)
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- _Front-end: a definir_

## 🗺️ Roadmap

- [x] Modelagem do banco de dados
- [x] Conexão com o Supabase
- [x] Cadastro de usuários
- [x] Login com JWT
- [x] Middleware de autenticação
- [ ] Middleware de tipo de usuário
- [ ] Rotas de agendamento
- [ ] Rotas do painel administrativo
- [ ] Front-end
- [ ] Deploy


## 🚀 Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- Um projeto criado no [Supabase](https://supabase.com/)

### Passo a passo

```bash
# 1. Clone o repositório
git clone [URL-DO-REPOSITORIO]

# 2. Entre na pasta do projeto
cd [NOME-DA-PASTA]

# 3. Instale as dependências
npm install

# 4. Crie o arquivo .env a partir do exemplo
cp .env.example .env

# 5. Preencha as variáveis no .env e inicie o servidor
npm run dev
```



## 👤 Autor

**Lucas da Silva Correia**

- GitHub: [LucasCorreiaDeveloper](https://github.com/LucasCorreiaDeveloper)
- LinkedIn: [Lucas Correia || LinkedIn](https://www.linkedin.com/in/lucas-correia-05a092281/)
