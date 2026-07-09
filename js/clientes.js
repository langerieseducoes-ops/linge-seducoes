// ======================================
// Linge & Seduções ERP
// Módulo de Clientes
// ======================================

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];


// Salvar clientes
function salvarClientes(){

    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

}


// Cadastrar cliente
function cadastrarCliente(){

    const nome = document.getElementById("nomeCliente").value.trim();
    const telefone = document.getElementById("telefoneCliente").value.trim();
    const email = document.getElementById("emailCliente").value.trim();


    if(!nome){

        alert("Informe o nome do cliente.");
        return;

    }


    clientes.push({

        nome,
        telefone,
        email,
        data: new Date().toLocaleString("pt-BR")

    });


    salvarClientes();

    alert("Cliente cadastrado com sucesso!");

}


// Listar clientes

function listarClientes(){

    const tabela = document.getElementById("tabelaClientes");


    if(!tabela) return;


    tabela.innerHTML = "";


    clientes.forEach((cliente,index)=>{


        tabela.innerHTML += `

        <tr>

        <td>${cliente.nome}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.email}</td>

        <td>

        <button onclick="excluirCliente(${index})">
        🗑️
        </button>

        </td>

        </tr>

        `;


    });


}



// Excluir cliente

function excluirCliente(index){


    if(confirm("Excluir cliente?")){


        clientes.splice(index,1);

        salvarClientes();

        listarClientes();


    }


}



// Inicialização

document.addEventListener("DOMContentLoaded",()=>{

    listarClientes();

});
