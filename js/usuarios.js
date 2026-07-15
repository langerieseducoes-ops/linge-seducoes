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

    if(!u.ativo) return;

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

    const total = document.getElementById("totalUsuarios");

if(total){

    total.textContent = usuarios.length;

}

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
    const usuario = document.getElementById("usuario").value.trim();
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

    const existe = usuarios.find(
    u => u.usuario.toLowerCase() === usuario.toLowerCase()
);

    if(existe){

        alert("Este usuário já existe.");
        return;

    }

    usuarios.push({

        id: Date.now(),

        nome: nome,

        usuario: usuario.toLowerCase(),

        senha: senha,

        perfil: perfil,

        ativo: true,

        cadastro: new Date().toLocaleDateString("pt-BR"),

        ultimoLogin: ""

    });

    salvarUsuarios();

    atualizarTabela();

    limparFormulario();
    
    alert("Usuário cadastrado com sucesso!");

}
    function limparFormulario(){

    document.getElementById("nome").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("perfil").value = "";

}
