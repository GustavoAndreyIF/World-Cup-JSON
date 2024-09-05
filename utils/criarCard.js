import { bandeirasPaises, nomesPaises } from "../assets/img/bandeirasNome.js";

export function criarCard(partida) {
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
          <button onclick="carregarDetalhesPartida('${
            partida.id
          }')">Ver Detalhes</button>
      </div>
      `;
  return card;
}
