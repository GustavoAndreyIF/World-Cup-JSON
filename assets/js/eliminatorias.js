import { criarCard } from "/utils/criarCard.js";

export function exibirPartidas(dataFiltro = null) {
  let partidas = JSON.parse(localStorage.getItem("matches")) || fetchJogos();
  const container = document.getElementById("partidasContainer");
  container.innerHTML = "";

  const fases = {
    "First stage": "Fase de Grupos",
    "Round of 16": "Oitavas de final",
    "Quarter-final": "Quartas de final",
    "Semi-final": "Semifinais",
    Final: "Final da Copa do Mundo",
    "Play-off for third place": "Disputa pelo terceiro lugar",
  };

  Object.keys(fases).forEach((fase) => {
    const divFase = document.createElement("div");
    divFase.classList.add("fase");
    divFase.innerHTML = `<h2>${fases[fase]}</h2>`;
    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cardsContainer");

    const cards = partidas
      .filter((partida) => partida.stage_name === fase)
      .filter(
        (partida) => !dataFiltro || partida.datetime.startsWith(dataFiltro)
      )
      .map((partida) => criarCard(partida));

    cards.forEach((card) => {
      cardsContainer.appendChild(card);
    });
    if (cards.length) {
      divFase.appendChild(cardsContainer);
      container.appendChild(divFase);
    }
  });
}

export function selecionarData() {
  const nav = document.querySelector("#selectDiv");
  const selectAntigo = document.getElementById("selectDatas");
  if (selectAntigo) {
    nav.removeChild(selectAntigo);
  }

  const select = document.createElement("select");
  select.id = "selectDatas";
  select.innerHTML = "<option value=''>Selecione uma datas</option>";

  const optionTodas = document.createElement("option");
  optionTodas.value = "todas";
  optionTodas.textContent = "Todas as Partidas";
  select.appendChild(optionTodas);

  let partidas = JSON.parse(localStorage.getItem("matches")) || fetchJogos();
  const datasUnicas = [
    ...new Set(partidas.map((partida) => partida.datetime.split("T")[0])),
  ];

  datasUnicas.forEach((data) => {
    const option = document.createElement("option");
    option.value = data;
    option.textContent = data.split("-").reverse().join("/");
    select.appendChild(option);
  });

  nav.appendChild(select);

  select.addEventListener("change", () => {
    const dataSelecionada = select.value;
    exibirPartidas(dataSelecionada);
    if (dataSelecionada === "todas") {
      exibirPartidas();
    }
  });
}
