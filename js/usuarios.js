// ======================================
// Linge & Seduções ERP
// Banco de Usuários
// ======================================

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// ======================================
// Cria usuários padrão somente
// na primeira execução
// ======================================

if (usuarios.length === 0) {

    usuarios = [

        {
            nome: "Administrador",
            usuario: "admin",
            senha: "1234",
            perfil: "Admin",
            ativo: true
        },

        {
            nome: "Gerente",
            usuario: "gerente",
            senha: "1234",
            perfil: "Gerente",
            ativo: true
        },

        {
            nome: "Vendedor",
            usuario: "vendedor",
            senha: "1234",
            perfil: "Vendedor",
            ativo: true
        },

        {
            nome: "Estoquista",
            usuario: "estoquista",
            senha: "1234",
            perfil: "Estoquista",
            ativo: true
        }

    ];

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

}
