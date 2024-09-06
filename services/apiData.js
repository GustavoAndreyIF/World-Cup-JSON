// Define uma função assíncrona para buscar dados sobre times e partidas
export async function fetchData() {
  try {
    // Faz duas requisições simultâneas para obter dados de times e partidas
    const [teamsResponse, matchesResponse] = await Promise.all([
      fetch("https://worldcupjson.net/teams"), // Requisição para obter dados dos times
      fetch("https://worldcupjson.net/matches"), // Requisição para obter dados das partidas
    ]);

    // Converte a resposta das requisições para JSON
    const teamsData = await teamsResponse.json(); // Dados dos times em formato JSON
    const matchesData = await matchesResponse.json(); // Dados das partidas em formato JSON

    // Armazena os dados no localStorage do navegador
    localStorage.setItem("teams", JSON.stringify(teamsData.groups)); // Armazena os dados dos grupos de times
    localStorage.setItem("matches", JSON.stringify(matchesData)); // Armazena os dados das partidas

    // Exibe uma mensagem no console indicando que os dados foram carregados e armazenados com sucesso
    console.log("Dados carregados e armazenados no localStorage");
  } catch (error) {
    // Captura e exibe qualquer erro que ocorra durante o processo de busca dos dados
    console.error("Erro ao buscar dados:", error);
  }
}
