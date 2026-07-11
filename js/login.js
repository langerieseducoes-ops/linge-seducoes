// ======================================
// Linge & Seduções ERP
// Login
// ======================================

// Cria uma senha padrão caso ainda não exista
if (!localStorage.getItem("senhaERP")) {
    localStorage.setItem("senhaERP", "1234");
}

function entrar() {

    const senha = document.getElementById("senha").value;
    const senhaSistema = localStorage.getItem("senhaERP");

    if (senha === senhaSistema) {

        // Marca o usuário como logado
        sessionStorage.setItem("logado", "sim");

        // Vai para o Dashboard
        window.location.href = "dashboard.html";

    } else {

        alert("Senha incorreta!");

    }

}
