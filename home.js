document.addEventListener("DOMContentLoaded", () => {
  // ==================== SELETORES DE ELEMENTOS ====================
  const navOpenBtn = document.querySelector(".mobile-open-btn");
  const navCloseBtn = document.querySelector(".mobile-close-btn");
  const primaryNavigation = document.getElementById("primary-navigation");
  const cartOpenBtn = document.getElementById("cart-box");
  const cartContainer = document.getElementById("cart-icon");
  const cartCloseBtn = document.querySelector(
    "#cart-icon .shopping .uil-times"
  );
  const cartItemsContainer = document.querySelector("#cart-icon .cart");
  const cartTotalElement = document.getElementById("cart-total-value");
  const checkoutBtn = document.getElementById("checkout-btn");
  const productContainer = document.getElementById("product-list-container");
  const cartCounterElement = document.getElementById("cart-counter");

  // ==================== CARREGAMENTO DE DADOS ====================
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // ==================== FUNÇÕES DO CARRINHO ====================
  // (Esta parte não foi alterada)
  function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  function atualizarContadorCarrinho() {
    if (carrinho.length > 0) {
      cartCounterElement.textContent = carrinho.length;
      cartCounterElement.style.display = "grid";
    } else {
      cartCounterElement.style.display = "none";
    }
  }

  function calcularTotalCarrinho() {
    const total = carrinho.reduce(
      (acc, produto) => acc + parseFloat(produto.preco),
      0
    );
    cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
  }

  function renderizarItensCarrinho() {
    cartItemsContainer.innerHTML = "";
    if (carrinho.length === 0) {
      cartItemsContainer.innerHTML = `
            <i class="uil uil-shopping-cart-alt"></i>
            <p>Carrinho vazio</p>
        `;
      cartItemsContainer.style.flexDirection = "column";
      checkoutBtn.style.display = "none";
    } else {
      cartItemsContainer.style.flexDirection = "column";
      checkoutBtn.style.display = "block";
      carrinho.forEach((produto, index) => {
        const itemHTML = `
                <div class="cart-item">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${produto.nome}</p>
                        <p class="cart-item-price">R$ ${parseFloat(
                          produto.preco
                        ).toFixed(2)}</p>
                    </div>
                    <button class="remover-item-btn" data-index="${index}">
                        <i class="uil uil-trash-alt"></i>
                    </button>
                </div>
            `;
        cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
      });
    }
    atualizarContadorCarrinho();
    calcularTotalCarrinho();
  }

  function finalizarCompra() {
    if (carrinho.length === 0) {
      alert("O seu carrinho está vazio!");
      return;
    }
    alert("Obrigado pela sua compra! O seu pedido foi finalizado com sucesso.");
    carrinho = [];
    salvarCarrinho();
    renderizarItensCarrinho();
  }

  // ==================== LÓGICA DE EXIBIÇÃO DE PRODUTOS ====================
  if (productContainer) {
    // #################### NOVA LÓGICA COMEÇA AQUI ####################
    // (O bloco de código antigo daqui para baixo foi substituído por este)

    productContainer.innerHTML = ""; // Limpa o container principal

    if (produtos.length === 0) {
      productContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="font-size: 1.2rem;">Nenhum produto cadastrado.</p></div>`;
    } else {
      // 1. Agrupa os produtos por categoria num objeto
      const produtosPorCategoria = produtos.reduce((acc, produto) => {
        const categoria = produto.categoria || "Outros"; // Usa 'Outros' se não tiver categoria
        if (!acc[categoria]) {
          acc[categoria] = []; // Cria um array para a categoria se ainda não existir
        }
        acc[categoria].push(produto); // Adiciona o produto ao array da sua categoria
        return acc;
      }, {});

      // 2. Cria uma secção HTML para cada categoria
      for (const categoria in produtosPorCategoria) {
        // Cria o título da categoria (ex: <h2>Eletrônicos</h2>)
        const categorySection = document.createElement("section");
        categorySection.className = "category-section";
        categorySection.innerHTML = `<h2 class="category-title">${categoria}</h2>`;

        // Cria a grelha de produtos para esta categoria
        const productGrid = document.createElement("div");
        productGrid.className = "product-grid";

        // 3. Adiciona cada produto da categoria à sua grelha
        produtosPorCategoria[categoria].forEach((produto, index) => {
          const produtoHTML = `
                        <div class="product-card">
                            <div class="product-card-image" style="background-image: url('${
                              produto.imagem
                            }');"></div>
                            <div class="product-card-info">
                                <h3 class="product-name">${produto.nome}</h3>
                                <p class="product-observation">${
                                  produto.observacao || ""
                                }</p>
                                <p class="product-price">R$ ${parseFloat(
                                  produto.preco
                                ).toFixed(2)}</p>
                                <button class="product-btc large-btn bg-red text-white" data-index="${index}">Adicionar</button>
                            </div>
                        </div>
                    `;
          productGrid.innerHTML += produtoHTML;
        });

        // Adiciona a grelha de produtos completa à secção da categoria
        categorySection.appendChild(productGrid);
        // Adiciona a secção da categoria completa ao container principal da página
        productContainer.appendChild(categorySection);
      }
    }
    // #################### NOVA LÓGICA TERMINA AQUI ####################
  }

  // ==================== EVENT LISTENERS ====================
  // (Esta parte não foi alterada)
  if (navOpenBtn && navCloseBtn && primaryNavigation) {
    navOpenBtn.addEventListener("click", () => {
      primaryNavigation.setAttribute("data-visible", "true");
      navCloseBtn.setAttribute("data-visible", "true");
    });
    navCloseBtn.addEventListener("click", () => {
      primaryNavigation.setAttribute("data-visible", "false");
      navCloseBtn.setAttribute("data-visible", "false");
    });
  }

  if (cartOpenBtn && cartContainer && cartCloseBtn) {
    cartOpenBtn.addEventListener("click", () =>
      cartContainer.setAttribute("data-visible", "true")
    );
    cartCloseBtn.addEventListener("click", () =>
      cartContainer.setAttribute("data-visible", "false")
    );
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", finalizarCompra);
  }

  document.body.addEventListener("click", (event) => {
    if (event.target.matches(".product-btc")) {
      const indexDoProduto = event.target.getAttribute("data-index");
      const produtoParaAdicionar = produtos[indexDoProduto];
      carrinho.push(produtoParaAdicionar);
      salvarCarrinho();
      renderizarItensCarrinho();
      alert(`"${produtoParaAdicionar.nome}" foi adicionado ao carrinho!`);
    }

    const botaoRemover = event.target.closest(".remover-item-btn");
    if (botaoRemover) {
      const indexDoItem = botaoRemover.getAttribute("data-index");
      carrinho.splice(indexDoItem, 1);
      salvarCarrinho();
      renderizarItensCarrinho();
    }
  });

  // ==================== INICIALIZAÇÃO ====================
  renderizarItensCarrinho();
});
