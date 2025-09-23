document.addEventListener("DOMContentLoaded", () => {
  const activeListContainer = document.getElementById("active-product-list");
  const deletedListContainer = document.getElementById("deleted-product-list");

  let produtosAtivos = JSON.parse(localStorage.getItem("produtos")) || [];
  let produtosExcluidos =
    JSON.parse(localStorage.getItem("produtosExcluidos")) || [];

  function salvarListas() {
    localStorage.setItem("produtos", JSON.stringify(produtosAtivos));
    localStorage.setItem(
      "produtosExcluidos",
      JSON.stringify(produtosExcluidos)
    );
  }

  function moverParaLixeira(index) {
    const idx = Number(index);
    const produtoMovido = produtosAtivos.splice(idx, 1)[0];
    if (!produtoMovido) return;
    produtosExcluidos.push(produtoMovido);
    salvarListas();
    renderizarTudo();
  }

  function restaurarProduto(index) {
    const idx = Number(index);
    const produtoRestaurado = produtosExcluidos.splice(idx, 1)[0];
    if (!produtoRestaurado) return;
    produtosAtivos.push(produtoRestaurado);
    salvarListas();
    renderizarTudo();
  }

  function excluirDefinitivamente(index) {
    const idx = Number(index);
    if (isNaN(idx)) return;
    produtosExcluidos.splice(idx, 1);
    salvarListas();
    renderizarTudo();
  }

  function renderizarTudo() {
    // Ativos
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
            <button class="action-btn bg-red text-white" 
              data-action="delete" data-index="${index}">
              Mover para Lixeira
            </button>
          </div>
        `;
      });
    }

    // Excluídos
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
              <button class="action-btn bg-green text-white" 
                data-action="restore" data-index="${index}">
                Restaurar
              </button>
              <button class="action-btn bg-red text-white" 
                data-action="permanent-delete" data-index="${index}">
                Excluir
              </button>
            </div>
          </div>
        `;
      });
    }
  }

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
      if (confirm("Tem certeza que deseja excluir este produto para sempre?")) {
        excluirDefinitivamente(index);
      }
    }
  });

  renderizarTudo();
});
