// ===============================
// Linge & Seduções
// Controle de Estoque
// ===============================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Salvar dados
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Atualizar Dashboard e Tabela
function atualizarTabela() {

    const tabela = document.getElementById("tabelaProdutos");
    tabela.innerHTML = "";

    let totalEstoque = 0;

    produtos.forEach((item, indice) => {

        totalEstoque += Number(item.quantidade);

        tabela.innerHTML += `
        <tr>
            <td>${item.codigo}</td>
            <td>${item.produto}</td>
            <td>${item.categoria}</td>
            <td>${item.cor}</td>
            <td>${item.tamanho}</td>
            <td>R$ ${Number(item.custo).toFixed(2)}</td>
            <td>R$ ${Number(item.venda).toFixed(2)}</td>
            <td>${item.quantidade}</td>

            <td>
                <button onclick="entrada(${indice})">+</button>
                <button onclick="saida(${indice})">-</button>
                <button onclick="excluirProduto(${indice})">🗑️</button>
            </td>
        </tr>`;
    });

    document.getElementById("totalProdutos").innerText = produtos.length;
    document.getElementById("totalEstoque").innerText = totalEstoque;

    salvarDados();
}

// Adicionar Produto
function adicionarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const produto = document.getElementById("produto").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const cor = document.getElementById("cor").value.trim();
    const tamanho = document.getElementById("tamanho").value.trim();
    const custo = document.getElementById("custo").value;
    const venda = document.getElementById("venda").value;
    const quantidade = document.getElementById("quantidade").value;

    if (
        !codigo ||
        !produto ||
        !categoria ||
        !cor ||
        !tamanho ||
        !custo ||
        !venda ||
        !quantidade
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    // Não permite código repetido
    const existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Já existe um produto com esse código.");
        return;
    }

    produtos.push({
        codigo,
        produto,
        categoria,
        cor,
        tamanho,
        custo,
        venda,
        quantidade
    });

    limparCampos();
    atualizarTabela();
}

// Limpar campos
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("tamanho").value = "";
    document.getElementById("custo").value = "";
    document.getElementById("venda").value = "";
    document.getElementById("quantidade").value = "";

}

// Entrada
function entrada(indice) {

    produtos[indice].quantidade++;

    atualizarTabela();

}

// Saída
function saida(indice) {

    if (produtos[indice].quantidade > 0) {

        produtos[indice].quantidade--;

    }

    atualizarTabela();

}

// Excluir
function excluirProduto(indice) {

    if (confirm("Deseja excluir este produto?")) {

        produtos.splice(indice, 1);

        atualizarTabela();

    }

}

// Pesquisa
function pesquisarProduto() {

    const texto = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const linhas = document.querySelectorAll("#tabelaProdutos tr");

    linhas.forEach(linha => {

        linha.style.display = linha.innerText.toLowerCase().includes(texto)
            ? ""
            : "none";

    });

}

// Inicialização
atualizarTabela();
