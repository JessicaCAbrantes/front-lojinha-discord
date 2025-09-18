document.addEventListener('DOMContentLoaded', () => {
    const activeListContainer = document.getElementById('active-product-list');
    const deletedListContainer = document.getElementById('deleted-product-list');

    // Carrega a lista de produtos ativos do localStorage
    let produtosAtivos = JSON.parse(localStorage.getItem('produtos')) || [];
    // Carrega a lista de produtos excluídos (lixeira)
    let produtosExcluidos = JSON.parse(localStorage.getItem('produtosExcluidos')) || [];

    /**
     * Salva ambas as listas no localStorage.
     */
    function salvarListas() {
        localStorage.setItem('produtos', JSON.stringify(produtosAtivos));
        localStorage.setItem('produtosExcluidos', JSON.stringify(produtosExcluidos));
    }

    /**
     * Move um produto da lista de ativos para a lixeira.
     */
    function moverParaLixeira(index) {
        // Retira o produto da lista de ativos
        const produtoMovido = produtosAtivos.splice(index, 1)[0];
        // Adiciona o produto à lista de excluídos
        produtosExcluidos.push(produtoMovido);
        // Salva as alterações e atualiza a tela
        salvarListas();
        renderizarTudo();
    }

    /**
     * Restaura um produto da lixeira para a lista de ativos.
     */
    function restaurarProduto(index) {
        // Retira o produto da lixeira
        const produtoRestaurado = produtosExcluidos.splice(index, 1)[0];
        // Adiciona o produto de volta à lista de ativos
        produtosAtivos.push(produtoRestaurado);
        // Salva as alterações e atualiza a tela
        salvarListas();
        renderizarTudo();
    }

    /**
     * Desenha as duas listas na tela.
     */
    function renderizarTudo() {
        // Limpa e desenha a lista de produtos ativos
        activeListContainer.innerHTML = '';
        if (produtosAtivos.length === 0) {
            activeListContainer.innerHTML = '<p>Nenhum produto ativo na loja.</p>';
        } else {
            produtosAtivos.forEach((produto, index) => {
                activeListContainer.innerHTML += `
                    <div class="product-item">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <div class="product-item-details">
                            <strong>${produto.nome}</strong>
                            <p>Categoria: ${produto.categoria || 'N/A'}</p>
                        </div>
                        <button class="action-btn bg-red text-white" data-action="delete" data-index="${index}">Mover para Lixeira</button>
                    </div>
                `;
            });
        }

        // Limpa e desenha a lista de produtos na lixeira
        deletedListContainer.innerHTML = '';
        if (produtosExcluidos.length === 0) {
            deletedListContainer.innerHTML = '<p>A lixeira está vazia.</p>';
        } else {
            produtosExcluidos.forEach((produto, index) => {
                deletedListContainer.innerHTML += `
                    <div class="product-item">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <div class="product-item-details">
                            <strong>${produto.nome}</strong>
                            <p>Categoria: ${produto.categoria || 'N/A'}</p>
                        </div>
                        <button class="action-btn bg-green text-white" data-action="restore" data-index="${index}">Restaurar</button>
                    </div>
                `;
            });
        }
    }

    // Adiciona os "ouvintes" de cliques para as ações
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        const action = target.getAttribute('data-action');
        const index = target.getAttribute('data-index');

        if (action === 'delete') {
            moverParaLixeira(index);
        } else if (action === 'restore') {
            restaurarProduto(index);
        }
    });

    // Inicia a renderização quando a página carrega
    renderizarTudo();
});