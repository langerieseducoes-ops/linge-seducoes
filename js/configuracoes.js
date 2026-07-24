// ======================================
// Linge & Seduções ERP
// Configurações
// ======================================

// Dados padrão
let configuracoes = JSON.parse(
    localStorage.getItem("configuracoes")
) || {

    empresa: {},

    seguranca: {},

    backup: {},

    permissoes: {},

    aparencia: {}

};

// ======================================
// Salvar
// ======================================

function salvarConfiguracoes(){

    localStorage.setItem(
        "configuracoes",
        JSON.stringify(configuracoes)
    );

}

// ======================================
// Empresa
// ======================================

function editarEmpresa(){

    window.location.href="empresa.html";

}

// ======================================
// Usuários
// ======================================

function abrirUsuarios(){

    window.location.href="usuarios.html";

}

// ======================================
// Permissões
// ======================================

function abrirPermissoes(){

    window.location.href="permissoes.html";

}

// ======================================
// Alterar Senha
// ======================================

function alterarSenha(){

    window.location.href="senha.html";

}

// ======================================
// Backup
// ======================================

function backupSistema(){

    const dados = {

        produtos:
        JSON.parse(localStorage.getItem("produtos"))||[],

        categorias:
        JSON.parse(localStorage.getItem("categorias"))||[],

        clientes:
        JSON.parse(localStorage.getItem("clientes"))||[],

        fornecedores:
        JSON.parse(localStorage.getItem("fornecedores"))||[],

        vendas:
        JSON.parse(localStorage.getItem("vendas"))||[],

        usuarios:
        JSON.parse(localStorage.getItem("usuarios"))||[],

        configuracoes

    };

    const arquivo = new Blob(
        [JSON.stringify(dados,null,4)],
        {type:"application/json"}
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(arquivo);

    link.download="backup-linge-seducoes.json";

    link.click();

    alert("Backup realizado com sucesso!");

}

// ======================================
// Restaurar
// ======================================

function restaurarSistema(){

    alert("Esta função será criada na próxima etapa.");

}

// ======================================
// Limpar Sistema
// ======================================

function limparSistema(){

    if(!confirm(
        "Deseja realmente apagar todos os dados?"
    )) return;

    localStorage.clear();

    alert("Sistema limpo com sucesso!");

    location.reload();

}
