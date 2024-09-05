import { bandeirasPaises, nomesPaises } from "../assets/img/bandeirasNome.js";
import { criarCard } from "./criarCard.js";

export function sugerir(termoPesquisa) {
  const termoLower = termoPesquisa.toLowerCase();
  const sugestoes = [];

  for (const [key, value] of Object.entries(nomesPaises)) {
    if (
      key.toLowerCase().startsWith(termoLower) ||
      value.toLowerCase().startsWith(termoLower)
    ) {
      sugestoes.push({ nomeIngles: key, nomePortugues: value });
    }
  }

  mostrarSugestoes(sugestoes);
}

export function mostrarSugestoes(sugestoes) {
  const container = document.getElementById("sugestoesContainer");
  container.innerHTML = "";

  sugestoes.forEach((sugestao) => {
    const divSugestao = document.createElement("div");
    divSugestao.classList.add("sugestao-item");
    divSugestao.textContent = `${sugestao.nomePortugues} (${sugestao.nomeIngles})`;
    divSugestao.onclick = function () {
      document.getElementById("barraPesquisa").value = sugestao.nomePortugues;
      container.innerHTML = "";
      pesquisar();
    };

    container.appendChild(divSugestao);
  });
}

export function pesquisar() {
  const termoPesquisa = document
    .getElementById("barraPesquisa")
    .value.toLowerCase();
  const timeEncontrado = encontrarTime(termoPesquisa, nomesPaises);
  const conteudoPagina = document.getElementById("conteudoPagina");

  if (!timeEncontrado) {
    const msgErro = document.createElement("p");
    msgErro.textContent = "Time não encontrado.";
    conteudoPagina.appendChild(msgErro);
    return;
  }

  const nomeIngles = timeEncontrado.nomeIngles.toLowerCase();
  const nomePortugues = timeEncontrado.nomePortugues.toLowerCase();

  const times = JSON.parse(localStorage.getItem("teams"));
  const partidas = JSON.parse(localStorage.getItem("matches"));

  const timesFiltrados = times.filter((grupo) =>
    grupo.teams.some(
      (time) =>
        time.name.toLowerCase().includes(nomeIngles) ||
        time.name.toLowerCase().includes(nomePortugues)
    )
  );

  const partidasFiltradas = partidas.filter(
    (partida) =>
      partida.home_team.name.toLowerCase().includes(nomeIngles) ||
      partida.home_team.name.toLowerCase().includes(nomePortugues) ||
      partida.away_team.name.toLowerCase().includes(nomeIngles) ||
      partida.away_team.name.toLowerCase().includes(nomePortugues)
  );
  conteudoPagina.innerHTML = "";
  const sugestaoContainer = document.getElementById("sugestoesContainer");
  sugestaoContainer.innerHTML = "";

  if (timesFiltrados.length > 0) {
    const tituloTimes = document.createElement("h2");
    tituloTimes.textContent = "Time encontrado:";
    conteudoPagina.appendChild(tituloTimes);

    timesFiltrados.forEach((grupo) => {
      const tabela = document.createElement("table");
      tabela.classList.add("tabela-grupos");
      tabela.innerHTML = `		
              <thead>
                  <tr>
                      <th style="text-align: left">Equipe</th>
                      <th>Pts</th>
                      <th>PJ</th>
                      <th>VIT</th>
                      <th>E</th>
                      <th>DER</th>
                      <th>GM</th>
                      <th>GC</th>
                      <th>SG</th>
                      
                  </tr>
              </thead>
              <tbody>
                  ${grupo.teams
                    .map(
                      (time, index) => `
                      <tr class="${
                        index < 2 ? "classificado" : "desclassificado"
                      }">
                          <td><img src="${
                            bandeirasPaises[time.country] || "#"
                          }" width="20" height="15"><span>${
                        nomesPaises[time.name]
                      }<span></td>
                          <td class="center">${time.group_points}</td>
                          <td class="center">${time.games_played}</td>
                          <td class="center">${time.wins}</td>
                          <td class="center">${time.draws}</td>
                          <td class="center">${time.losses}</td>
                          <td class="center">${time.goals_for}</td>
                          <td class="center">${time.goals_against}</td>
                          <td class="center">${time.goal_differential}</td>
                      </tr>
                  `
                    )
                    .join("")}
              </tbody>
          `;
      const sessaoGrupo = document.createElement("div");
      sessaoGrupo.classList.add("sessaoGrupo");
      sessaoGrupo.innerHTML = `<div class="tituloGrupo">Grupo ${grupo.letter}</div>`;
      sessaoGrupo.appendChild(tabela);
      conteudoPagina.appendChild(sessaoGrupo);
    });
  }

  if (partidasFiltradas.length > 0) {
    selecionarDataPesquisa(partidasFiltradas);
    const tituloPartidas = document.createElement("h2");
    tituloPartidas.textContent = "Partidas encontradas:";
    const divPartidas = document.createElement("div");
    divPartidas.id = "partidasFiltro";
    conteudoPagina.appendChild(tituloPartidas);
    conteudoPagina.appendChild(divPartidas);

    partidasFiltradas.forEach((partida) => {
      const card = criarCard(partida);
      divPartidas.appendChild(card);
    });
  } else {
    const msg = document.createElement("p");
    msg.textContent = "Nenhuma partida encontrada.";
    conteudoPagina.appendChild(msg);
  }
  selecionarDataPesquisa(partidasFiltradas);
}

export function encontrarTime(termoPesquisa, nomesPaises) {
  const termoLower = termoPesquisa.toLowerCase();

  for (const [key, value] of Object.entries(nomesPaises)) {
    if (
      value.toLowerCase() === termoLower ||
      key.toLowerCase() === termoLower
    ) {
      return { nomeIngles: key, nomePortugues: value };
    }
  }

  return null;
}

export function selecionarDataPesquisa(partidas) {
  const divPartidas = document.querySelector("#partidasFiltro");
  const nav = document.querySelector("#selectDiv");
  let selectDatas = document.getElementById("selectDatas");

  if (selectDatas) {
    selectDatas.remove();
  }

  selectDatas = document.createElement("select");
  selectDatas.id = "selectDatas";
  selectDatas.innerHTML = `<option value="">Selecione uma data</option>`;

  const optionTodas = document.createElement("option");
  optionTodas.value = "todas";
  optionTodas.textContent = "Todas as Partidas";
  selectDatas.appendChild(optionTodas);

  const datasUnicas = [
    ...new Set(
      partidas.map((partida) => new Date(partida.datetime).toLocaleDateString())
    ),
  ];
  datasUnicas.sort();

  datasUnicas.forEach((data) => {
    const option = document.createElement("option");
    option.value = data;
    option.textContent = data;
    selectDatas.appendChild(option);
  });

  nav.appendChild(selectDatas);

  selectDatas.addEventListener("change", (select) => {
    const dataSelecionada = select.target.value;
    const partidasFiltradasPorData = partidas.filter(
      (partida) =>
        new Date(partida.datetime).toLocaleDateString() === dataSelecionada
    );

    divPartidas.innerHTML = "";
    partidasFiltradasPorData.forEach((partida) => {
      const card = criarCard(partida);
      if (card) {
        divPartidas.append(card);
      }
    });

    if (dataSelecionada === "todas") {
      partidas.forEach((partida) => {
        const card = criarCard(partida);
        if (card) {
          divPartidas.appendChild(card);
        }
      });
    }
  });
}

export function exibirPartidasNoMain(partidas) {
  const container = document.getElementById("conteudoPagina");
  container.innerHTML = "";

  partidas.forEach((partida) => {
    const card = criarCard(partida);
    container.appendChild(card);
  });
}
