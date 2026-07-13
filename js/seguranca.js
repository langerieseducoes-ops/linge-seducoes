// ======================================
// Linge & Seduções ERP
// Segurança do Sistema
// ======================================

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {

    window.location.href = "index.html";

}

// Função para sair
function sair(){

    if(confirm("Deseja realmente sair do sistema?")){

        localStorage.removeItem("usuarioLogado");

        window.location.href = "index.html";

    }

}
