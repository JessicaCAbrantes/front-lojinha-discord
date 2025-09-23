# 🛒 Tech Store – Sistema de Gerenciamento de Produtos

Este projeto é uma aplicação web simples desenvolvida para **gerenciar produtos de uma loja virtual fictícia (Tech Store)**. Ele permite **adicionar, visualizar, excluir, restaurar e gerenciar produtos** diretamente no navegador, utilizando `localStorage` como banco de dados local.

O sistema também conta com um **carrinho de compras funcional**, exibição dinâmica de produtos por categorias e feedback visual ao usuário por meio de notificações _toast_ e modais de confirmação.

---

## 🚀 Funcionalidades

### 📌 **Página Inicial (home.html)**

- Exibe todos os produtos cadastrados no **localStorage**.
- Organização automática por **categorias** (Eletrônicos, Acessórios, Notebooks, etc.).
- Botão **"Adicionar ao Carrinho"** em cada produto.
- Carrinho interativo:
  - Adicionar/remover itens.
  - Calcular total em tempo real.
  - Persistência dos dados no navegador.
  - Contador dinâmico de itens no ícone do carrinho.

### ➕ **Adicionar Produto (adicionar-produto.html)**

- Formulário para cadastro de novos produtos:
  - Nome
  - Preço
  - Categoria
  - Observação (descrição curta)
  - URL da imagem
- Armazena os produtos no **localStorage**.
- Exibe **notificação (toast)** confirmando o sucesso do cadastro.

### ❌ **Excluir Produto (excluir-produto.html)**

- Lista todos os produtos ativos e os excluídos.
- Funcionalidades:
  - **Mover para Lixeira** (remoção lógica).
  - **Restaurar** (recupera um item da lixeira).
  - **Excluir Permanentemente** (remoção definitiva).
- Modal de confirmação antes da exclusão definitiva.
- Feedback ao usuário com notificações _toast_.

### 🔝 **Header Reutilizável (header.html)**

- Menu de navegação para todas as páginas.
- Ícone de login (futuro).
- Barra de pesquisa (estática).
- Ícone de carrinho integrado ao sistema.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** → Estrutura das páginas.
- **CSS3 (home.css)** → Estilização responsiva, incluindo design moderno para cards de produtos, header e carrinho.
- **JavaScript (home.js, adicionar-produto.js, excluir-produto.js)**
  - Manipulação do DOM.
  - Persistência de dados no `localStorage`.
  - Notificações visuais (toasts).
  - Modais de confirmação.

---

## 📂 Estrutura de Arquivos

📦 Tech Store
┣ 📜 home.html # Página inicial (listagem + carrinho)
┣ 📜 home.js # Lógica de exibição e carrinho
┣ 📜 home.css # Estilização geral do sistema
┣ 📜 adicionar-produto.html # Formulário de cadastro de produtos
┣ 📜 adicionar-produto.js # Lógica de adição de produtos
┣ 📜 excluir-produto.html # Gerenciamento e lixeira
┣ 📜 excluir-produto.js # Lógica de exclusão/restauração
┣ 📜 header.html # Cabeçalho comum a todas as páginas
┣ 📂 assets/ # Imagens e ícones

---

## ▶️ Como Executar

1. Clone ou baixe os arquivos do projeto.
2. Abra o arquivo **home.html** em um navegador.
3. Navegue entre as páginas usando o menu superior:
   - **Home** → lista e carrinho de produtos.
   - **Adicionar Produto** → cadastro de novos itens.
   - **Excluir Produto** → gerenciar e excluir/restaurar itens.

_(Não é necessário servidor – funciona 100% no navegador via `localStorage`.)_

---

## 📌 Aprendizados e Destaques

- Criação de um sistema completo **CRUD com localStorage**.
- Implementação de **feedback ao usuário** via _toasts_ e modais.
- Estrutura modular com HTML, CSS e JS separados.
- **Design responsivo** e adaptado para mobile/tablet.
- Organização de produtos por **categorias dinâmicas**.
- Integração de carrinho funcional e contador de itens.

---

## ✨ Possíveis Melhorias Futuras

- Autenticação de usuários (login/logout).
- Integração com banco de dados real (MySQL, Firebase ou MongoDB).
- API para cadastro e consulta de produtos.
- Checkout com simulação de pagamento.
- Busca e filtragem avançada de produtos.
