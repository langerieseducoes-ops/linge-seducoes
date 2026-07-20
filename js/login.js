// ======================================
// Linge & Seduções ERP
// Sistema de Login
// ======================================

function entrar() {

const campoUsuario = document.getElementById("usuario");
const campoSenha = document.getElementById("senha");

if (!campoUsuario || !campoSenha) {
    return;
}

const usuario = campoUsuario.value.trim();
const senha = campoSenha.value;
    
    // Validação dos campos
    if (usuario === "" || senha === "") {

        alert("Informe o usuário e a senha.");

        return;
    }

 const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

if (usuarios.length === 0) {

    alert("Nenhum usuário cadastrado.");

    campoUsuario.focus();

    return;

}

    // Procura usuário ativo
   const encontrado = usuarios.find(u =>

    u.usuario.toLowerCase() === usuario.toLowerCase() &&
    u.senha === senha &&
    (u.ativo === true || u.ativo === undefined)

);

    // Usuário não encontrado
    if (!encontrado) {

        alert("Usuário ou senha inválidos.");

campoSenha.value = "";
campoSenha.focus();

return;

    }

    // Atualiza último login
    encontrado.ultimoLogin = new Date().toLocaleString("pt-BR");

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    // Cria sessão
   localStorage.setItem("usuarioLogado", JSON.stringify({

    id: encontrado.id,
    nome: encontrado.nome,
    usuario: encontrado.usuario,
    perfil: encontrado.perfil,
    login: new Date().toLocaleString("pt-BR")

}));

    // Limpa formulário
   campoUsuario.value = "";
campoSenha.value = "";
    // Abre o sistema
    window.location.href = "dashboard.html";

}
