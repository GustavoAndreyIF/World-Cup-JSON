import { bandeirasPaises, nomesPaises } from "../assets/img/bandeirasNome.js";
export async function carregarDetalhesPartida(partidaId) {
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

export async function carregarPopup() {
  const urlPage = `./pages/detalhesPartidas.html`;

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
    exibirPopup();
  } catch (error) {
    console.error("Erro ao carregar o conteúdo:", error);
  }
}

export async function exibirPopup() {
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
				  <p><strong>Estádio:</strong> ${partida.venue} - ${partida.location}</p>
			  </div>
			  <div class="match-details">
				  <div class="team-info">
					  <h3>${nomesPaises[partida.home_team.name]}</h3>
					  <img width="20" height="15" src="${
              bandeirasPaises[partida.home_team.country]
            }" class="team-flag"/>
					  <p><strong>Gols:</strong> ${partida.home_team.goals}</p>
					  <p><strong>Time:</strong> ${nomesPaises[partida.home_team.name]}</p>
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
					  <p><strong>Time:</strong> ${nomesPaises[partida.away_team.name]}</p>
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
				  <p><strong>Arbitro:</strong> ${partida.referee || "Não disponível"}</p>
				  <p><strong>Competições:</strong> ${
            partida.competition || "Não disponível"
          }</p>
			  </div>
		  </div>
	  `;

  overlay.style.display = "block";
  popup.style.display = "block";
}

export function fecharPopup() {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");

  overlay.style.display = "none";
  popup.style.display = "none";
}
