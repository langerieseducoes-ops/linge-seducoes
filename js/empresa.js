// ======================================
// Linge & Seduções ERP
// Empresa
// ======================================

// Carregar dados
function carregarEmpresa() {

    const empresa = JSON.parse(
        localStorage.getItem("empresa")
    ) || {};

    document.getElementById("nomeEmpresa").value = empresa.nomeEmpresa || "";
    document.getElementById("fantasia").value = empresa.fantasia || "";
    document.getElementById("cnpj").value = empresa.cnpj || "";
    document.getElementById("ie").value = empresa.ie || "";
    document.getElementById("telefone").value = empresa.telefone || "";
    document.getElementById("whatsapp").value = empresa.whatsapp || "";
    document.getElementById("email").value = empresa.email || "";
    document.getElementById("site").value = empresa.site || "";
    document.getElementById("endereco").value = empresa.endereco || "";
    document.getElementById("numero").value = empresa.numero || "";
    document.getElementById("bairro").value = empresa.bairro || "";
    document.getElementById("cidade").value = empresa.cidade || "";
    document.getElementById("estado").value = empresa.estado || "";
    document.getElementById("cep").value = empresa.cep || "";

}

// ======================================
// Salvar Empresa
// ======================================

function salvarEmpresa() {

    const empresa = {

        nomeEmpresa: document.getElementById("nomeEmpresa").value.trim(),
        fantasia: document.getElementById("fantasia").value.trim(),
        cnpj: document.getElementById("cnpj").value.trim(),
        ie: document.getElementById("ie").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        whatsapp: document.getElementById("whatsapp").value.trim(),
        email: document.getElementById("email").value.trim(),
        site: document.getElementById("site").value.trim(),
        endereco: document.getElementById("endereco").value.trim(),
        numero: document.getElementById("numero").value.trim(),
        bairro: document.getElementById("bairro").value.trim(),
        cidade: document.getElementById("cidade").value.trim(),
        estado: document.getElementById("estado").value.trim(),
        cep: document.getElementById("cep").value.trim()

    };

    localStorage.setItem(
        "empresa",
        JSON.stringify(empresa)
    );

    alert("Dados da empresa salvos com sucesso!");

}

// ======================================
// Inicialização
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    carregarEmpresa();

});
