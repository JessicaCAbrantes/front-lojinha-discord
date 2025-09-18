document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('product-name').value;
    const preco = document.getElementById('product-price').value;
    const categoria = document.getElementById('product-category').value;
    const observacao = document.getElementById('product-observation').value;
    const imagem = document.getElementById('product-image').value;

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push({
        nome: nome,
        preco: preco,
        categoria: categoria,
        observacao: observacao,
        imagem: imagem
    });

    localStorage.setItem('produtos', JSON.stringify(produtos));

    alert('Produto adicionado com sucesso!');
    this.reset();
});