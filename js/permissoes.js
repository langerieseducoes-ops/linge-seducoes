// ======================================
// Linge & Seduções ERP
// Central de Permissões
// ======================================

const usuarioAtual =
JSON.parse(localStorage.getItem("usuarioLogado"));

function temPermissao(perfis){

    if(!usuarioAtual){
        return false;
    }

    return perfis.includes(usuarioAtual.perfil);

}
// Apenas Administrador pode acessar

if(
    window.location.pathname.endsWith("usuarios.html")
){

    if(!temPermissao(["Admin"])){

        alert("Você não possui permissão para acessar esta página.");

        window.location.href="dashboard.html";

    }

}
