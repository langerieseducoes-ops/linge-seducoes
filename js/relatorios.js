// ======================================
// Linge & Seduções ERP
// Módulo de Relatórios
// ======================================

function atualizarRelatorios() {

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

    let estoque = 0;
    let valorEstoque = 0;
    let totalVendas = 0;

    produtos.forEach(produto => {

        estoque += Number(produto.quantidade);
        valorEstoque += Number(produto.quantidade) * Number(produto.custo);

    });

    vendas.forEach(venda => {

        totalVendas += Number(venda.valor);

    });

    document.getElementById("rProdutos").innerText = produtos.length;

    document.getElementById("rEstoque").innerText = estoque;

    document.getElementById("rValor").innerText =
        valorEstoque.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("rVendas").innerText =
        totalVendas.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("rQtdVendas").innerText = vendas.length;

    document.getElementById("rClientes").innerText = clientes.length;

    document.getElementById("rFornecedores").innerText = fornecedores.length;

}

// ======================================
// Inicialização
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    atualizarRelatorios();

});
