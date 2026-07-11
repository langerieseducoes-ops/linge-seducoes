// ======================================
// Dashboard - Linge & Seduções ERP
// ======================================

document.addEventListener("DOMContentLoaded", atualizarDashboard);

function atualizarDashboard(){

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

    let totalProdutos = produtos.length;

    let totalEstoque = 0;

    let valorEstoque = 0;

    produtos.forEach(produto=>{

        totalEstoque += Number(produto.quantidade);

        valorEstoque +=
            Number(produto.quantidade) *
            Number(produto.custo);

    });

    let hoje = new Date().toLocaleDateString("pt-BR");

    let vendasHoje = 0;

    vendas.forEach(venda=>{

        if(venda.data.includes(hoje)){

            vendasHoje += Number(venda.valor);

        }

    });

    document.getElementById("totalProdutos").innerHTML = totalProdutos;

    document.getElementById("totalEstoque").innerHTML = totalEstoque;

    document.getElementById("valorEstoque").innerHTML =
        valorEstoque.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

    document.getElementById("vendasHoje").innerHTML =
        vendasHoje.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

}
