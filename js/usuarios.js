// ======================================
// Linge & Seduções ERP
// Módulo de Usuários
// ======================================

// Banco de usuários

let usuarios =
JSON.parse(localStorage.getItem("usuarios")) || [];

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

        tabela.innerHTML += `

        <tr>

            <td>${u.nome}</td>

            <td>${u.usuario}</td>

            <td>${u.perfil}</td>

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

    document.getElementById("totalUsuarios").innerHTML = usuarios.length;

}
// ======================================
// Inicialização
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    atualizarTabela();

});
function editarUsuario(indice){

    alert("Etapa de edição será criada na próxima fase.");

}

function excluirUsuario(indice){

    alert("Etapa de exclusão será criada na próxima fase.");

}
// ======================================
// Cadastrar Usuário
// ======================================

function cadastrarUsuario(){

    const nome = document.getElementById("nome").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
    const perfil = document.getElementById("perfil").value;

    if(
        nome === "" ||
        usuario === "" ||
        senha === "" ||
        perfil === ""
    ){

        alert("Preencha todos os campos.");
        return;

    }

    const existe = usuarios.find(u => u.usuario === usuario);

    if(existe){

        alert("Este usuário já existe.");
        return;

    }

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

    salvarUsuarios();

    atualizarTabela();

    document.getElementById("nome").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("perfil").value = "";

    alert("Usuário cadastrado com sucesso!");

}
