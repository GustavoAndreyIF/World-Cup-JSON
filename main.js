// Importa a função fetchData do módulo apiData.js
import { fetchData } from "./services/apiData.js";
// Importa as funções sugerir e pesquisar do módulo barraPesquisa.js
import { sugerir, pesquisar } from "./utils/barraPesquisa.js";
// Importa funções para manipulação de detalhes de partidas do módulo detalhesPartidas.js
import {
  carregarDetalhesPartida,
  exibirPopup,
  carregarPopup,
  fecharPopup,
} from "./utils/detalhesPartidas.js";

// Adiciona as funções importadas ao objeto global window, tornando-as acessíveis em outros scripts ou contextos
window.carregarDetalhesPartida = carregarDetalhesPartida;
window.exibirPopup = exibirPopup;
window.carregarPopup = carregarPopup;
window.fecharPopup = fecharPopup;

// Importa as funções exibirGrupos do módulo faseDeGrupos.js e exibirPartidas e selecionarData do módulo eliminatorias.js
import { exibirGrupos } from "./assets/js/faseDeGrupos.js";
import { exibirPartidas, selecionarData } from "./assets/js/eliminatorias.js";

// Verifica se os dados de times e partidas estão armazenados no localStorage; se não estiverem, chama fetchData para obtê-los
if (!localStorage.getItem("teams") || !localStorage.getItem("matches")) {
  fetchData();
}

// Define uma função assíncrona para carregar o conteúdo de uma URL e exibi-lo em um elemento da página
async function carregarConteudo(urlPage) {
  try {
    // Faz uma requisição para a URL fornecida
    const resposta = await fetch(urlPage);
    // Verifica se a resposta foi bem-sucedida, caso contrário, lança um erro
    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
    }
    // Converte a resposta para texto
    const dados = await resposta.text();
    // Insere o texto no elemento com id "conteudoPagina"
    document.getElementById("conteudoPagina").innerHTML = dados;
  } catch (error) {
    // Exibe um erro no console se algo der errado
    console.error("Erro ao carregar o conteúdo:", error);
  }
}

// Obtém o elemento com id "barraPesquisa"
const barraPesquisa = document.getElementById("barraPesquisa");
// Se o elemento "barraPesquisa" existir, configura seus manipuladores de eventos
if (barraPesquisa) {
  // Quando o usuário digitar na barra de pesquisa, chama a função sugerir com o valor atual da barra
  barraPesquisa.oninput = (event) => sugerir(event.target.value);
  // Quando o usuário pressionar a tecla "Enter", chama a função pesquisar
  barraPesquisa.onkeypress = (event) => {
    if (event.key === "Enter") {
      pesquisar();
    }
  };
}

// Define uma função para remover um elemento com id "selectDatas" de um contêiner com id "selectDiv"
function removeSelect() {
  const nav = document.querySelector("#selectDiv");
  const selectAntigo = document.getElementById("selectDatas");
  if (selectAntigo) {
    nav.removeChild(selectAntigo);
  }
}

// Adiciona um ouvinte de evento para quando o conteúdo da página estiver completamente carregado
document.addEventListener("DOMContentLoaded", () => {
  // Configura o clique do primeiro link de navegação para carregar a página "inicio.html" e remover o elemento de seleção
  document.querySelector("nav a:nth-of-type(1)").onclick = () => {
    carregarConteudo("../pages/inicio.html");
    removeSelect();
  };
  // Configura o clique do segundo link de navegação para carregar a página "faseDeGrupos.html" e exibir os grupos
  document.querySelector("nav a:nth-of-type(2)").onclick = async () => {
    await carregarConteudo("../pages/faseDeGrupos.html");
    exibirGrupos();
  };
  // Configura o clique do terceiro link de navegação para carregar a página "eliminatorias.html", exibir as partidas e selecionar a data
  document.querySelector("nav a:nth-of-type(3)").onclick = async () => {
    await carregarConteudo("../pages/eliminatorias.html");
    exibirPartidas();
    selecionarData();
  };
});
