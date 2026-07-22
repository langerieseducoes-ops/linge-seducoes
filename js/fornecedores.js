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

if (!contato) {
    alert("Informe o nome do contato.");
    return;
}

if (!telefone) {
    alert("Informe o telefone.");
    return;
}

if (!email) {
    alert("Informe o e-mail.");
    return;
}

const fornecedorExistente = fornecedores.find(f =>
    f.empresa.toLowerCase() === empresa.toLowerCase() &&
    f.telefone === telefone
);

if (fornecedorExistente) {
    alert("Este fornecedor já está cadastrado.");
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
campoEmpresa.focus();
    
    listarFornecedores();

if (typeof atualizarDashboard === "function") {
    atualizarDashboard();
}

window.dispatchEvent(new Event("storage"));
    
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

    const fornecedor = fornecedores[index];

    if (!fornecedor) {
        alert("Fornecedor não encontrado.");
        return;
    }

    const compras = JSON.parse(localStorage.getItem("compras")) || [];

   const possuiCompras = compras.some(c =>
    c.fornecedor &&
    c.fornecedor.trim().toLowerCase() ===
    fornecedor.empresa.trim().toLowerCase()
);

    if (possuiCompras) {
        alert("Este fornecedor possui compras registradas e não pode ser excluído.");
        return;
    }

    if (!confirm("Excluir fornecedor?")) {
        return;
    }

    fornecedores.splice(index, 1);

    salvarFornecedores();

    listarFornecedores();

   if (typeof atualizarDashboard === "function") {
    atualizarDashboard();
}

window.dispatchEvent(new Event("storage"));
    
    alert("Fornecedor excluído com sucesso!");

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
