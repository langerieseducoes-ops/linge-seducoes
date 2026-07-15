// ======================================
// Linge & Seduções ERP
// Segurança do Sistema
// ======================================

const usuarioLogado =
JSON.parse(localStorage.getItem("usuarioLogado"));

const perfilUsuario =
usuarioLogado?.perfil || "";

// ======================================
// Verificar Login
// ======================================

function verificarLogin(){

    if(!usuarioLogado){

        window.location.href="index.html";

    }

}

verificarLogin();

// ======================================
// Usuário Atual
// ======================================

function usuarioAtual(){

    return usuarioLogado;

}

// ======================================
// Sair do Sistema
// ======================================

function sair(){

    if(confirm("Deseja realmente sair do sistema?")){

        localStorage.removeItem("usuarioLogado");

        window.location.href="index.html";

    }

}
