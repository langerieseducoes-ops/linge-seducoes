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
    return Number(valor).toLocaleString("pt-BR", {
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

        if (item.tipo === "Entrada") {
            entradas += Number(item.valor);
        } else {
            saidas += Number(item.valor);
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

    const tipo = document.getElementById("tipo").value;
    const descricao = document.getElementById("descricao").value.trim();
    const valor = parseFloat(document.getElementById("valor").value);
    const data = document.getElementById("data").value;

    if (
        descricao === "" ||
        isNaN(valor) ||
        valor <= 0 ||
        data === ""
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    financeiro.push({

        tipo,
        descricao,
        valor,
        data

    });

    salvarFinanceiro();

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";

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
