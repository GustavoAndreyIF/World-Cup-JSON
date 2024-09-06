import { criarCard } from "/utils/criarCard.js";

// Função para exibir as partidas, filtrando por data se fornecida
export function exibirPartidas(dataFiltro = null) {
  // Obtém as partidas do localStorage ou faz uma requisição para buscar os jogos se não estiverem armazenados
  let partidas = JSON.parse(localStorage.getItem("matches")) || fetchJogos();

  // Seleciona o container onde as partidas serão exibidas e limpa seu conteúdo
  const container = document.getElementById("partidasContainer");
  container.innerHTML = "";

  // Mapeia os nomes das fases para exibição mais amigável
  const fases = {
    "First stage": "Fase de Grupos",
    "Round of 16": "Oitavas de final",
    "Quarter-final": "Quartas de final",
    "Semi-final": "Semifinais",
    Final: "Final da Copa do Mundo",
    "Play-off for third place": "Disputa pelo terceiro lugar",
  };

  // Itera sobre as fases para criar e exibir seções para cada fase
  Object.keys(fases).forEach((fase) => {
    // Cria um div para a fase e define seu conteúdo
    const divFase = document.createElement("div");
    divFase.classList.add("fase");
    divFase.innerHTML = `<h2>${fases[fase]}</h2>`;

    // Cria um container para os cartões de partidas
    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cardsContainer");

    // Filtra as partidas por fase e data (se fornecida), e cria os cartões de partida
    const cards = partidas
      .filter((partida) => partida.stage_name === fase)
      .filter(
        (partida) => !dataFiltro || partida.datetime.startsWith(dataFiltro)
      )
      .map((partida) => criarCard(partida));

    // Adiciona os cartões ao container de cartões
    cards.forEach((card) => {
      cardsContainer.appendChild(card);
    });

    // Adiciona o container de cartões à div da fase, se houver cartões
    if (cards.length) {
      divFase.appendChild(cardsContainer);
      container.appendChild(divFase);
    }
  });
}

// Função para criar e exibir o seletor de datas para filtrar as partidas
export function selecionarData() {
  // Seleciona o container de navegação e remove o seletor de datas antigo, se existir
  const nav = document.querySelector("#selectDiv");
  const selectAntigo = document.getElementById("selectDatas");
  if (selectAntigo) {
    nav.removeChild(selectAntigo);
  }

  // Cria um novo seletor de datas
  const select = document.createElement("select");
  select.id = "selectDatas";
  select.innerHTML = "<option value=''>Selecione uma datas</option>";

  // Adiciona a opção para mostrar todas as partidas
  const optionTodas = document.createElement("option");
  optionTodas.value = "todas";
  optionTodas.textContent = "Todas as Partidas";
  select.appendChild(optionTodas);

  // Obtém as partidas do localStorage ou faz uma requisição para buscar os jogos se não estiverem armazenados
  let partidas = JSON.parse(localStorage.getItem("matches")) || fetchJogos();

  // Obtém datas únicas das partidas para adicionar ao seletor
  const datasUnicas = [
    ...new Set(partidas.map((partida) => partida.datetime.split("T")[0])),
  ];

  // Cria uma opção para cada data única no seletor
  datasUnicas.forEach((data) => {
    const option = document.createElement("option");
    option.value = data;
    option.textContent = data.split("-").reverse().join("/");
    select.appendChild(option);
  });

  // Adiciona o seletor de datas ao container de navegação
  nav.appendChild(select);

  // Adiciona um manipulador de eventos ao seletor para filtrar as partidas com base na data selecionada
  select.addEventListener("change", () => {
    const dataSelecionada = select.value;
    exibirPartidas(dataSelecionada);
    if (dataSelecionada === "todas") {
      exibirPartidas();
    }
  });
}
