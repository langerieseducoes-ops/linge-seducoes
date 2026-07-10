// ======================================
// Linge & Seduções ERP
// Login
// ======================================

// Cria o usuário administrador na primeira execução
if (!localStorage.getItem("usuarios")) {

    const usuarios = [
        {
            usuario: "admin",
            senha: "1234",
            nome: "Administrador",
            cargo: "Administrador"
        }
    ];

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function fazerLogin() {

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(u =>
        u.usuario === usuario &&
        u.senha === senha
    );

    if (!encontrado) {
        alert("Usuário ou senha inválidos.");
        return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(encontrado));

    window.location.href = "index.html";
}
