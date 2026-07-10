// ======================================
// Alterar Senha
// ======================================

function alterarSenha() {

    const senhaAtual = document.getElementById("senhaAtual").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!usuarioLogado) {
        alert("Nenhum usuário está logado.");
        return;
    }

    if (senhaAtual !== usuarioLogado.senha) {
        alert("Senha atual incorreta.");
        return;
    }

    if (novaSenha.length < 6) {
        alert("A nova senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    // Atualiza o usuário na lista
    const indice = usuarios.findIndex(u => u.usuario === usuarioLogado.usuario);

    if (indice !== -1) {
        usuarios[indice].senha = novaSenha;

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        usuarioLogado.senha = novaSenha;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

        alert("Senha alterada com sucesso!");

        window.location.href = "index.html";
    } else {
        alert("Usuário não encontrado.");
    }
}
