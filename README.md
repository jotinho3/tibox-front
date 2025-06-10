# Tibox Ideias — Front-end

Este é o front-end do projeto Tibox Ideias, uma aplicação React/Next.js para cadastro, votação e comentários em ideias, com foco em experiência do usuário, visual moderno e integração total com o back-end via API REST.

---

## 🚀 O que a aplicação faz?

- **Listagem de Ideias:** Mostra todas as ideias em cards bonitos, com dimensões fixas, exibindo título, descrição, autor, votos e data.
- **Busca:** Barra de busca no topo para filtrar ideias pelo título em tempo real.
- **Criação de Ideia:** Formulário estilizado para cadastrar novas ideias, escolhendo o usuário criador.
- **Detalhes da Ideia:** Página dedicada mostrando todos os detalhes, comentários e opção de votar (like).
- **Votação:** Usuário pode votar em uma ideia apenas uma vez. O voto é registrado pelo nome do usuário e impede votos duplicados.
- **Comentários:** Usuários podem comentar em ideias. O formulário de comentário é integrado e estilizado.
- **UX aprimorada:** Ao selecionar um usuário para votar, o mesmo usuário é automaticamente selecionado para comentar, facilitando a interação.
- **Feedback visual:** Loaders animados, botões com feedback de loading, mensagens de erro e sucesso.
- **Responsividade:** Layout adaptável para diferentes tamanhos de tela.
- **Header:** Cabeçalho centralizado com ícone e link para a home.

---

## 🛠️ Principais Bibliotecas e Ferramentas

- **Next.js:** Framework React para SSR/SSG e rotas dinâmicas.
- **React Icons:** Ícones modernos e bonitos (usuário, like, comentário, etc).
- **Axios:** Requisições HTTP para o back-end.
- **Tailwind CSS:** Estilização rápida e responsiva via classes utilitárias.
- **TypeScript:** Tipagem estática para maior segurança e produtividade.

---

## 📁 Estrutura de Componentes

- **Loader:** Componente reutilizável de carregamento com animação de spinner.
- **Header:** Cabeçalho centralizado com ícone e título, linkando para a página inicial.
- **Cards de Ideia:** Cards com dimensões fixas, mantendo o layout alinhado independentemente do tamanho do texto.
- **Formulários:** Inputs e selects estilizados, com ícones e feedback visual.

---

## 💡 Experiência do Usuário

- **Seleção de Usuário Integrada:** Ao escolher um usuário para votar, o mesmo é pré-selecionado para comentar.
- **Mensagens de feedback:** Erros e sucessos são exibidos de forma clara e amigável.
- **Animações:** Loader com spinner animado e botões com feedback visual.
- **Acessibilidade:** Cores e tamanhos de fonte pensados para boa leitura em modo claro e escuro.

---

## 🔗 Como rodar o front-end

```bash
cd tibox-front
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🧪 Testes Automatizados

- **Jest + Testing Library:** Este projeto utiliza [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) para testes automatizados de componentes, hooks e páginas. Os testes garantem a qualidade e o correto funcionamento das principais funcionalidades da aplicação.

### Como rodar os testes

```bash
npm run test
```

Os testes estão localizados na pasta `src/app/__tests__` e em subpastas de hooks e componentes.

---

## 📚 Observações

- O front-end está totalmente desacoplado do back-end, comunicando-se via API REST.
- O código está organizado, tipado e fácil de manter.
- O projeto foi desenvolvido com foco em UX, clareza visual e código limpo.

---

Feito para o teste da Tibox 🚀