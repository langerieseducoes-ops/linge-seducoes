// ======================================
// Linge & Seduções ERP
// Controle de Permissões
// ======================================

const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {

    window.location.href = "index.html";

}

const perfil = usuario.perfil;

const paginaAtual = window.location.pathname.split("/").pop();

// ======================================
// Ocultar Menu
// ======================================

function ocultarMenu(pagina){

    document.querySelectorAll("a").forEach(link => {

        if(link.getAttribute("href") === pagina){

            link.style.display = "none";

        }

    });

}

// ======================================
// Acesso Negado
// ======================================

function acessoNegado(){

    alert("Você não possui permissão para acessar esta página.");

    window.location.href = "dashboard.html";

}

// ======================================
// Permissões
// ======================================

switch(perfil){

    case "Admin":

        // Acesso total

        break;

    case "Gerente":

        break;

    case "Vendedor":

        break;

    case "Estoquista":

        break;

}
