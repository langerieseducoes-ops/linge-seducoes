// ======================================
// Login do Sistema
// ======================================

// Cria o administrador padrão
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

function entrar() {

    const usuarioDigitado =
        document.getElementById("usuario").value.trim();

    const senhaDigitada =
        document.getElementById("senha").value;

    const usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u =>

        u.usuario === usuarioDigitado &&
        u.senha === senhaDigitada

    );

    if (usuario) {

        localStorage.setItem("usuarioLogado", "sim");

        localStorage.setItem("usuarioNome", usuario.nome);

        localStorage.setItem("usuarioNivel", usuario.nivel);

        window.location.href = "dashboard.html";

    } else {

        alert("Usuário ou senha incorretos.");

    }

}
