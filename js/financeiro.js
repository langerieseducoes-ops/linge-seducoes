// ======================================
// Financeiro - Linge & Seduções ERP
// ======================================

let financeiro = JSON.parse(localStorage.getItem("financeiro")) || [];

function salvarDados(){
    localStorage.setItem("financeiro", JSON.stringify(financeiro));
}

function salvarMovimento(){

   const campoTipo = document.getElementById("tipo");
const campoDescricao = document.getElementById("descricao");
const campoValor = document.getElementById("valor");
const campoData = document.getElementById("data");

if (!campoTipo || !campoDescricao || !campoValor || !campoData) return;

const tipo = campoTipo.value;
const descricao = campoDescricao.value.trim();
const valor = parseFloat(campoValor.value);
const data = campoData.value;

    if(descricao == "" || isNaN(valor) || data == ""){
        alert("Preencha todos os campos.");
        return;
    }

    financeiro.push({
        tipo,
        descricao,
        valor,
        data
    });

    salvarDados();

    limparFormulario();

    atualizarTabela();

}

function limparFormulario(){

    const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const data = document.getElementById("data");

if (descricao) descricao.value = "";
if (valor) valor.value = "";
if (data) data.value = "";

}

function atualizarTabela(){

    let tabela = document.getElementById("tabelaFinanceiro");

if (!tabela) return;

tabela.innerHTML = "";
    
    let entradas = 0;
    let saidas = 0;

    financeiro.forEach((movimento, indice)=>{

        if(movimento.tipo == "Entrada"){
      entradas += Number(movimento.valor);
        }else{
     saidas += Number(movimento.valor);
        }

        tabela.innerHTML += `
        <tr>

            <td>${movimento.data}</td>

            <td>${movimento.tipo}</td>

            <td>${movimento.descricao}</td>

           <td>${Number(movimento.valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })}</td>

            <td>

                <button onclick="excluir(${indice})">
                Excluir
                </button>

            </td>

        </tr>
        `;

    });

   const totalEntradas = document.getElementById("totalEntradas");
const totalSaidas = document.getElementById("totalSaidas");
const saldoAtual = document.getElementById("saldoAtual");

if (totalEntradas) {
    totalEntradas.innerHTML = entradas.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

if (totalSaidas) {
    totalSaidas.innerHTML = saidas.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

if (saldoAtual) {
    saldoAtual.innerHTML = (entradas - saidas).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

}

function excluir(indice){

    if(confirm("Excluir este lançamento?")){

        financeiro.splice(indice,1);

        salvarDados();

        atualizarTabela();

    }

}
document.addEventListener("DOMContentLoaded", () => {
    atualizarTabela();
});
