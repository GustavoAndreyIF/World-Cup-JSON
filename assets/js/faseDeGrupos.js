import { nomesPaises, bandeirasPaises } from "../img/bandeirasNome.js"

export async function exibirGrupos() {
  const grupos =
    JSON.parse(localStorage.getItem("teams")) || (await fetchTimes());

  const container = document.getElementById("gruposContainer");
  container.innerHTML = "";

  grupos.forEach((grupo) => {
    grupo.teams.sort((a, b) => {
      if (a.group_points !== b.group_points)
        return b.group_points - a.group_points;
      if (a.wins !== b.wins) return b.wins - a.wins;
      return b.goal_differential - a.goal_differential;
    });

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
    container.appendChild(sessaoGrupo);
  });
  const nav = document.querySelector("#selectDiv");
  const selectAntigo = document.getElementById("selectDatas");
  if (selectAntigo) {
    nav.removeChild(selectAntigo);
  }
}