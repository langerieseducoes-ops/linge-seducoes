// ======================================
// Linge & Seduções ERP
// Módulo de Clientes
// ======================================

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// Salvar clientes
function salvarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

// Atualizar resumo
function atualizarResumoClientes() {

    const total = document.getElementById("totalClientes");

    if (total) {
        total.innerText = clientes.length;
    }

}

// Cadastrar cliente
function cadastrarCliente() {

  const campoNome = document.getElementById("nomeCliente");
const campoTelefone = document.getElementById("telefoneCliente");
const campoEmail = document.getElementById("emailCliente");

if (!campoNome || !campoTelefone || !campoEmail) return;

const nome = campoNome.value.trim();
const telefone = campoTelefone.value.trim();
const email = campoEmail.value.trim();

    if (!nome) {
        alert("Informe o nome do cliente.");
        return;
    }

const clienteExistente = clientes.find(c =>
    c.nome.toLowerCase() === nome.toLowerCase() &&
    c.telefone === telefone
);

if (clienteExistente) {
    alert("Este cliente já está cadastrado.");
    return;
}

if (telefone === "") {
    alert("Informe o telefone do cliente.");
    return;
}

if (email === "") {
    alert("Informe o e-mail do cliente.");
    return;
}
    
    clientes.push({
        nome,
        telefone,
        email,
        data: new Date().toLocaleString("pt-BR")
    });

    salvarClientes();

    campoNome.value = "";
campoTelefone.value = "";
campoEmail.value = "";
    campoNome.focus();

    listarClientes();

if (typeof atualizarDashboard === "function") {
    atualizarDashboard();
}

window.dispatchEvent(new Event("storage"));
    
    alert("Cliente cadastrado com sucesso!");
}
// Listar clientes
function listarClientes() {

    const tabela = document.getElementById("tabelaClientes");

    if (!tabela) return;

    tabela.innerHTML = "";

    clientes.forEach((cliente, index) => {

        tabela.innerHTML += `
        <tr>
            <td>${cliente.nome}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.email}</td>
            <td>
                <button class="btn btn-excluir" onclick="excluirCliente(${index})">
                    🗑️
                </button>
            </td>
        </tr>
        `;

    });

    atualizarResumoClientes();

}

// Excluir cliente
function excluirCliente(index) {

const cliente = clientes[index];

if (!cliente) {
    alert("Cliente não encontrado.");
    return;
}

const vendas = JSON.parse(localStorage.getItem("vendas")) || [];

const possuiVendas = vendas.some(v =>
    v.cliente &&
    v.cliente.trim().toLowerCase() ===
    cliente.nome.trim().toLowerCase()
);

if (possuiVendas) {
    alert("Este cliente possui vendas registradas e não pode ser excluído.");
    return;
}
    
    if (!confirm("Excluir cliente?")) {
        return;
    }
        clientes.splice(index, 1);

salvarClientes();

listarClientes();

if (typeof atualizarDashboard === "function") {
    atualizarDashboard();
}

window.dispatchEvent(new Event("storage"));

alert("Cliente excluído com sucesso!");
}

// Pesquisar Cliente
function pesquisarCliente() {

    const pesquisa = document.getElementById("pesquisaCliente");

    if (!pesquisa) return;

    const texto = pesquisa.value.toLowerCase();

    const linhas = document.querySelectorAll("#tabelaClientes tr");

    linhas.forEach(linha => {

        linha.style.display = linha.innerText.toLowerCase().includes(texto)
            ? ""
            : "none";

    });

}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {

    listarClientes();

});
