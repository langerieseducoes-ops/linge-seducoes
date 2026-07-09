// ======================================
// Dashboard - Linge & Seduções ERP
// ======================================

function atualizarDashboard() {

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const vendas = JSON.parse(localStorage.getItem("vendas")) || [];

    let totalProdutos = produtos.length;
    let totalEstoque = 0;
    let valorEstoque = 0;
    let vendasHoje = 0;

    produtos.forEach(produto => {

        totalEstoque += Number(produto.quantidade);
        valorEstoque += Number(produto.quantidade) * Number(produto.custo);

    });

    // Soma todas as vendas
    vendas.forEach(venda => {

        vendasHoje += Number(venda.valor);

    });

    const elProdutos = document.getElementById("totalProdutos");
    const elEstoque = document.getElementById("totalEstoque");
    const elValor = document.getElementById("valorEstoque");
    const elVendas = document.getElementById("vendasHoje");

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

    if (elVendas) {
        elVendas.innerText = vendasHoje.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

}

document.addEventListener("DOMContentLoaded", atualizarDashboard);
