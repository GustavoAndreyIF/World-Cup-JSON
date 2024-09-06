import { nomesPaises, bandeirasPaises } from "../img/bandeirasNome.js";

// Função assíncrona para exibir os grupos de times
export async function exibirGrupos() {
  // Obtém os grupos de times do localStorage ou faz uma requisição para buscar os times
  const grupos =
    JSON.parse(localStorage.getItem("teams")) || (await fetchTimes());

  // Seleciona o container onde os grupos serão exibidos e limpa seu conteúdo
  const container = document.getElementById("gruposContainer");
  container.innerHTML = "";

  // Itera sobre cada grupo de times
  grupos.forEach((grupo) => {
    // Ordena os times dentro do grupo por pontos, vitórias e saldo de gols
    grupo.teams.sort((a, b) => {
      if (a.group_points !== b.group_points)
        return b.group_points - a.group_points; // Ordena por pontos
      if (a.wins !== b.wins) return b.wins - a.wins; // Ordena por vitórias
      return b.goal_differential - a.goal_differential; // Ordena por saldo de gols
    });

    // Cria um novo elemento de tabela
    const tabela = document.createElement("table");
    tabela.classList.add("tabela-grupos");

    // Define o conteúdo HTML da tabela usando um template literal
    tabela.innerHTML = `
            <!-- Cabeçalho da tabela com os nomes das colunas -->
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
            <!-- Corpo da tabela onde os dados dos times são inseridos -->
            <tbody>
                ${grupo.teams
                  .map(
                    (time, index) => `
                    <!-- Linha para cada time com uma classe baseada na classificação -->
                    <tr class="${
                      index < 2 ? "classificado" : "desclassificado"
                    }">
                        <!-- Coluna com a bandeira e o nome do time -->
                        <td><img src="${
                          bandeirasPaises[time.country] || "#"
                        }" width="20" height="15"><span>${
                      nomesPaises[time.name]
                    }</span></td>
                        <!-- Colunas com estatísticas do time -->
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
                  .join(
                    ""
                  )} <!-- Junta todas as linhas geradas em uma única string -->
            </tbody>
        `;

    // Cria uma nova seção para o grupo
    const sessaoGrupo = document.createElement("div");
    sessaoGrupo.classList.add("sessaoGrupo");

    // Define o título da seção e adiciona a tabela à seção
    sessaoGrupo.innerHTML = `<div class="tituloGrupo">Grupo ${grupo.letter}</div>`;
    sessaoGrupo.appendChild(tabela);

    // Adiciona a seção do grupo ao container principal
    container.appendChild(sessaoGrupo);
  });

  // Remove o seletor de datas antigo, se existir
  const nav = document.querySelector("#selectDiv");
  const selectAntigo = document.getElementById("selectDatas");
  if (selectAntigo) {
    nav.removeChild(selectAntigo);
  }
}
