// ======================================
// Linge & Seduções ERP
// Permissões dos Usuários
// ======================================

const permissoes = {

    Admin: {

        produtos: true,
        vendas: true,
        compras: true,
        clientes: true,
        fornecedores: true,
        categorias: true,
        financeiro: true,
        relatorios: true,
        usuarios: true,

        cadastrar: true,
        editar: true,
        excluir: true

    },

    Gerente: {

        produtos: true,
        vendas: true,
        compras: true,
        clientes: true,
        fornecedores: true,
        categorias: true,
        financeiro: true,
        relatorios: true,
        usuarios: false,

        cadastrar: true,
        editar: true,
        excluir: false

    },

    Vendedor: {

        produtos: true,
        vendas: true,
        compras: false,
        clientes: true,
        fornecedores: false,
        categorias: false,
        financeiro: false,
        relatorios: true,
        usuarios: false,

        cadastrar: true,
        editar: false,
        excluir: false

    },

    Estoquista: {

        produtos: true,
        vendas: false,
        compras: true,
        clientes: false,
        fornecedores: true,
        categorias: true,
        financeiro: false,
        relatorios: true,
        usuarios: false,

        cadastrar: true,
        editar: true,
        excluir: false

    }

};
