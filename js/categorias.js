// ======================================
// Linge & Seduções ERP
// Módulo de Categorias
// ======================================

let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let indiceEdicao = -1;

// ======================================
// Salvar Categorias
// ======================================

function salvarCategorias() {

    localStorage.setItem(
        "categorias",
        JSON.stringify(categorias)
    );

    // Atualiza as outras telas
    window.dispatchEvent(new Event("storage"));

}

// ======================================
// Atualizar Resumo
// ======================================

function atualizarResumoCategorias() {

    const total = document.getElementById("totalCategorias");

    if (total) {

        total.innerText = categorias.length;

    }

}

// ======================================
// Limpar Formulário
// ======================================

function limparFormulario() {

   const campo = document.getElementById("nomeCategoria");

if (campo) {
    campo.value = "";
}
    indiceEdicao = -1;

}
// ======================================
// Cadastrar / Editar
// ======================================

function cadastrarCategoria() {

  const campo = document.getElementById("nomeCategoria");

if (!campo) return;

const nome = campo.value.trim();

    if (nome === "") {

        alert("Informe o nome da categoria.");
        return;

    }

    // Verifica categoria duplicada
    const existe = categorias.some((categoria, indice) =>

        categoria.nome.toLowerCase() === nome.toLowerCase()
        &&
        indice !== indiceEdicao

    );

    if (existe) {

        alert("Essa categoria já está cadastrada.");
        return;

    }

    if (indiceEdicao === -1) {

        categorias.push({

            nome

        });

    } else {

        categorias[indiceEdicao] = {

            nome

        };

    }

    salvarCategorias();

    listarCategorias();

    limparFormulario();

}

// ======================================
// Listar Categorias
// ======================================

function listarCategorias(lista = categorias) {

    const tabela = document.getElementById("tabelaCategorias");

    if (!tabela) return;

    tabela.innerHTML = "";

    lista.forEach((categoria, indice) => {

        tabela.innerHTML += `

        <tr>

            <td>${categoria.nome}</td>

            <td>

                <button
                    class="btn btn-editar"
                    onclick="editarCategoria(${indice})">

                    ✏️

                </button>

                <button
                    class="btn btn-excluir"
                    onclick="excluirCategoria(${indice})">

                    🗑️

                </button>

            </td>

        </tr>

        `;

    });

    atualizarResumoCategorias();

}

// ======================================
// Editar Categoria
// ======================================

function editarCategoria(indice) {

    if (!categorias[indice]) {
        alert("Categoria não encontrada.");
        return;
    }

  const campo = document.getElementById("nomeCategoria");

if (campo) {
    campo.value = categorias[indice].nome;
}
    indiceEdicao = indice;

}

// ======================================
// Excluir Categoria
// ======================================

function excluirCategoria(indice){

    if (!categorias[indice]) {
        alert("Categoria não encontrada.");
        return;
    }

    if (!confirm("Deseja excluir esta categoria?")) {
        return;
    }

    categorias.splice(indice,1);

    salvarCategorias();

    listarCategorias();

}

// ======================================
// Pesquisar Categoria
// ======================================

function pesquisarCategoria() {

    const pesquisa = document.getElementById("pesquisaCategoria");

if (!pesquisa) return;

const texto = pesquisa.value.toLowerCase();

    const resultado = categorias.filter(categoria =>

        categoria.nome
            .toLowerCase()
            .includes(texto)

    );

    listarCategorias(resultado);

}

// ======================================
// Inicialização
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    listarCategorias();

});

window.addEventListener("storage", () => {

    categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    listarCategorias();

});
