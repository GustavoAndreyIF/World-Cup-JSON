import { fetchData } from "./services/apiData.js";
import { sugerir, pesquisar } from "./utils/barraPesquisa.js";
import {
  carregarDetalhesPartida,
  exibirPopup,
  carregarPopup,
  fecharPopup,
} from "./utils/detalhesPartidas.js";

window.carregarDetalhesPartida = carregarDetalhesPartida;
window.exibirPopup = exibirPopup;
window.carregarPopup = carregarPopup;
window.fecharPopup = fecharPopup;

import { exibirGrupos } from "./assets/js/faseDeGrupos.js";
import { exibirPartidas, selecionarData } from "./assets/js/eliminatorias.js";

if (!localStorage.getItem("teams") || !localStorage.getItem("matches")) {
  fetchData();
}
async function carregarConteudo(urlPage) {
  try {
    const resposta = await fetch(urlPage);
    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
    }
    const dados = await resposta.text();
    document.getElementById("conteudoPagina").innerHTML = dados;
  } catch (error) {
    console.error("Erro ao carregar o conteúdo:", error);
  }
}

const barraPesquisa = document.getElementById("barraPesquisa");
if (barraPesquisa) {
  barraPesquisa.oninput = (event) => sugerir(event.target.value);
  barraPesquisa.onkeypress = (event) => {
    if (event.key === "Enter") {
      pesquisar();
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("nav a:nth-of-type(1)").onclick = () =>
    carregarConteudo("inicio.html");
  document.querySelector("nav a:nth-of-type(2)").onclick = async () => {
    await carregarConteudo("../pages/faseDeGrupos.html");
    exibirGrupos();
  };
  document.querySelector("nav a:nth-of-type(3)").onclick = async () => {
    await carregarConteudo("../pages/eliminatorias.html");
    exibirPartidas();
    selecionarData();
  };
});
