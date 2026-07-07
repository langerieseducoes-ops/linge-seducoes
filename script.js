let produtos = [];

function adicionarProduto() {

    const codigo = document.getElementById("codigo").value;
    const produto = document.getElementById("produto").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if (codigo === "" || produto === "" || isNaN(quantidade)) {
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

                    <button onclick="excluirProduto(${indice})">
                    Excluir
                    </button>

                </td>

            </tr>
        `;

    });

}

function entrada(indice){

    produtos[indice].quantidade++;

    atualizarTabela();

}

function saida(indice){

    if(produtos[indice].quantidade>0){

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
