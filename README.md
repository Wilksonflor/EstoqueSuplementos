# 🏋️‍♂️ Estoque de Suplementos

Bem-vindo ao sistema de gerenciamento de estoque para sua loja de suplementos! Este projeto utiliza uma API desenvolvida para oferecer controle eficiente de produtos, categorias e usuários, tudo através de uma interface moderna, intuitiva e responsiva

## 🚀 Tecnologias Utilizadas

- **ReactJS**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida para projetos front-end modernos.
- **Ant Design**: Framework de componentes UI para React.
- **React Router DOM**: Biblioteca para roteamento em aplicações React.

## 📦 Funcionalidades

- **Dashboard**: Visão geral do estoque e estatísticas relevantes.
- **Gerenciamento de Produtos**: Adicionar, editar e remover produtos do estoque.
- **Categorias**: Organização dos produtos por categorias.
- **Usuários**: Controle de acesso e gerenciamento de usuários do sistema.
- **Logout**: Opção para encerrar a sessão de forma segura.

## 🛠️ Instalação e Execução

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/Wilksonflor/EstoqueSuplementos.git
   cd EstoqueSuplementos
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:3000`.

## 📁 Estrutura de Pastas

```plaintext
LojaSuplementos-Front/
├── public/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css
│   ├── components/
│   │   └── Buttons/
│   │       └── CustomButton.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── Produtos/
│   │   │   └── Produtos.jsx
│   │   ├── Categorias/
│   │   │   └── Categorias.jsx
│   │   ├── Usuarios/
│   │   │   └── Usuarios.jsx
│   │   └── Login/
│   │       └── Login.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   └── UserService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── vite.config.js
├── .gitignore
├── package.json
└── README.md
```

## 🎨 Personalização

Para customizar o tema da aplicação, modifique as variáveis no arquivo de configuração do Ant Design conforme necessário.

## 🔍 Próximos Passos

- Integrar com uma API backend para persistência de dados.
- Adicionar testes unitários e de integração.
- Melhorar a responsividade para dispositivos móveis.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido por [Wilkson Flor](https://github.com/Wilksonflor)
