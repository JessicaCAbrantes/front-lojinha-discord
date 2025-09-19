document.addEventListener("DOMContentLoaded", () => {
  const activeListContainer = document.getElementById("active-product-list");
  const deletedListContainer = document.getElementById("deleted-product-list");

  // Carrega a lista de produtos ativos do localStorage
  let produtosAtivos = JSON.parse(localStorage.getItem("produtos")) || [];
  // Carrega a lista de produtos excluídos (lixeira)
  let produtosExcluidos =
    JSON.parse(localStorage.getItem("produtosExcluidos")) || [];

  /**
   * Salva ambas as listas no localStorage.
   */
  function salvarListas() {
    localStorage.setItem("produtos", JSON.stringify(produtosAtivos));
    localStorage.setItem(
      "produtosExcluidos",
      JSON.stringify(produtosExcluidos)
    );
  }

  /**
   * Move um produto da lista de ativos para a lixeira.
   */
  function moverParaLixeira(index) {
    const idx = Number(index);
    const produtoMovido = produtosAtivos.splice(idx, 1)[0];
    if (!produtoMovido) return;
    produtosExcluidos.push(produtoMovido);
    salvarListas();
    renderizarTudo();
  }

  /**
   * Restaura um produto da lixeira para a lista de ativos.
   */
  function restaurarProduto(index) {
    const idx = Number(index);
    const produtoRestaurado = produtosExcluidos.splice(idx, 1)[0];
    if (!produtoRestaurado) return;
    produtosAtivos.push(produtoRestaurado);
    salvarListas();
    renderizarTudo();
  }

  /**
   * Exclui DEFINITIVAMENTE um produto da lixeira.
   */
  function excluirDefinitivamente(index) {
    const idx = Number(index);
    if (isNaN(idx)) return;
    // Remove o item da lixeira
    produtosExcluidos.splice(idx, 1);
    salvarListas();
    renderizarTudo();
  }

  /**
   * Desenha as duas listas na tela.
   */
  function renderizarTudo() {
    // Limpa e desenha a lista de produtos ativos
    activeListContainer.innerHTML = "";
    if (produtosAtivos.length === 0) {
      activeListContainer.innerHTML = "<p>Nenhum produto ativo na loja.</p>";
    } else {
      produtosAtivos.forEach((produto, index) => {
        activeListContainer.innerHTML += `
                    <div class="product-item">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <div class="product-item-details">
                            <strong>${produto.nome}</strong>
                            <p>Categoria: ${produto.categoria || "N/A"}</p>
                        </div>
                        <button class="action-btn bg-red text-white" data-action="delete" data-index="${index}">Mover para Lixeira</button>
                    </div>
                `;
      });
    }

    // Limpa e desenha a lista de produtos na lixeira
    deletedListContainer.innerHTML = "";
    if (produtosExcluidos.length === 0) {
      deletedListContainer.innerHTML = "<p>A lixeira está vazia.</p>";
    } else {
      produtosExcluidos.forEach((produto, index) => {
        deletedListContainer.innerHTML += `
                    <div class="product-item">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <div class="product-item-details">
                            <strong>${produto.nome}</strong>
                            <p>Categoria: ${produto.categoria || "N/A"}</p>
                        </div>
                        <div class="product-item-actions" style="display:flex; gap:10px;">
                            <button class="action-btn bg-green text-white" data-action="restore" data-index="${index}">Restaurar</button>
                            <button class="action-btn bg-red text-white" data-action="permanent-delete" data-index="${index}">Excluir</button>
                        </div>
                    </div>
                `;
      });
    }
  }

  // Ouvinte de cliques (mais robusto — usa closest para não depender do target exato)
  document.body.addEventListener("click", (event) => {
    const botao = event.target.closest("[data-action]");
    if (!botao) return;

    const action = botao.getAttribute("data-action");
    const index = parseInt(botao.getAttribute("data-index"), 10);

    if (action === "delete") {
      moverParaLixeira(index);
    } else if (action === "restore") {
      restaurarProduto(index);
    } else if (action === "permanent-delete") {
      // Confirma antes de apagar
      if (confirm("Tem certeza que deseja excluir este produto para sempre?")) {
        excluirDefinitivamente(index);
      }
    }
  });

  // Inicia a renderização quando a página carrega
  renderizarTudo();
});
