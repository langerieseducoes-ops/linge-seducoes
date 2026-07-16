// ======================================
// Linge & Seduções ERP
// Módulo de Usuários
// ======================================

// Banco de usuários

let usuarios =
JSON.parse(localStorage.getItem("usuarios")) || [];

let indiceEdicao = -1;

// ======================================
// Primeiro acesso
// ======================================

if (usuarios.length === 0) {

    usuarios = [

        {
            id:1,
            nome:"Administrador",
            usuario:"admin",
            senha:"1234",
            perfil:"Admin",
            ativo:true,
            cadastro:new Date().toLocaleDateString("pt-BR"),
            ultimoLogin:""
        }

    ];

    salvarUsuarios();

}

// ======================================
// Salvar Banco
// ======================================

function salvarUsuarios(){

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}
// ======================================
// Atualizar Tabela
// ======================================

function atualizarTabela() {

    const tabela = document.getElementById("tabelaUsuarios");

    if (!tabela) return;

    tabela.innerHTML = "";

    usuarios.forEach((u, indice) => {

    if(!u.ativo) return;

        tabela.innerHTML += `

        <tr>

            <td>${u.nome}</td>

            <td>${u.usuario}</td>

           <td>${u.perfil}</td>
           <td>${u.ultimoLogin || "-"}</td>

            <td>

                <button
                    class="btn btn-editar"
                    onclick="editarUsuario(${indice})">

                    ✏️

                </button>

                <button
                    class="btn btn-excluir"
                    onclick="excluirUsuario(${indice})">

                    🗑️

                </button>

            </td>

        </tr>

        `;

    });

   const totalUsuarios = document.getElementById("totalUsuarios");

if (totalUsuarios) {

    totalUsuarios.textContent =
        usuarios.filter(u => u.ativo).length;

}

}
// ======================================
// Inicialização
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    atualizarTabela();

});
function editarUsuario(indice){

    indiceEdicao = indice;

    document.getElementById("nome").value =
        usuarios[indice].nome;

    document.getElementById("usuario").value =
        usuarios[indice].usuario;

    document.getElementById("senha").value =
        usuarios[indice].senha;

    document.getElementById("perfil").value =
        usuarios[indice].perfil;

    const botao = document.getElementById("btnSalvar");

    if(botao){

        botao.textContent = "Atualizar Usuário";

    }

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

    document.getElementById("nome").focus();

}
function excluirUsuario(indice){

    if (usuarios[indice].usuario === "admin") {

        alert("O administrador principal não pode ser inativado.");

        return;

    }

    if(!confirm("Deseja inativar este usuário?")){

        return;

    }

    usuarios[indice].ativo = false;

    salvarUsuarios();

    atualizarTabela();

    alert("Usuário inativado com sucesso.");

}
// ======================================
// Cadastrar Usuário
// ======================================

function cadastrarUsuario(){

   const nome = document
    .getElementById("nome")
    .value
    .trim()
    .replace(/\s+/g," ");
   const usuario = document
    .getElementById("usuario")
    .value
    .trim()
    .toLowerCase();
    const senha = document.getElementById("senha").value;
    const perfil = document.getElementById("perfil").value;

    if(
        nome === "" ||
        usuario === "" ||
        senha === "" ||
        perfil === ""
    )
    {

        alert("Preencha todos os campos.");
        return;
    }
 const existe = usuarios.find((u, indice) =>

    u.usuario.toLowerCase() === usuario.toLowerCase() &&
    u.ativo &&
    indice !== indiceEdicao

);

    if(existe){

        alert("Este usuário já existe.");
        return;

    }

 if (indiceEdicao >= 0) {

    usuarios[indiceEdicao].nome = nome;
    usuarios[indiceEdicao].usuario = usuario;
    usuarios[indiceEdicao].senha = senha;
    usuarios[indiceEdicao].perfil = perfil;

    indiceEdicao = -1;

    alert("Usuário atualizado com sucesso!");

} else {

    usuarios.push({

        id: Date.now(),

        nome: nome,

        usuario: usuario,

        senha: senha,

        perfil: perfil,

        ativo: true,

        cadastro: new Date().toLocaleDateString("pt-BR"),

        ultimoLogin: ""

    });

    alert("Usuário cadastrado com sucesso!");

}

salvarUsuarios();

atualizarTabela();

limparFormulario();

}
function limparFormulario(){

    document.getElementById("nome").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("perfil").value = "";

    indiceEdicao = -1;

    const botao = document.getElementById("btnSalvar");

    if(botao){

        botao.textContent = "Cadastrar Usuário";

    }

    document.getElementById("nome").focus();

}
