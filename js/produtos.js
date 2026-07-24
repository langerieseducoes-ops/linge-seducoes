// ======================================
// Linge & Seduções ERP
// Módulo de Produtos
// ======================================

// Lista de produtos
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Índice de edição
let indiceEdicao = -1;

// ======================================
// Salvar Produtos
// ======================================

function salvarProdutos() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}

// ======================================
// Carregar Categorias
// ======================================

function carregarCategorias() {

    const select = document.getElementById("categoria");

    if (!select) return;

    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    select.innerHTML = `
        <option value="">Selecione a Categoria</option>
    `;

    categorias.forEach(categoria => {

        select.innerHTML += `
            <option value="${categoria.nome}">
                ${categoria.nome}
            </option>
        `;

    });

}

// ======================================
// Atualizar Resumo
// ======================================

function atualizarResumo() {

    let estoque = 0;
    let valor = 0;

    produtos.forEach(produto => {

        estoque += Number(produto.quantidade);
        valor += Number(produto.quantidade) * Number(produto.custo);

    });

    const totalProdutos = document.getElementById("totalProdutos");
    const totalEstoque = document.getElementById("totalEstoque");
    const valorEstoque = document.getElementById("valorEstoque");

    if (totalProdutos) {
        totalProdutos.innerText = produtos.length;
    }

    if (totalEstoque) {
        totalEstoque.innerText = estoque;
    }

    if (valorEstoque) {
        valorEstoque.innerText = valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

}
// ======================================
// Atualizar Tabela
// ======================================

function atualizarTabela(lista = produtos){

    const tabela = document.getElementById("tabelaProdutos");

    if (!tabela) return;

    tabela.innerHTML = "";

    if (lista.length === 0) {
    tabela.innerHTML = `
        <tr>
            <td colspan="9" style="text-align:center;">
                Nenhum produto cadastrado.
            </td>
        </tr>
    `;

    atualizarResumo();
    return;
}

    lista.forEach((item) => {

      const indiceReal = produtos.findIndex(
    p => (p.codigo || "").toUpperCase() === (item.codigo || "").toUpperCase()
);

        tabela.innerHTML += `
        <tr>
           <td>${escaparHTML(item.codigo)}</td>
           <td>${escaparHTML(item.produto)}</td>
           <td>${escaparHTML(item.categoria)}</td>
           <td>${escaparHTML(item.tamanho)}</td>
           <td>${escaparHTML(item.cor)}</td>

            <td>${Number(item.custo).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>

            <td>${Number(item.venda).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>

            <td>${Number(item.quantidade || 0)}</td>

            <td>
                <button class="btn btn-editar" onclick="editarProduto(${indiceReal})">
                    ✏️
                </button>

                <button class="btn btn-excluir" onclick="excluirProduto(${indiceReal})">
                    🗑️
                </button>
            </td>
        </tr>
        `;
    });

    atualizarResumo();
}

// ======================================
// Limpar Formulário
// ======================================

function limparFormulario() {

    document.getElementById("codigo").value = "";
    document.getElementById("produto").value = "";

    carregarCategorias();
    
  const categoria = document.getElementById("categoria");

if (categoria) {
    categoria.selectedIndex = 0;
}
    document.getElementById("tamanho").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("custo").value = "";
    document.getElementById("venda").value = "";
    document.getElementById("quantidade").value = "";

    indiceEdicao = -1;
const botao = document.getElementById("btnSalvar");

if (botao) {

    botao.textContent = "Cadastrar Produto";

}

const codigo = document.getElementById("codigo");

if (codigo) {
    codigo.focus();
    codigo.disabled = false;
}
}
// ======================================
// Adicionar Produto
// ======================================

function adicionarProduto() {

    const codigo = document.getElementById("codigo").value.trim().toUpperCase();
    const produto = document.getElementById("produto").value.trim();
    const categoria = document.getElementById("categoria").value;
    const tamanho = document.getElementById("tamanho").value;
    const cor = document.getElementById("cor").value.trim();
    const custo = parseFloat(document.getElementById("custo").value);
    const venda = parseFloat(document.getElementById("venda").value);
    const quantidade = parseInt(document.getElementById("quantidade").value, 10);

    if (
        !codigo ||
        !produto ||
        !categoria ||
        !tamanho ||
        !cor ||
        isNaN(custo) ||
        isNaN(venda) ||
        isNaN(quantidade)
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    if (quantidade < 0) {
        alert("A quantidade não pode ser negativa.");
        return;
    }

    if (custo < 0 || venda < 0) {
        alert("Os preços não podem ser negativos.");
        return;
    }

    if (indiceEdicao === -1) {

        if (produtos.some(p => (p.codigo || "").toUpperCase() === codigo)) {
            alert("Já existe um produto com esse código.");
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

    } else {

        produtos[indiceEdicao] = {
            codigo,
            produto,
            categoria,
            tamanho,
            cor,
            custo,
            venda,
            quantidade
        };

    }

    alert(
        indiceEdicao >= 0
            ? "Produto atualizado com sucesso!"
            : "Produto cadastrado com sucesso!"
    );

    salvarProdutos();
    carregarCategorias();
    atualizarTabela();

    if (typeof atualizarDashboard === "function") {
        atualizarDashboard();
    }

    window.dispatchEvent(new Event("storage"));

    limparFormulario();
}

// ======================================
// Editar Produto
// ======================================

function editarProduto(indice){

    if (!produtos[indice]) {
    alert("Produto não encontrado.");
    return;
}

    const p = produtos[indice];

    carregarCategorias();

    document.getElementById("codigo").value = p.codigo;
    document.getElementById("produto").value = p.produto;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("tamanho").value = p.tamanho;
    document.getElementById("cor").value = p.cor;
    document.getElementById("custo").value = p.custo;
    document.getElementById("venda").value = p.venda;
    document.getElementById("quantidade").value = p.quantidade;

    indiceEdicao = indice;
const botao = document.getElementById("btnSalvar");

if (botao) {

    botao.textContent = "Atualizar Produto";

}

window.scrollTo({

    top: 0,
    behavior: "smooth"

});

const codigo = document.getElementById("codigo");

if (codigo) {
    codigo.focus();
    codigo.disabled = true;
}
}
// ======================================
// Excluir Produto
// ======================================

function excluirProduto(indice){

    const produto = produtos[indice];

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const vendas = JSON.parse(localStorage.getItem("vendas")) || [];

    const possuiVendas = vendas.some(v =>
        v.produto &&
        v.produto.trim().toLowerCase() ===
        produto.produto.trim().toLowerCase()
    );

    if (possuiVendas) {
        alert("Este produto possui vendas registradas e não pode ser excluído.");
        return;
    }

    if(confirm("Deseja excluir este produto?")){

        produtos.splice(indice,1);

        salvarProdutos();

      carregarCategorias();

      atualizarTabela();

        if (typeof atualizarDashboard === "function") {
    atualizarDashboard();
}

limparFormulario();

window.dispatchEvent(new Event("storage"));

        alert("Produto excluído com sucesso!");
    }
}
// ======================================
// Pesquisa
// ======================================

function pesquisarProduto(){

 const pesquisa = document.getElementById("pesquisa");

if (!pesquisa) return;

const texto = pesquisa.value.trim().toLowerCase();

const resultado = produtos.filter(p => {

    const codigo = (p.codigo || "").toLowerCase();
    const produto = (p.produto || "").toLowerCase();
    const categoria = (p.categoria || "").toLowerCase();
    const cor = (p.cor || "").toLowerCase();
    const tamanho = (p.tamanho || "").toLowerCase();

    return (
        codigo.includes(texto) ||
        produto.includes(texto) ||
        categoria.includes(texto) ||
        cor.includes(texto) ||
        tamanho.includes(texto)
    );

});
    atualizarTabela(resultado);

}

// ======================================
// Inicialização
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener("storage", () => {

        produtos = JSON.parse(localStorage.getItem("produtos")) || [];

        carregarCategorias();
        atualizarTabela();

    });

    carregarCategorias();
    atualizarTabela();

    if (document.getElementById("codigo")) {
        limparFormulario();
    }

});
// ======================================
// Imprimir Produtos
// ======================================

function imprimirTabela() {

    window.print();

}
function escaparHTML(texto) {
    return String(texto ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
