import { bandeirasPaises, nomesPaises } from "../assets/img/bandeirasNome.js";

// Função exportada que cria um cartão de exibição para uma partida
export function criarCard(partida) {
  // Cria um novo elemento <div> para o cartão
  const card = document.createElement("div");
  // Adiciona a classe "card" ao elemento <div> para estilização
  card.classList.add("card");

  // Obtém a URL da bandeira do time da casa a partir do objeto bandeirasPaises
  const bandeiraTime1 = bandeirasPaises[partida.home_team.country];
  // Obtém a URL da bandeira do time visitante a partir do objeto bandeirasPaises
  const bandeiraTime2 = bandeirasPaises[partida.away_team.country];

  // Define o conteúdo HTML do cartão usando template literals
  card.innerHTML = `
      <div id="${partida.datetime}">
          <div class="team">
              <!-- Exibe a bandeira do time da casa -->
              <img width="20" height="15" src="${bandeiraTime1}"/>
              <!-- Exibe o nome do time da casa e aplica uma classe com base no resultado da partida -->
              <h3 class="${
                partida.winner_code === partida.home_team.country
                  ? "ganhador" // Se o time da casa ganhou, aplica a classe "ganhador"
                  : "perdedor" // Se o time da casa perdeu, aplica a classe "perdedor"
              }">${nomesPaises[partida.home_team.name]}</h3>
              <h3> vs </h3>
              <!-- Exibe o nome do time visitante e aplica uma classe com base no resultado da partida -->
              <h3 class="${
                partida.winner_code === partida.away_team.country
                  ? "ganhador" // Se o time visitante ganhou, aplica a classe "ganhador"
                  : "perdedor" // Se o time visitante perdeu, aplica a classe "perdedor"
              }">${nomesPaises[partida.away_team.name]}</h3>
              <!-- Exibe a bandeira do time visitante -->
              <img width="20" height="15" src="${bandeiraTime2}">
          </div>
          <!-- Exibe o resultado da partida -->
          <p>${partida.home_team.goals} - ${partida.away_team.goals}</p>
          <h4>Estádio</h4>
          <!-- Exibe o nome do estádio e a localização -->
          <p>${partida.venue} - ${partida.location}</p>
          <h4>Data e Horário</h4>
          <!-- Exibe a data e o horário da partida formatados -->
          <p>${new Date(partida.datetime).toLocaleDateString()} - ${new Date(
    partida.datetime
  ).toLocaleTimeString()}</p>
          <!-- Botão que chama a função carregarDetalhesPartida com o id da partida quando clicado -->
          <button onclick="carregarDetalhesPartida('${
            partida.id
          }')">Ver Detalhes</button>
      </div>
      `;
  // Retorna o cartão criado
  return card;
}
