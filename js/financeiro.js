// ======================================
// Linge & Seduções ERP
// Módulo Financeiro
// ======================================

let financeiro = JSON.parse(localStorage.getItem("financeiro")) || [];

// ======================================
// Salvar
// ======================================

function salvarFinanceiro() {
    localStorage.setItem("financeiro", JSON.stringify(financeiro));
}

// ======================================
// Formatar Moeda
// ======================================

function moeda(valor) {
    return (Number(valor) || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ======================================
// Atualizar Resumo
// ======================================

function atualizarResumoFinanceiro() {

    let entradas = 0;
    let saidas = 0;

    financeiro.forEach(item => {

        const valor = Number(item.valor) || 0;

if (item.tipo === "Entrada") {
    entradas += valor;
} else if (item.tipo === "Saída") {
    saidas += valor;
}
    });

    const saldo = entradas - saidas;

    atualizarElemento("totalEntradas", moeda(entradas));
    atualizarElemento("totalSaidas", moeda(saidas));
    atualizarElemento("saldoFinanceiro", moeda(saldo));

}

// ======================================
// Atualizar Elemento
// ======================================

function atualizarElemento(id, valor) {

    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.innerText = valor;
    }

}

// ======================================
// Cadastrar Lançamento
// ======================================

function cadastrarLancamento() {

   const campoTipo = document.getElementById("tipo");
const campoDescricao = document.getElementById("descricao");
const campoValor = document.getElementById("valor");
const campoData = document.getElementById("data");

if (!campoTipo || !campoDescricao || !campoValor || !campoData) {
    return;
}

const tipo = campoTipo.value;
const descricao = campoDescricao.value.trim();
const valor = parseFloat(campoValor.value);
const data = campoData.value;
    if (
        descricao === "" ||
        isNaN(valor) ||
        valor <= 0 ||
        data === ""
    ) {
        alert("Preencha todos os campos.");
        return;
    }
    
    if (tipo === "") {
    alert("Selecione o tipo.");
    return;
}

    financeiro.push({

        tipo,
        descricao,
        valor,
        data

    });
    

    salvarFinanceiro();

    campoDescricao.value = "";
campoValor.value = "";
campoData.value = "";
campoTipo.value = "";
    listarFinanceiro();

    if (typeof atualizarDashboard === "function") {
        atualizarDashboard();
    }

    window.dispatchEvent(new Event("storage"));

    alert("Lançamento realizado com sucesso!");

}

// ======================================
// Listar Financeiro
// ======================================

function listarFinanceiro() {

    const tabela = document.getElementById("tabelaFinanceiro");

    if (!tabela) return;

    tabela.innerHTML = "";

    financeiro.forEach((item, indice) => {

        tabela.innerHTML += `
        <tr>
            <td>${item.data}</td>
            <td>${item.tipo}</td>
            <td>${item.descricao}</td>
            <td>${moeda(item.valor)}</td>
            <td>
                <button
                    class="btn btn-excluir"
                    onclick="excluirLancamento(${indice})">
                    🗑️
                </button>
            </td>
        </tr>
        `;

    });

    atualizarResumoFinanceiro();

}

// ======================================
// Excluir
// ======================================

function excluirLancamento(indice) {

    const item = financeiro[indice];

    if (!item) {
        alert("Lançamento não encontrado.");
        return;
    }

    if (!confirm("Deseja excluir este lançamento?")) {
        return;
    }

    financeiro.splice(indice, 1);

    salvarFinanceiro();

    listarFinanceiro();

    if (typeof atualizarDashboard === "function") {
        atualizarDashboard();
    }

    window.dispatchEvent(new Event("storage"));

    alert("Lançamento excluído com sucesso!");

}
// ======================================
// Pesquisar
// ======================================

function pesquisarFinanceiro() {

    const pesquisa = document.getElementById("pesquisa");

    if (!pesquisa) return;

    const texto = pesquisa.value.toLowerCase();

    document.querySelectorAll("#tabelaFinanceiro tr").forEach(linha => {

        linha.style.display =
            linha.innerText.toLowerCase().includes(texto)
                ? ""
                : "none";

    });

}

// ======================================
// Inicialização
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    listarFinanceiro();

});
