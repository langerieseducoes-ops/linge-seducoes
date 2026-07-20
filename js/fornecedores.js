// ======================================
// Linge & Seduções ERP
// Módulo de Fornecedores
// ======================================

let fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

// Salvar fornecedores
function salvarFornecedores() {
    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
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

  const campoEmpresa = document.getElementById("empresaFornecedor");
const campoContato = document.getElementById("contatoFornecedor");
const campoTelefone = document.getElementById("telefoneFornecedor");
const campoEmail = document.getElementById("emailFornecedor");

if (!campoEmpresa || !campoContato || !campoTelefone || !campoEmail) return;

const empresa = campoEmpresa.value.trim();
const contato = campoContato.value.trim();
const telefone = campoTelefone.value.trim();
const email = campoEmail.value.trim();

    if (!empresa) {
        alert("Informe o nome da empresa.");
        return;
    }

    fornecedores.push({
        empresa,
        contato,
        telefone,
        email,
        data: new Date().toLocaleString("pt-BR")
    });

    salvarFornecedores();

 campoEmpresa.value = "";
campoContato.value = "";
campoTelefone.value = "";
campoEmail.value = "";

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
            <td>${fornecedor.empresa}</td>
            <td>${fornecedor.contato}</td>
            <td>${fornecedor.telefone}</td>
            <td>${fornecedor.email}</td>
            <td>
                <button class="btn btn-excluir"
                    onclick="excluirFornecedor(${index})">
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
