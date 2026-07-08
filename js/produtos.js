// ======================================
// Linge & Seduções ERP
// Módulo de Produtos
// Parte 1
// ======================================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let indiceEdicao = -1;

// Salvar no LocalStorage
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Limpar formulário
function limparFormulario() {
    document.getElementById("codigo").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("tamanho").value = "P";
    document.getElementById("cor").value = "";
    document.getElementById("custo").value = "";
    document.getElementById("venda").value = "";
    document.getElementById("quantidade").value = "";

    indiceEdicao = -1;
}

// Atualizar os cartões do topo
function atualizarResumo(){

    document.getElementById("totalProdutos").innerText = produtos.length;

    let estoque = 0;
    let valor = 0;

    produtos.forEach(p=>{

        estoque += p.quantidade;
        valor += p.quantidade * p.custo;

    });

    document.getElementById("totalEstoque").innerText = estoque;

    document.getElementById("valorEstoque").innerText =
    valor.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });
}
// ======================================
// Atualizar Tabela
// ======================================

function atualizarTabela(lista = produtos){

    const tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    lista.forEach((item, indice)=>{

        tabela.innerHTML += `
        <tr>
            <td>${item.codigo}</td>
            <td>${item.produto}</td>
            <td>${item.categoria}</td>
            <td>${item.tamanho}</td>
            <td>${item.cor}</td>
            <td>R$ ${Number(item.custo).toFixed(2)}</td>
            <td>R$ ${Number(item.venda).toFixed(2)}</td>
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
// Adicionar Produto
// ======================================

function adicionarProduto(){

    const codigo = document.getElementById("codigo").value.trim();
    const produto = document.getElementById("produto").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
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
    atualizarTabela();

}
// ======================================
// Editar Produto
// ======================================

function editarProduto(indice){

    const p = produtos[indice];

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

atualizarTabela();
