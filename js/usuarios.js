// ======================================
// Linge & Seduções ERP
// Banco de Usuários
// ======================================

if (!localStorage.getItem("usuarios")) {

    const usuarios = [

        {
            usuario: "admin",
            senha: "1234",
            nome: "Administrador",
            nivel: "admin"
        },

        {
            usuario: "gerente",
            senha: "1234",
            nome: "Gerente",
            nivel: "gerente"
        },

        {
            usuario: "vendedor",
            senha: "1234",
            nome: "Vendedor",
            nivel: "vendedor"
        },

        {
            usuario: "estoquista",
            senha: "1234",
            nome: "Estoquista",
            nivel: "estoquista"
        }

    ];

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}
