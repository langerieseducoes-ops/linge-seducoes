const permissoes = {

    Admin: {
        produtos: true,
        vendas: true,
        compras: true,
        financeiro: true,
        usuarios: true
    },

    Gerente: {
        produtos: true,
        vendas: true,
        compras: true,
        financeiro: true,
        usuarios: false
    },

    Vendedor: {
        produtos: true,
        vendas: true,
        compras: false,
        financeiro: false,
        usuarios: false
    },

    Estoquista: {
        produtos: true,
        vendas: false,
        compras: true,
        financeiro: false,
        usuarios: false
    }

};
