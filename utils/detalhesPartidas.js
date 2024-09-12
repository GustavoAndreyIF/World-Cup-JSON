// Importa os arrays de bandeiras e nomes dos países do módulo bandeirasNome.js
import { bandeirasPaises, nomesPaises } from "../assets/img/bandeirasNome.js";

// Função para carregar os detalhes de uma partida específica
export async function carregarDetalhesPartida(partidaId) {
  // Define a URL para obter os detalhes da partida usando o ID fornecido
  const url = `https://worldcupjson.net/matches/${partidaId}`;
  try {
    // Faz uma requisição para a URL fornecida
    const resposta = await fetch(url);
    // Verifica se a resposta foi bem-sucedida; se não, lança um erro
    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
    }
    // Converte a resposta para JSON
    const partida = await resposta.json();
    // Armazena os detalhes da partida no localStorage
    localStorage.setItem("matchesextra", JSON.stringify(partida));
    // Chama a função para carregar e exibir o popup
    carregarPopup();
  } catch (error) {
    // Exibe um erro no console se algo der errado
    console.error("Erro ao carregar os detalhes da partida:", error);
  }
}

// Função para carregar o conteúdo do popup
export async function carregarPopup() {
  // Define a URL da página HTML que contém o template do popup
  const urlPage = `./pages/detalhesPartidas.html`;

  try {
    // Faz uma requisição para a URL fornecida
    const resposta = await fetch(urlPage);
    // Verifica se a resposta foi bem-sucedida; se não, lança um erro
    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
    }
    // Converte a resposta para texto
    const dados = await resposta.text();

    // Obtém o elemento com id "conteudoPopup"; se não existir, cria um novo
    let conteudoPopup = document.getElementById("conteudoPopup");
    if (!conteudoPopup) {
      conteudoPopup = document.createElement("div");
      conteudoPopup.id = "conteudoPopup";
      const conteudoDiv = document.getElementById("conteudoPagina");
      conteudoDiv.appendChild(conteudoPopup);
    }
    // Define o conteúdo HTML do popup com os dados carregados
    conteudoPopup.innerHTML = dados;
    // Chama a função para exibir o popup
    exibirPopup();
  } catch (error) {
    // Exibe um erro no console se algo der errado
    console.error("Erro ao carregar o conteúdo:", error);
  }
}

// Função para exibir o popup com os detalhes da partida
export async function exibirPopup() {
  // Obtém os detalhes da partida do localStorage
  const partida = JSON.parse(localStorage.getItem("matchesextra"));

  // Verifica se os detalhes da partida foram encontrados
  if (!partida) {
    console.error("Detalhes da partida não encontrados no localStorage.");
    return;
  }

  // Obtém os elementos do DOM para exibir o popup e o overlay
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const detalhesPartida = document.getElementById("detalhesPartida");

  // Define o conteúdo HTML do popup com os detalhes da partida
  detalhesPartida.innerHTML = `
  <div class="popup-content">
	  <!-- Cabeçalho da partida com data, hora, estádio e localização -->
	  <div class="match-header">
		  <p><strong>Data:</strong> ${new Date(
        partida.datetime
      ).toLocaleDateString()}</p> <!-- Data da partida formatada -->
		  <p><strong>Hora:</strong> ${new Date(
        partida.datetime
      ).toLocaleTimeString()}</p> <!-- Hora da partida formatada -->
		  <p><strong>Estádio:</strong> ${partida.venue} - ${
    partida.location
  }</p> <!-- Nome do estádio e localização -->
	  </div>
	  <!-- Detalhes da partida com informações das equipes -->
	  <div class="match-details">
		  <!-- Informações do time da casa -->
		  <div class="team-info">
			  <h3>${nomesPaises[partida.home_team.name]}</h3> <!-- Nome do time da casa -->
			  <img width="20" height="15" src="${
          bandeirasPaises[partida.home_team.country]
        }" class="team-flag"/> <!-- Bandeira do time da casa -->
			  <p><strong>Gols:</strong> ${
          partida.home_team.goals
        }</p> <!-- Gols do time da casa -->
			  <p><strong>Time:</strong> ${
          nomesPaises[partida.home_team.name]
        }</p> <!-- Nome do time da casa -->
		  </div>
		  <!-- Separador entre os times -->
		  <div class="vs">
			  <h2>VS</h2>
		  </div>
		  <!-- Informações do time visitante -->
		  <div class="team-info">
			  <h3>${
          nomesPaises[partida.away_team.name]
        }</h3> <!-- Nome do time visitante -->
			  <img width="20" height="15" src="${
          bandeirasPaises[partida.away_team.country]
        }" class="team-flag"/> <!-- Bandeira do time visitante -->
			  <p><strong>Gols:</strong> ${
          partida.away_team.goals
        }</p> <!-- Gols do time visitante -->
			  <p><strong>Time:</strong> ${
          nomesPaises[partida.away_team.name]
        }</p> <!-- Nome do time visitante -->
		  </div>
	  </div>
	  <!-- Estatísticas da partida -->
	  <div class="match-stats">
		  <h3>Estatísticas da Partida</h3>
		  <table>
			  <thead>
				  <tr>
					  <th>Estatística</th> <!-- Cabeçalho da coluna de estatísticas -->
					  <th>${nomesPaises[partida.home_team.name]}</th> <!-- Nome do time da casa -->
					  <th>${
              nomesPaises[partida.away_team.name]
            }</th> <!-- Nome do time visitante -->
				  </tr>
			  </thead>
			  <tbody>
				  <!-- Linha de posse de bola -->
				  <tr>
					  <td>Posse de Bola (%)</td>
					  <td>${
              partida.home_team.possession !== undefined
                ? partida.home_team.possession
                : "-"
            }</td> <!-- Posse de bola do time da casa -->
					  <td>${
              partida.away_team.possession !== undefined
                ? partida.away_team.possession
                : "-"
            }</td> <!-- Posse de bola do time visitante -->
				  </tr>
				  <!-- Linha de chutes a gol -->
				  <tr>
					  <td>Chutes a Gol</td>
					  <td>
              ${
                partida.home_team.shots_on_target !== undefined
                  ? partida.home_team.shots_on_target
                  : "-"
              }
            </td> <!-- Chutes a gol do time da casa -->
					  <td>${
              partida.away_team.shots_on_target !== undefined
                ? partida.away_team.shots_on_target
                : "-"
            }</td> <!-- Chutes a gol do time visitante -->
				  </tr>
				  <!-- Linha de faltas -->
				  <tr>
					  <td>Faltas</td>
					  <td>${
              partida.home_team.fouls !== undefined
                ? partida.home_team.fouls
                : "-"
            }</td> <!-- Faltas cometidas pelo time da casa -->
					  <td>${
              partida.away_team.fouls !== undefined
                ? partida.away_team.fouls
                : "-"
            }</td> <!-- Faltas cometidas pelo time visitante -->
				  </tr>
				  <!-- Adicione mais estatísticas se disponíveis -->
			  </tbody>
		  </table>
	  </div>
	  <!-- Informações adicionais sobre a partida -->
	  <div class="match-info">
		  <h3>Informações Adicionais</h3>
		  <p><strong>Arbitro:</strong> ${
        partida.referee || "Não disponível"
      }</p> <!-- Nome do árbitro ou "Não disponível" se não houver -->
		  <p><strong>Competições:</strong> ${
        partida.competition || "Não disponível"
      }</p> <!-- Nome da competição ou "Não disponível" se não houver -->
	  </div>
  </div>
`;

  // Exibe o overlay e o popup
  overlay.style.display = "block";
  popup.style.display = "block";
}

// Função para fechar o popup
export function fecharPopup() {
  // Obtém os elementos do DOM para o popup e o overlay
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");

  // Oculta o overlay e o popup
  overlay.style.display = "none";
  popup.style.display = "none";
}
