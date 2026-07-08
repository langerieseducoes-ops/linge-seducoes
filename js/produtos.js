// =========================
// Módulo de Produtos
// =========================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function adicionarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const produto = document.getElementById("produto").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const tamanho = document.getElementById("tamanho").value;
    const cor = document.getElementById("cor").value.trim();
    const custo = parseFloat(document.getElementById("custo").value);
    const venda = parseFloat(document.getElementById("venda").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if (
        !codigo ||
        !produto ||
        !categoria ||
        !cor ||
        isNaN(custo) ||
        isNaN(venda) ||
        isNaN(quantidade)
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Já existe um produto com este código.");
        return;
    }

    produtos.push({
        codigo,
        produto,
        categoria,
        tamanho,
        cor,
        custo,
        venda,
        quantidade
    });

    salvarProdutos();
    limparFormulario();
    atualizarTabela();
}

function limparFormulario() {

    document.getElementById("codigo").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("tamanho").value = "P";
    document.getElementById("cor").value = "";
    document.getElementById("custo").value = "";
    document.getElementById("venda").value = "";
    document.getElementById("quantidade").value = "";

}
