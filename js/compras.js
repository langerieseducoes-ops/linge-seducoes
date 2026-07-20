// ======================================
// Linge & Seduções ERP
// Módulo de Compras
// ======================================

let compras = JSON.parse(localStorage.getItem("compras")) || [];
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

// ======================================
// Carregar Fornecedores
// ======================================

function carregarFornecedores(){

  const select = document.getElementById("fornecedorCompra");

if (!select) return;

select.innerHTML = '<option value="">Selecione o fornecedor</option>';
    
    fornecedores.forEach((f, indice)=>{

        select.innerHTML += `
            <option value="${indice}">
                ${f.empresa}
            </option>
        `;

    });

}

// ======================================
// Carregar Produtos
// ======================================

function carregarProdutos(){

    const select = document.getElementById("produtoCompra");

if (!select) return;

select.innerHTML = '<option value="">Selecione o produto</option>';

    produtos.forEach((p, indice)=>{

        select.innerHTML += `
            <option value="${indice}">
                ${p.produto}
            </option>
        `;

    });

}

// ======================================
// Registrar Compra
// ======================================

function registrarCompra(){

    const campoFornecedor = document.getElementById("fornecedorCompra");
const campoProduto = document.getElementById("produtoCompra");
const campoQuantidade = document.getElementById("quantidadeCompra");
const campoCusto = document.getElementById("custoCompra");

if (!campoFornecedor || !campoProduto || !campoQuantidade || !campoCusto) {
    return;
}

const fornecedor = campoFornecedor.value;
const produtoIndice = campoProduto.value;
const quantidade = Number(campoQuantidade.value);
const custo = Number(campoCusto.value);

    if(
        fornecedor === "" ||
        produtoIndice === "" ||
        quantidade <= 0 ||
        custo <= 0
    ){
        alert("Preencha todos os campos.");
        return;
    }

    produtos[produtoIndice].quantidade =
        Number(produtos[produtoIndice].quantidade) + quantidade;

    produtos[produtoIndice].custo = custo;

    const compra = {

        data:new Date().toLocaleString("pt-BR"),

        fornecedor:fornecedores[fornecedor].empresa,

        produto:produtos[produtoIndice].produto,

        quantidade:quantidade,

        valor:quantidade*custo

    };

    compras.push(compra);

    localStorage.setItem("compras",JSON.stringify(compras));
    localStorage.setItem("produtos",JSON.stringify(produtos));

if (typeof atualizarDashboard === "function") {
    atualizarDashboard();
}

window.dispatchEvent(new Event("storage"));
  
    let financeiro =
    JSON.parse(localStorage.getItem("financeiro")) || [];

    financeiro.push({

        tipo:"Saída",

        descricao:"Compra - "+produtos[produtoIndice].produto,

        valor:quantidade*custo,

        data:new Date().toLocaleDateString("pt-BR")

    });

    localStorage.setItem("financeiro",JSON.stringify(financeiro));

  atualizarTabela();

carregarProdutos();
carregarFornecedores();

   campoFornecedor.value = "";
campoProduto.value = "";
campoQuantidade.value = "";
campoCusto.value = "";

    alert("Compra registrada com sucesso!");

}

// ======================================
// Atualizar Tabela
// ======================================

function atualizarTabela(){

  const tabela = document.getElementById("tabelaCompras");

if (!tabela) return;

tabela.innerHTML = "";

    let total=0;

   compras.forEach((c, indice)=>{
       
        total+=Number(c.valor);

        tabela.innerHTML+=`

<tr>

<td>${c.data}</td>
<td>${c.fornecedor}</td>
<td>${c.produto}</td>
<td>${c.quantidade}</td>

<td>${Number(c.valor).toLocaleString("pt-BR",{

style:"currency",
currency:"BRL"

})}</td>

<td>
    <button
        class="btn btn-excluir"
        onclick="excluirCompra(${indice})">
        🗑️
    </button>
</td>

</tr>

`;

    });
const totalCompras = document.getElementById("totalCompras");
const valorCompras = document.getElementById("valorCompras");

if (totalCompras) {
    totalCompras.innerHTML = compras.length;
}

if (valorCompras) {
    valorCompras.innerHTML = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}
}
// ======================================

document.addEventListener("DOMContentLoaded",()=>{

    carregarFornecedores();

    carregarProdutos();

    atualizarTabela();

});
// ======================================
// Excluir Compra
// ======================================

function excluirCompra(indice){

    if(!confirm("Deseja excluir esta compra?")){
        return;
    }

    const compra = compras[indice];

    if (!compra) {
        alert("Compra não encontrada.");
        return;
    }

    // Devolve o estoque ao estado anterior
    const produto = produtos.find(p => p.produto === compra.produto);

    if(produto){
      produto.quantidade = Math.max(
    0,
    Number(produto.quantidade) - Number(compra.quantidade)
);
    }
    // Remove lançamento do financeiro
    let financeiro =
    JSON.parse(localStorage.getItem("financeiro")) || [];

    financeiro = financeiro.filter(f => !(
        f.tipo === "Saída" &&
        f.descricao === "Compra - " + compra.produto &&
        Number(f.valor) === Number(compra.valor)
    ));

    localStorage.setItem("financeiro", JSON.stringify(financeiro));

    // Remove compra
    compras.splice(indice,1);

    // Salva
    localStorage.setItem("compras", JSON.stringify(compras));
    localStorage.setItem("produtos", JSON.stringify(produtos));

atualizarTabela();

carregarProdutos();
carregarFornecedores();
  
if (typeof atualizarDashboard === "function") {
    atualizarDashboard();
}

window.dispatchEvent(new Event("storage"));
  
    alert("Compra excluída com sucesso!");

}
