// Dashboard - Linge & Seduções ERP

function atualizarDashboard() {

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    let totalProdutos = produtos.length;
    let totalEstoque = 0;
    let valorEstoque = 0;

    produtos.forEach(produto => {
        totalEstoque += Number(produto.quantidade);
        valorEstoque += Number(produto.quantidade) * Number(produto.custo);
    });

    const elProdutos = document.getElementById("totalProdutos");
    const elEstoque = document.getElementById("totalEstoque");
    const elValor = document.getElementById("valorEstoque");

    if (elProdutos) {
        elProdutos.innerText = totalProdutos;
    }

    if (elEstoque) {
        elEstoque.innerText = totalEstoque;
    }

    if (elValor) {
        elValor.innerText = valorEstoque.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

}

document.addEventListener("DOMContentLoaded", atualizarDashboard);
