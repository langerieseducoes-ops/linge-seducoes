// ======================================
// Dashboard - Linge & Seduções ERP
// ======================================

document.addEventListener("DOMContentLoaded", atualizarDashboard);

function atualizarDashboard(){

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
    const financeiro = JSON.parse(localStorage.getItem("financeiro")) || [];

    let totalProdutos = produtos.length;
    let totalEstoque = 0;
    let valorEstoque = 0;

    produtos.forEach(produto => {

        totalEstoque += Number(produto.quantidade);
        valorEstoque += Number(produto.quantidade) * Number(produto.custo);

    });

    const hoje = new Date().toLocaleDateString("pt-BR");

    let vendasHoje = 0;

    vendas.forEach(venda => {

        if(venda.data.includes(hoje)){
            vendasHoje += Number(venda.valor);
        }

    });

    let entradas = 0;
    let saidas = 0;

    financeiro.forEach(item => {

        if(item.tipo === "Entrada"){
            entradas += Number(item.valor);
        }

        if(item.tipo === "Saída"){
            saidas += Number(item.valor);
        }

    });

    const saldo = entradas - saidas;

    document.getElementById("totalProdutos").innerHTML = totalProdutos;
    document.getElementById("totalEstoque").innerHTML = totalEstoque;

    document.getElementById("valorEstoque").innerHTML =
        valorEstoque.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("vendasHoje").innerHTML =
        vendasHoje.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("totalEntradas").innerHTML =
        entradas.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("totalSaidas").innerHTML =
        saidas.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("saldoFinanceiro").innerHTML =
        saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

}
