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

    ocultarMenu("usuarios.html");

    if(paginaAtual === "usuarios.html"){

        acessoNegado();

    }

    break;

  case "Vendedor":

    ocultarMenu("usuarios.html");
    ocultarMenu("financeiro.html");
    ocultarMenu("compras.html");
    ocultarMenu("fornecedores.html");
    ocultarMenu("categorias.html");

    if(

        paginaAtual === "usuarios.html" ||
        paginaAtual === "financeiro.html" ||
        paginaAtual === "compras.html" ||
        paginaAtual === "fornecedores.html" ||
        paginaAtual === "categorias.html"

    ){

        acessoNegado();

    }

    break;
        
   case "Estoquista":

    ocultarMenu("usuarios.html");
    ocultarMenu("clientes.html");
    ocultarMenu("vendas.html");
    ocultarMenu("financeiro.html");

    if(

        paginaAtual === "usuarios.html" ||
        paginaAtual === "clientes.html" ||
        paginaAtual === "vendas.html" ||
        paginaAtual === "financeiro.html"

    ){

        acessoNegado();

    }

    break;

}
