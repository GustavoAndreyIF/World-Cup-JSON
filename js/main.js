import { nomesPaises, bandeirasPaises } from "/assets/BandeirasNome.js";
window.carregarConteudo = carregarConteudo;
window.sugerir = sugerir;
window.carregarDetalhesPartida = carregarDetalhesPartida;

async function carregarConteudo(urlPage, urlScript) {
  fetch(urlPage)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
      }
      return resposta.text();
    })
    .then((dados) => {
      document.getElementById("conteudoPagina").innerHTML = dados;
      const script = document.createElement("script");
      script.src = urlScript;
      document.body.appendChild(script);
    })
    .catch((error) => console.error("Erro ao carregar o conteúdo:", error));
}

if (!localStorage.getItem("teams") || !localStorage.getItem("matches")) {
  async function fetchData() {
    try {
      const [teamsResponse, matchesResponse] = await Promise.all([
        fetch("https://worldcupjson.net/teams"),
        fetch("https://worldcupjson.net/matches"),
      ]);
      const teamsData = await teamsResponse.json();
      const matchesData = await matchesResponse.json();

      localStorage.setItem("teams", JSON.stringify(teamsData.groups));
      localStorage.setItem("matches", JSON.stringify(matchesData));

      console.log("Dados carregados e armazenados no localStorage");
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  fetchData();
}

function encontrarTime(termoPesquisa, nomesPaises) {
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

function sugerir(termoPesquisa) {
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

function mostrarSugestoes(sugestoes) {
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

function pesquisar() {
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

function exibirPartidasNoMain(partidas) {
  const container = document.getElementById("conteudoPagina");
  container.innerHTML = "";

  partidas.forEach((partida) => {
    const card = criarCard(partida);
    container.appendChild(card);
  });
}

function selecionarDataPesquisa(partidas) {
  const divPartidas = document.querySelector("#partidasFiltro");
  const nav = document.querySelector("nav");
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

function criarCard(partida) {
  const card = document.createElement("div");
  card.classList.add("card");

  const bandeiraTime1 = bandeirasPaises[partida.home_team.country];
  const bandeiraTime2 = bandeirasPaises[partida.away_team.country];

  card.innerHTML = `
	<div id="${partida.datetime}">
		<div class="team">
			<img width="20" height="15" src="${bandeiraTime1}"/>
			<h3 class="${
        partida.winner_code === partida.home_team.country
          ? "ganhador"
          : "perdedor"
      }">${nomesPaises[partida.home_team.name]}</h3>
			<h3> vs </h3>
			<h3 class="${
        partida.winner_code === partida.home_team.country
          ? "ganhador"
          : "perdedor"
      }"${nomesPaises[partida.away_team.name]}></h3>
			<img width="20" height="15" src="${bandeiraTime2}">
		</div>
		<p>${partida.home_team.goals} - ${partida.away_team.goals}</p>
		<h4>Estadio</h4>
		<p>${partida.venue} - ${partida.location}</p>
		<h4>Data e Horario</h4>
		<p>${new Date(partida.datetime).toLocaleDateString()} - ${new Date(
    partida.datetime
  ).toLocaleTimeString()}</p>
		<button onclick="carregarDetalhesPartida('${partida.id}')">Ver Detalhes</button>
	</div>
	`;
  return card;
}

async function carregarDetalhesPartida(partidaId) {
  const url = `https://worldcupjson.net/matches/${partidaId}`;
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
    }
    const partida = await resposta.json();
    localStorage.setItem("matchesextra", JSON.stringify(partida));
    carregarPopup();
  } catch (error) {
    console.error("Erro ao carregar os detalhes da partida:", error);
  }
}

async function carregarPopup() {
  const urlPage = `../pages/detalhesPartidas.html`;
  const urlScript = `../js/detalhesPartidas.js`;

  try {
    const resposta = await fetch(urlPage);
    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
    }
    const dados = await resposta.text();

    let conteudoPopup = document.getElementById("conteudoPopup");
    if (!conteudoPopup) {
      conteudoPopup = document.createElement("div");
      conteudoPopup.id = "conteudoPopup";
      const conteudoDiv = document.getElementById("conteudoPagina");
      conteudoDiv.appendChild(conteudoPopup);
    }

    conteudoPopup.innerHTML = dados;

    const script = document.createElement("script");
    script.src = urlScript;
    document.body.appendChild(script);
    exibirPopup();
  } catch (error) {
    console.error("Erro ao carregar o conteúdo:", error);
  }
}

async function exibirPopup() {
  const partida = JSON.parse(localStorage.getItem("matchesextra"));

  if (!partida) {
    console.error("Detalhes da partida não encontrados no localStorage.");
    return;
  }

  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const detalhesPartida = document.getElementById("detalhesPartida");

  detalhesPartida.innerHTML = `
        <div class="popup-content">
            <div class="match-header">
                <p><strong>Data:</strong> ${new Date(
                  partida.datetime
                ).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> ${new Date(
                  partida.datetime
                ).toLocaleTimeString()}</p>
                <p><strong>Estádio:</strong> ${partida.venue} - ${
    partida.location
  }</p>
            </div>
            <div class="match-details">
                <div class="team-info">
                    <h3>${nomesPaises[partida.home_team.name]}</h3>
                    <img width="20" height="15" src="${
                      bandeirasPaises[partida.home_team.country]
                    }" class="team-flag"/>
                    <p><strong>Gols:</strong> ${partida.home_team.goals}</p>
                    <p><strong>Time:</strong> ${
                      nomesPaises[partida.home_team.name]
                    }</p>
                </div>
                <div class="vs">
                    <h2>VS</h2>
                </div>
                <div class="team-info">
                    <h3>${nomesPaises[partida.away_team.name]}</h3>
                    <img width="20" height="15" src="${
                      bandeirasPaises[partida.away_team.country]
                    }" class="team-flag"/>
                    <p><strong>Gols:</strong> ${partida.away_team.goals}</p>
                    <p><strong>Time:</strong> ${
                      nomesPaises[partida.away_team.name]
                    }</p>
                </div>
            </div>
            <div class="match-stats">
                <h3>Estatísticas da Partida</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Estatística</th>
                            <th>${nomesPaises[partida.home_team.name]}</th>
                            <th>${nomesPaises[partida.away_team.name]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Posse de Bola (%)</td>
                            <td>${partida.home_team.possession}</td>
                            <td>${partida.away_team.possession}</td>
                        </tr>
                        <tr>
                            <td>Chutes a Gol</td>
                            <td>${partida.home_team.shots_on_target}</td>
                            <td>${partida.away_team.shots_on_target}</td>
                        </tr>
                        <tr>
                            <td>Faltas</td>
                            <td>${partida.home_team.fouls}</td>
                            <td>${partida.away_team.fouls}</td>
                        </tr>
                        <!-- Adicione mais estatísticas se disponíveis -->
                    </tbody>
                </table>
            </div>
            <div class="match-info">
                <h3>Informações Adicionais</h3>
                <p><strong>Arbitro:</strong> ${
                  partida.referee || "Não disponível"
                }</p>
                <p><strong>Competições:</strong> ${
                  partida.competition || "Não disponível"
                }</p>
            </div>
        </div>
    `;

  overlay.style.display = "block";
  popup.style.display = "block";
}

/*
const nomesPaises = {
  Qatar: "Catar",
  Ecuador: "Equador",
  Senegal: "Senegal",
  Netherlands: "Países Baixos",
  England: "Inglaterra",
  Iran: "Irã",
  "United States": "Estados Unidos",
  Wales: "País de Gales",
  Argentina: "Argentina",
  "Saudi Arabia": "Arábia Saudita",
  Mexico: "México",
  Poland: "Polônia",
  France: "França",
  Australia: "Austrália",
  Denmark: "Dinamarca",
  Tunisia: "Tunísia",
  Spain: "Espanha",
  "Costa Rica": "Costa Rica",
  Germany: "Alemanha",
  Japan: "Japão",
  Belgium: "Bélgica",
  Canada: "Canadá",
  Morocco: "Marrocos",
  Croatia: "Croácia",
  Brazil: "Brasil",
  Serbia: "Sérvia",
  Switzerland: "Suíça",
  Cameroon: "Camarões",
  Portugal: "Portugal",
  Ghana: "Gana",
  Uruguay: "Uruguai",
  Korea: "Coreia do Sul",
};

const bandeirasPaises = {
  QAT: "https://flagcdn.com/w320/qa.png",
  ECU: "https://flagcdn.com/w320/ec.png",
  SEN: "https://flagcdn.com/w320/sn.png",
  NED: "https://flagcdn.com/w320/nl.png",
  ENG: "https://flagcdn.com/w320/gb-eng.png",
  IRN: "https://flagcdn.com/w320/ir.png",
  USA: "https://flagcdn.com/w320/us.png",
  WAL: "https://flagcdn.com/w320/gb-wls.png",
  ARG: "https://flagcdn.com/w320/ar.png",
  KSA: "https://flagcdn.com/w320/sa.png",
  MEX: "https://flagcdn.com/w320/mx.png",
  POL: "https://flagcdn.com/w320/pl.png",
  FRA: "https://flagcdn.com/w320/fr.png",
  AUS: "https://flagcdn.com/w320/au.png",
  DEN: "https://flagcdn.com/w320/dk.png",
  TUN: "https://flagcdn.com/w320/tn.png",
  ESP: "https://flagcdn.com/w320/es.png",
  CRC: "https://flagcdn.com/w320/cr.png",
  GER: "https://flagcdn.com/w320/de.png",
  JPN: "https://flagcdn.com/w320/jp.png",
  BEL: "https://flagcdn.com/w320/be.png",
  CAN: "https://flagcdn.com/w320/ca.png",
  MAR: "https://flagcdn.com/w320/ma.png",
  CRO: "https://flagcdn.com/w320/hr.png",
  BRA: "https://flagcdn.com/w320/br.png",
  SRB: "https://flagcdn.com/w320/rs.png",
  SUI: "https://flagcdn.com/w320/ch.png",
  CMR: "https://flagcdn.com/w320/cm.png",
  POR: "https://flagcdn.com/w320/pt.png",
  GHA: "https://flagcdn.com/w320/gh.png",
  URU: "https://flagcdn.com/w320/uy.png",
  KOR: "https://flagcdn.com/w320/kr.png",
};
*/
