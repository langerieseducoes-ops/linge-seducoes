// ======================================
// Linge & Seduções ERP
// Módulo de Vendas
// ======================================

let vendas = JSON.parse(localStorage.getItem("vendas")) || [];
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Carrega os produtos no select
function carregarProdutos() {

    const select = document.getElementById("produtoVenda");

    if (!select) return;

    select.innerHTML = '<option value="">Selecione um produto</option>';

    produtos.forEach((produto, indice) => {

        if (produto.quantidade > 0) {

            select.innerHTML += `
                <option value="${indice}">
                    ${produto.produto} (${produto.quantidade} em estoque)
                </option>
            `;

        }

    });

}

// Inicialização
carregarProdutos();
