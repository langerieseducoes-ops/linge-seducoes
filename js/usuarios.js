// ======================================
// Linge & Seduções ERP
// Módulo de Usuários
// ======================================

// Banco de usuários

let usuarios =
JSON.parse(localStorage.getItem("usuarios")) || [];

// ======================================
// Primeiro acesso
// ======================================

if (usuarios.length === 0) {

    usuarios = [

        {
            id:1,
            nome:"Administrador",
            usuario:"admin",
            senha:"1234",
            perfil:"Admin",
            ativo:true,
            cadastro:new Date().toLocaleDateString("pt-BR"),
            ultimoLogin:""
        }

    ];

    salvarUsuarios();

}

// ======================================
// Salvar Banco
// ======================================

function salvarUsuarios(){

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}
