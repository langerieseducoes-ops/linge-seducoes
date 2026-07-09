// ======================================
// Linge & Seduções ERP
// Módulo de Fornecedores
// ======================================

let fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

// Salvar fornecedores
function salvarFornecedores() {
    localStorage.setItem(
        "fornecedores",
        JSON.stringify(fornecedores)
    );
}

// Atualizar resumo
function atualizarResumoFornecedores() {

    const total = document.getElementById("totalFornecedores");

    if (total) {
        total.innerText = fornecedores.length;
    }

}

// Cadastrar fornecedor
function cadastrarFornecedor() {

    const nome = document.getElementById("nomeFornecedor").value.trim();
    const telefone = document.getElementById("telefoneFornecedor").value.trim();
    const email = document.getElementById("emailFornecedor").value.trim();

    if (!nome) {
        alert("Informe o nome do fornecedor.");
        return;
    }

    fornecedores.push({
        nome,
        telefone,
        email,
        data: new Date().toLocaleString("pt-BR")
    });

    salvarFornecedores();

    document.getElementById("nomeFornecedor").value = "";
    document.getElementById("telefoneFornecedor").value = "";
    document.getElementById("emailFornecedor").value = "";

    listarFornecedores();

    alert("Fornecedor cadastrado com sucesso!");

}

// Listar fornecedores
function listarFornecedores() {

    const tabela = document.getElementById("tabelaFornecedores");

    if (!tabela) return;

    tabela.innerHTML = "";

    fornecedores.forEach((fornecedor, index) => {

        tabela.innerHTML += `
        <tr>
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.telefone}</td>
            <td>${fornecedor.email}</td>
            <td>
                <button class="btn btn-excluir" onclick="excluirFornecedor(${index})">
                    🗑️
                </button>
            </td>
        </tr>
        `;

    });

    atualizarResumoFornecedores();

}

// Excluir fornecedor
function excluirFornecedor(index) {

    if (confirm("Excluir fornecedor?")) {

        fornecedores.splice(index, 1);

        salvarFornecedores();

        listarFornecedores();

    }

}

// Pesquisar fornecedor
function pesquisarFornecedor() {

    const pesquisa = document.getElementById("pesquisaFornecedor");

    if (!pesquisa) return;

    const texto = pesquisa.value.toLowerCase();

    const linhas = document.querySelectorAll("#tabelaFornecedores tr");

    linhas.forEach(linha => {

        linha.style.display = linha.innerText.toLowerCase().includes(texto)
            ? ""
            : "none";

    });

}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {

    listarFornecedores();

});
