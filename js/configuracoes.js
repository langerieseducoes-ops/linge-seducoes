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
// ======================================
// Backup Completo
// ======================================

function backupSistema() {

    const backup = {

        sistema: "Linge & Seduções ERP",

        versao: "1.0.0",

        data: new Date().toLocaleString("pt-BR"),

        dados: {

            empresa: JSON.parse(localStorage.getItem("empresa")) || {},

            configuracoes: JSON.parse(localStorage.getItem("configuracoes")) || {},

            usuarios: JSON.parse(localStorage.getItem("usuarios")) || [],

            permissoes: JSON.parse(localStorage.getItem("permissoes")) || [],

            produtos: JSON.parse(localStorage.getItem("produtos")) || [],

            categorias: JSON.parse(localStorage.getItem("categorias")) || [],

            clientes: JSON.parse(localStorage.getItem("clientes")) || [],

            fornecedores: JSON.parse(localStorage.getItem("fornecedores")) || [],

            vendas: JSON.parse(localStorage.getItem("vendas")) || [],

            compras: JSON.parse(localStorage.getItem("compras")) || [],

            caixa: JSON.parse(localStorage.getItem("caixa")) || [],

            contasReceber: JSON.parse(localStorage.getItem("contasReceber")) || [],

            contasPagar: JSON.parse(localStorage.getItem("contasPagar")) || [],

            formasPagamento: JSON.parse(localStorage.getItem("formasPagamento")) || [],

            movimentacoes: JSON.parse(localStorage.getItem("movimentacoes")) || []

        }

    };

    const json = JSON.stringify(backup, null, 4);

    const blob = new Blob([json], {
        type: "application/json"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    const hoje = new Date();

    const nomeArquivo =
        "Backup_LingeERP_" +
        hoje.getFullYear() +
        "-" +
        String(hoje.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(hoje.getDate()).padStart(2, "0") +
        "_" +
        String(hoje.getHours()).padStart(2, "0") +
        "-" +
        String(hoje.getMinutes()).padStart(2, "0") +
        ".json";

    link.download = nomeArquivo;

    link.click();

    URL.revokeObjectURL(link.href);

    alert("Backup criado com sucesso!");

}
