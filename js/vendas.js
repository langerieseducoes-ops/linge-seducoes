// ======================================
// Linge & Seduções ERP
// Módulo de Vendas
// ======================================

let vendas = JSON.parse(localStorage.getItem("vendas")) || [];
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// ======================================
// Carregar Produtos
// ======================================

function carregarProdutos() {

    const select = document.getElementById("produtoVenda");

    if (!select) return;

    select.innerHTML = '<option value="">Selecione um produto</option>';

    produtos.forEach((produto, indice) => {

        if (Number(produto.quantidade) > 0) {

            select.innerHTML += `
                <option value="${indice}">
                    ${produto.produto} (${produto.quantidade} em estoque)
                </option>
            `;

        }

    });

}

// ======================================
// Atualizar Tabela de Vendas
// ======================================

function atualizarTabelaVendas() {

    const tabela = document.getElementById("tabelaVendas");

    if (!tabela) return;

    tabela.innerHTML = "";

    let totalVendido = 0;
    let totalItens = 0;

    vendas.forEach(venda => {

        totalVendido += Number(venda.valor);
        totalItens += Number(venda.quantidade);

        tabela.innerHTML += `
            <tr>
                <td>${venda.data}</td>
                <td>${venda.cliente}</td>
                <td>${venda.produto}</td>
                <td>${venda.quantidade}</td>
                <td>${Number(venda.valor).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}</td>
            </tr>
        `;

    });

    const vendasHoje = document.getElementById("vendasHoje");
    const itensVendidos = document.getElementById("itensVendidos");

    if (vendasHoje) {
        vendasHoje.innerText = totalVendido.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    if (itensVendidos) {
        itensVendidos.innerText = totalItens;
    }

}

// ======================================
// Registrar Venda
// ======================================

function registrarVenda() {

    const cliente = document.getElementById("cliente").value.trim();
    const indiceProduto = document.getElementById("produtoVenda").value;
    const quantidade = parseInt(document.getElementById("quantidadeVenda").value);

    if (
        cliente === "" ||
        indiceProduto === "" ||
        isNaN(quantidade) ||
        quantidade <= 0
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    const produto = produtos[indiceProduto];

    if (!produto) {
        alert("Produto inválido.");
        return;
    }

    if (Number(produto.quantidade) < quantidade) {
        alert("Estoque insuficiente.");
        return;
    }

    produto.quantidade = Number(produto.quantidade) - quantidade;

    const venda = {
        data: new Date().toLocaleString("pt-BR"),
        cliente: cliente,
        produto: produto.produto,
        quantidade: quantidade,
        valor: Number(produto.venda) * quantidade
    };

    vendas.push(venda);

    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("vendas", JSON.stringify(vendas));

    document.getElementById("cliente").value = "";
    document.getElementById("produtoVenda").value = "";
    document.getElementById("quantidadeVenda").value = "";

    carregarProdutos();
    atualizarTabelaVendas();

    alert("Venda registrada com sucesso!");

}

// ======================================
// Inicialização
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    carregarProdutos();
    atualizarTabelaVendas();

});
