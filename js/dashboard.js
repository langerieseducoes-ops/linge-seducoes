// ======================================
// Dashboard - Linge & Seduções ERP
// ======================================

document.addEventListener("DOMContentLoaded", atualizarDashboard);
window.addEventListener("storage", atualizarDashboard);

function atualizarDashboard() {

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
    const financeiro = JSON.parse(localStorage.getItem("financeiro")) || [];

    let totalProdutos = produtos.length;
    let totalEstoque = 0;
    let valorEstoque = 0;

    produtos.forEach(produto => {
        totalEstoque += Number(produto.quantidade) || 0;
        valorEstoque +=
            (Number(produto.quantidade) || 0);
            (Number(produto.custo) || 0);
    });

    const hoje = new Date().toLocaleDateString("pt-BR");

    let vendasHoje = 0;

    vendas.forEach(venda => {
        if (venda.data && venda.data.includes(hoje)) {
            vendasHoje += Number(venda.valor) || 0;
        }
    });

    let entradas = 0;
    let saidas = 0;

    financeiro.forEach(item => {
        if (item.tipo === "Entrada") {
            entradas += Number(item.valor) || 0;
        } else if (item.tipo === "Saída") {
            saidas += Number(item.valor) || 0;
        }
    });

    atualizarElemento("totalProdutos", totalProdutos);
    atualizarElemento("totalEstoque", totalEstoque);
    atualizarElemento("valorEstoque", formatarMoeda(valorEstoque));
    atualizarElemento("vendasHoje", formatarMoeda(vendasHoje));
    atualizarElemento("totalEntradas", formatarMoeda(entradas));
    atualizarElemento("totalSaidas", formatarMoeda(saidas));
    atualizarElemento("saldoFinanceiro", formatarMoeda(entradas - saidas));
}

function atualizarElemento(id, valor) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}
