// ======================================
// Linge & Seduções ERP
// Sistema de Login
// ======================================


// Criar senha padrão no primeiro acesso

if(!localStorage.getItem("senhaERP")){

    localStorage.setItem("senhaERP","1234");

}


// ======================================
// Entrar no Sistema
// ======================================

function entrar(){

    const senhaDigitada = document.getElementById("senha").value;

    const senhaCorreta = localStorage.getItem("senhaERP");


    if(senhaDigitada === senhaCorreta){


        // Criar sessão de usuário

        sessionStorage.setItem("usuarioLogado","sim");


        // Ir para Dashboard

        window.location.href = "dashboard.html";


    }else{


        alert("Senha incorreta!");


    }


}
