// Carrega os produtos salvos ou inicia vazio
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Salva os produtos no navegador
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Atualiza a tabela
function atualizarTabela() {

    const tabela = document.getElementById("tabelaProdutos");
    tabela.innerHTML = "";

    produtos.forEach((item, indice) => {

        tabela.innerHTML += `
        <tr>
            <td>${item.codigo}</td>
            <td>${item.produto}</td>
            <td>${item.quantidade}</td>

            <td>
                <button onclick="entrada(${indice})">+</button>
                <button onclick="saida(${indice})">-</button>
                <button onclick="excluirProduto(${indice})">Excluir</button>
            </td>
        </tr>
        `;
    });
document.getElementById("totalProdutos").innerHTML = produtos.length;

let estoque = 0;

produtos.forEach(item=>{

    estoque += item.quantidade;

});

document.getElementById("totalEstoque").innerHTML = estoque;
    salvarDados();
}

// Adicionar produto
function adicionarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const produto = document.getElementById("produto").value.trim();
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if (!codigo || !produto || isNaN(quantidade)) {
        alert("Preencha todos os campos.");
        return;
    }

    produtos.push({
        codigo,
        produto,
        quantidade
    });

    atualizarTabela();

    document.getElementById("codigo").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
}

function entrada(indice){
    produtos[indice].quantidade++;
    atualizarTabela();
}

function saida(indice){

    if(produtos[indice].quantidade > 0){
        produtos[indice].quantidade--;
    }

    atualizarTabela();
}

function excluirProduto(indice){

    if(confirm("Deseja excluir este produto?")){
        produtos.splice(indice,1);
        atualizarTabela();
    }

}

// Mostra os produtos ao abrir a página
atualizarTabela();
function pesquisarProduto(){

    const texto = document
    .getElementById("pesquisa")
    .value
    .toLowerCase();

    const linhas = document.querySelectorAll("#tabelaProdutos tr");

    linhas.forEach(linha=>{

        if(linha.innerText.toLowerCase().includes(texto)){

            linha.style.display="";

        }else{

            linha.style.display="none";

        }

    });

}
