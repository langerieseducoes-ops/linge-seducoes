function alterarSenha(){

    const atual = document.getElementById("senhaAtual").value;
    const nova = document.getElementById("novaSenha").value;
    const confirmar = document.getElementById("confirmarSenha").value;

    const senha = localStorage.getItem("senhaERP");

    if(atual !== senha){
        alert("Senha atual incorreta.");
        return;
    }

    if(nova.length < 4){
        alert("A nova senha deve ter pelo menos 4 caracteres.");
        return;
    }

    if(nova !== confirmar){
        alert("As senhas não conferem.");
        return;
    }

    localStorage.setItem("senhaERP", nova);

    alert("Senha alterada com sucesso!");

    window.location.href = "dashboard.html";
}
