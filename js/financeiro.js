// ======================================
// Financeiro - Linge & Seduções ERP
// ======================================

let financeiro = JSON.parse(localStorage.getItem("financeiro")) || [];

atualizarTabela();

function salvarDados(){
    localStorage.setItem("financeiro", JSON.stringify(financeiro));
}

function salvarMovimento(){

    const tipo = document.getElementById("tipo").value;
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const data = document.getElementById("data").value;

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

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";

}

function atualizarTabela(){

    let tabela = document.getElementById("tabelaFinanceiro");

    tabela.innerHTML = "";

    let entradas = 0;
    let saidas = 0;

    financeiro.forEach((movimento, indice)=>{

        if(movimento.tipo == "Entrada"){
            entradas += movimento.valor;
        }else{
            saidas += movimento.valor;
        }

        tabela.innerHTML += `
        <tr>

            <td>${movimento.data}</td>

            <td>${movimento.tipo}</td>

            <td>${movimento.descricao}</td>

            <td>${movimento.valor.toLocaleString("pt-BR",{
                style:"currency",
                currency:"BRL"
            })}</td>

            <td>

                <button onclick="excluir(${indice})">
                Excluir
                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("totalEntradas").innerHTML =
        entradas.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

    document.getElementById("totalSaidas").innerHTML =
        saidas.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

    document.getElementById("saldoAtual").innerHTML =
        (entradas-saidas).toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

}

function excluir(indice){

    if(confirm("Excluir este lançamento?")){

        financeiro.splice(indice,1);

        salvarDados();

        atualizarTabela();

    }

}
