// ======================================
// Alterar Senha
// ======================================

function alterarSenha() {

    const senhaAtual = document.getElementById("senhaAtual").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    // Se ainda não existir senha, usa "1234"
    let senha = localStorage.getItem("senhaERP") || "1234";

    if (senhaAtual !== senha) {
        alert("Senha atual incorreta.");
        return;
    }

    if (novaSenha.length < 4) {
        alert("A senha deve ter no mínimo 4 caracteres.");
        return;
    }

    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    localStorage.setItem("senhaERP", novaSenha);

    alert("Senha alterada com sucesso!");

    document.getElementById("senhaAtual").value = "";
    document.getElementById("novaSenha").value = "";
    document.getElementById("confirmarSenha").value = "";

}
