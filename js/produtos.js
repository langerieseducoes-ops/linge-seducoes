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

    lista.forEach((item, indice)=>{

        tabela.innerHTML += `
        <tr>
            <td>${item.codigo}</td>
            <td>${item.produto}</td>
            <td>${item.categoria}</td>
            <td>${item.tamanho}</td>
            <td>${item.cor}</td>
 <td>${Number(item.custo).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
})}</td>

<td>${Number(item.venda).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
})}</td>
            <td>${item.quantidade}</td>

            <td>
                <button class="btn btn-editar" onclick="editarProduto(${indice})">
                    ✏️
                </button>

                <button class="btn btn-excluir" onclick="excluirProduto(${indice})">
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
    document.getElementById("categoria").selectedIndex = 0;

    document.getElementById("tamanho").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("custo").value = "";
    document.getElementById("venda").value = "";
    document.getElementById("quantidade").value = "";

    indiceEdicao = -1;

}
// ======================================
// Adicionar Produto
// ======================================

function adicionarProduto(){

    const codigo = document.getElementById("codigo").value.trim();
    const produto = document.getElementById("produto").value.trim();
    const categoria = document.getElementById("categoria").value;
    const tamanho = document.getElementById("tamanho").value;
    const cor = document.getElementById("cor").value.trim();
    const custo = parseFloat(document.getElementById("custo").value);
    const venda = parseFloat(document.getElementById("venda").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if(
    !codigo ||
    !produto ||
    !categoria ||
    !cor ||
    isNaN(custo) ||
    isNaN(venda) ||
    isNaN(quantidade)
){
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

if(indiceEdicao === -1){

        if(produtos.some(p => p.codigo === codigo)){
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

    }else{

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

salvarProdutos();

limparFormulario();

carregarCategorias();

atualizarTabela();

}
// ======================================
// Editar Produto
// ======================================

function editarProduto(indice){

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

}

// ======================================
// Excluir Produto
// ======================================

function excluirProduto(indice){

    if(confirm("Deseja excluir este produto?")){

        produtos.splice(indice,1);

        salvarProdutos();
        
        produtos = JSON.parse(localStorage.getItem("produtos")) || [];
       
        carregarCategorias();

        atualizarTabela();

    }

}

// ======================================
// Pesquisa
// ======================================

function pesquisarProduto(){

    const texto = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const resultado = produtos.filter(p=>

        p.produto.toLowerCase().includes(texto) ||
        p.codigo.toLowerCase().includes(texto) ||
        p.categoria.toLowerCase().includes(texto)

    );

    atualizarTabela(resultado);

}

// ======================================
// Inicialização
// ======================================

document.addEventListener("DOMContentLoaded", () => {
window.addEventListener("storage", () => {

    carregarCategorias();

});
    produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    carregarCategorias();

    atualizarTabela();

});
// ======================================
// Imprimir Produtos
// ======================================

function imprimirTabela() {

    window.print();

}
