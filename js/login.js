// ======================================
// Linge & Seduções ERP
// Sistema de Login
// ======================================

function entrar() {

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;

    // Validação dos campos
    if (usuario === "" || senha === "") {

        alert("Informe o usuário e a senha.");

        return;

    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procura usuário ativo
    const encontrado = usuarios.find(u =>
        u.usuario === usuario &&
        u.senha === senha &&
        u.ativo === true
    );

    // Usuário não encontrado
    if (!encontrado) {

        alert("Usuário ou senha inválidos.");

        document.getElementById("senha").value = "";
        document.getElementById("senha").focus();

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
        perfil: encontrado.perfil

    }));

    // Limpa formulário
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";

    // Abre o sistema
    window.location.href = "dashboard.html";

}
