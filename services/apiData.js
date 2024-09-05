export async function fetchData() {
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
