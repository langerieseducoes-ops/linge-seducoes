// ======================================
// Linge & Seduções ERP
// Sistema de Login Profissional
// ======================================

// Cria o administrador no primeiro acesso
if (!localStorage.getItem("usuarios")) {

    const usuarios = [

        {
            usuario: "admin",
            senha: "1234",
            nome: "Administrador",
            nivel: "Administrador"
        }

    ];

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

}

// ======================================
// Entrar
// ======================================

function entrar() {

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(u =>
        u.usuario === usuario &&
        u.senha === senha
    );

    if (!encontrado) {

        alert("Usuário ou senha inválidos.");
        return;

    }

    // Sessão
    localStorage.setItem("usuarioLogado", "sim");
    localStorage.setItem("usuarioAtual", JSON.stringify(encontrado));

    window.location.href = "dashboard.html";

}
