// ======================================
// Linge & Seduções ERP
// Segurança do Sistema
// ======================================

// Verifica se o usuário está logado
if (localStorage.getItem("usuarioLogado") !== "sim") {
    window.location.href = "index.html";
}

// Função para sair do sistema
function sair() {

    if (confirm("Deseja realmente sair do sistema?")) {

        localStorage.removeItem("usuarioLogado");

        window.location.href = "index.html";

    }

}
