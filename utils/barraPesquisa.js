import { bandeirasPaises, nomesPaises } from "../assets/img/bandeirasNome.js";
import { criarCard } from "./criarCard.js";

// Função para sugerir times com base no termo de pesquisa fornecido
export function sugerir(termoPesquisa) {
  // Converte o termo de pesquisa para minúsculas para comparação
  const termoLower = termoPesquisa.toLowerCase();
  // Array para armazenar as sugestões encontradas
  const sugestoes = [];

  // Itera sobre as entradas de nomesPaises (objeto de nomes dos países)
  for (const [key, value] of Object.entries(nomesPaises)) {
    // Verifica se o termo de pesquisa corresponde ao início do nome em inglês ou português
    if (
      key.toLowerCase().startsWith(termoLower) ||
      value.toLowerCase().startsWith(termoLower)
    ) {
      // Adiciona a sugestão ao array
      sugestoes.push({ nomeIngles: key, nomePortugues: value });
    }
  }

  // Chama a função para mostrar as sugestões encontradas
  mostrarSugestoes(sugestoes);
}

// Função para mostrar sugestões de times na interface do usuário
export function mostrarSugestoes(sugestoes) {
  // Obtém o container onde as sugestões serão exibidas
  const container = document.getElementById("sugestoesContainer");
  // Limpa o conteúdo do container para mostrar novas sugestões
  container.innerHTML = "";

  // Itera sobre cada sugestão
  sugestoes.forEach((sugestao) => {
    // Cria um novo elemento div para cada sugestão
    const divSugestao = document.createElement("div");
    // Adiciona a classe "sugestao-item" ao div para estilização
    divSugestao.classList.add("sugestao-item");
    // Define o texto do div com o nome em português e inglês do time
    divSugestao.textContent = `${sugestao.nomePortugues} (${sugestao.nomeIngles})`;
    // Define a função a ser executada ao clicar na sugestão
    divSugestao.onclick = function () {
      // Define o valor da barra de pesquisa como o nome em português da sugestão
      document.getElementById("barraPesquisa").value = sugestao.nomePortugues;
      // Limpa o container de sugestões
      container.innerHTML = "";
      // Chama a função para realizar a pesquisa com o novo valor da barra de pesquisa
      pesquisar();
    };

    // Adiciona o div de sugestão ao container
    container.appendChild(divSugestao);
  });
}

// Função para realizar a pesquisa com base no termo de pesquisa da barra de pesquisa
export function pesquisar() {
  // Obtém o valor da barra de pesquisa e converte para minúsculas
  const termoPesquisa = document
    .getElementById("barraPesquisa")
    .value.toLowerCase();
  // Encontra o time correspondente ao termo de pesquisa
  const timeEncontrado = encontrarTime(termoPesquisa, nomesPaises);
  // Obtém o elemento onde o conteúdo da página será exibido
  const conteudoPagina = document.getElementById("conteudoPagina");

  // Verifica se o time foi encontrado
  if (!timeEncontrado) {
    // Cria e exibe uma mensagem de erro se o time não for encontrado
    const msgErro = document.createElement("p");
    msgErro.textContent = "Time não encontrado.";
    conteudoPagina.appendChild(msgErro);
    return;
  }

  // Obtém os nomes em inglês e português do time encontrado
  const nomeIngles = timeEncontrado.nomeIngles.toLowerCase();
  const nomePortugues = timeEncontrado.nomePortugues.toLowerCase();

  // Obtém os dados de times e partidas do localStorage
  const times = JSON.parse(localStorage.getItem("teams"));
  const partidas = JSON.parse(localStorage.getItem("matches"));

  // Filtra os grupos de times que contêm o time pesquisado
  const timesFiltrados = times.filter((grupo) =>
    grupo.teams.some(
      (time) =>
        time.name.toLowerCase().includes(nomeIngles) ||
        time.name.toLowerCase().includes(nomePortugues)
    )
  );

  // Filtra as partidas que envolvem o time pesquisado
  const partidasFiltradas = partidas.filter(
    (partida) =>
      partida.home_team.name.toLowerCase().includes(nomeIngles) ||
      partida.home_team.name.toLowerCase().includes(nomePortugues) ||
      partida.away_team.name.toLowerCase().includes(nomeIngles) ||
      partida.away_team.name.toLowerCase().includes(nomePortugues)
  );

  // Limpa o conteúdo da página e do container de sugestões
  conteudoPagina.innerHTML = "";
  const sugestaoContainer = document.getElementById("sugestoesContainer");
  sugestaoContainer.innerHTML = "";

  // Se houver times filtrados, cria e exibe uma tabela com os times encontrados
  if (timesFiltrados.length > 0) {
    const tituloTimes = document.createElement("h2");
    tituloTimes.classList.add("eliminaHeader");
    tituloTimes.textContent = "Time encontrado:";
    conteudoPagina.appendChild(tituloTimes);

    // Itera sobre cada grupo filtrado de times
    timesFiltrados.forEach((grupo) => {
      // Cria um novo elemento de tabela
      const tabela = document.createElement("table");

      // Adiciona uma classe CSS à tabela para estilização
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
                  <tr class="${index < 2 ? "classificado" : "desclassificado"}">
                      <!-- Coluna com a bandeira e o nome do time -->
                      <td>
                        <img src="${
                          bandeirasPaises[time.country] || "#"
                        }" width="20" height="15">
                        <span>${nomesPaises[time.name]}</span>
                      </td>
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
      // Cria uma seção para o grupo e adiciona a tabela a essa seção
      const sessaoGrupo = document.createElement("div");
      sessaoGrupo.classList.add("sessaoGrupo");
      sessaoGrupo.innerHTML = `<div class="tituloGrupo">Grupo ${grupo.letter}</div>`;
      sessaoGrupo.appendChild(tabela);
      // Adiciona a seção do grupo ao conteúdo da página
      conteudoPagina.appendChild(sessaoGrupo);
    });
  }

  // Se houver partidas filtradas, exibe as partidas encontradas
  if (partidasFiltradas.length > 0) {
    selecionarDataPesquisa(partidasFiltradas);
    const tituloPartidas = document.createElement("h2");
    tituloPartidas.classList.add("eliminaHeader");
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
    // Se nenhuma partida for encontrada, exibe uma mensagem informando
    const msg = document.createElement("p");
    msg.textContent = "Nenhuma partida encontrada.";
    conteudoPagina.appendChild(msg);
  }
  // Chama a função para selecionar a data da pesquisa nas partidas filtradas
  selecionarDataPesquisa(partidasFiltradas);
}

// Função para encontrar um time com base no termo de pesquisa
export function encontrarTime(termoPesquisa, nomesPaises) {
  // Converte o termo de pesquisa para minúsculas para comparação
  const termoLower = termoPesquisa.toLowerCase();

  // Itera sobre as entradas de nomesPaises (objeto de nomes dos países)
  for (const [key, value] of Object.entries(nomesPaises)) {
    // Verifica se o valor (nome em português) ou a chave (nome em inglês) corresponde ao termo de pesquisa
    if (
      value.toLowerCase() === termoLower ||
      key.toLowerCase() === termoLower
    ) {
      // Se encontrar o time, retorna um objeto com o nome em inglês e português
      return { nomeIngles: key, nomePortugues: value };
    }
  }

  // Se não encontrar o time, retorna null
  return null;
}

// Função para criar e exibir um seletor de datas para filtrar partidas
export function selecionarDataPesquisa(partidas) {
  // Obtém os elementos HTML onde o seletor de datas e as partidas filtradas serão exibidos
  const divPartidas = document.querySelector("#partidasFiltro");
  const nav = document.querySelector("#selectDiv");
  let selectDatas = document.getElementById("selectDatas");

  // Se o seletor de datas já existir, remove-o
  if (selectDatas) {
    selectDatas.remove();
  }

  // Cria um novo elemento select para o seletor de datas
  selectDatas = document.createElement("select");
  selectDatas.id = "selectDatas";
  // Adiciona a opção padrão ao seletor
  selectDatas.innerHTML = `<option value="">Selecione uma data</option>`;

  // Cria uma opção para mostrar todas as partidas
  const optionTodas = document.createElement("option");
  optionTodas.value = "todas";
  optionTodas.textContent = "Todas as Partidas";
  selectDatas.appendChild(optionTodas);

  // Obtém uma lista única de datas das partidas
  const datasUnicas = [
    ...new Set(
      partidas.map((partida) => new Date(partida.datetime).toLocaleDateString())
    ),
  ];
  // Ordena as datas
  datasUnicas.sort();

  // Adiciona uma opção para cada data única ao seletor
  datasUnicas.forEach((data) => {
    const option = document.createElement("option");
    option.value = data;
    option.textContent = data;
    selectDatas.appendChild(option);
  });

  // Adiciona o seletor de datas ao elemento de navegação
  nav.appendChild(selectDatas);

  // Adiciona um manipulador de eventos para filtrar partidas com base na data selecionada
  selectDatas.addEventListener("change", (select) => {
    // Obtém a data selecionada
    const dataSelecionada = select.target.value;
    // Filtra as partidas com base na data selecionada
    const partidasFiltradasPorData = partidas.filter(
      (partida) =>
        new Date(partida.datetime).toLocaleDateString() === dataSelecionada
    );

    // Limpa o conteúdo das partidas exibidas
    divPartidas.innerHTML = "";
    // Adiciona um cartão para cada partida filtrada
    partidasFiltradasPorData.forEach((partida) => {
      const card = criarCard(partida);
      if (card) {
        divPartidas.append(card);
      }
    });

    // Se "Todas as Partidas" for selecionado, exibe todas as partidas
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

// Função para exibir todas as partidas na página principal
export function exibirPartidasNoMain(partidas) {
  // Obtém o elemento HTML onde as partidas serão exibidas
  const container = document.getElementById("conteudoPagina");
  // Limpa o conteúdo do container
  container.innerHTML = "";

  // Adiciona um cartão para cada partida
  partidas.forEach((partida) => {
    const card = criarCard(partida);
    container.appendChild(card);
  });
}
