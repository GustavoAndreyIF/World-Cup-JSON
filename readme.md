# Sumário

1. [Explicação do Código - main.js](#explicação-do-código---mainjs)

   - [Objetivo](#objetivo)
   - [Explicação do Código](#explicação-do-código)
     - [Importação de Módulos e Funções](#importação-de-módulos-e-funções)
     - [Configuração Global](#configuração-global)
     - [Verificação e Carregamento de Dados](#verificação-e-carregamento-de-dados)
     - [Função para Carregar Conteúdo](#função-para-carregar-conteúdo)
     - [Configuração da Barra de Pesquisa](#configuração-da-barra-de-pesquisa)
     - [Função para Remover Elementos](#função-para-remover-elementos)
     - [Configuração dos Links de Navegação](#configuração-dos-links-de-navegação)
   - [Conclusão](#conclusão)

2. [Explicação do Código - utils/detalhesPartidas.js](#explicação-do-código---utilsdetalhespartidasjs)

   - [Objetivo](#objetivo-1)
   - [Explicação do Código](#explicação-do-código-1)
     - [Importação de Módulos e Funções](#importação-de-módulos-e-funções-1)
     - [Função `carregarDetalhesPartida`](#função-carregardetalhespartida)
     - [Função `carregarPopup`](#função-carregarpopup)
     - [Função `exibirPopup`](#função-exibirpopup)
     - [Função `fecharPopup`](#função-fecharpopup)
   - [Conclusão](#conclusão-1)

3. [Explicação do Código - utils/criarCard.js](#explicação-do-código---utilscriarcardjs)

   - [Objetivo](#objetivo-2)
   - [Explicação do Código](#explicação-do-código-2)
     - [Importação de Módulos](#importação-de-módulos)
     - [Função `criarCard`](#função-criarcard)
   - [Conclusão](#conclusão-2)

4. [Explicação do Código - utils/barraPesquisa.js](#explicação-do-código---utilsbarra-pesquisajs)

   - [Objetivo](#objetivo-3)
   - [Explicação do Código](#explicação-do-código-3)
     - [Importação de Módulos e Funções](#importação-de-módulos-e-funções-2)
     - [Função `sugerir(termoPesquisa)`](#função-sugerirtermopesquisa)
     - [Função `mostrarSugestoes(sugestoes)`](#função-mostrarsugestoessugestoes)
     - [Função `pesquisar()`](#função-pesquisar)
     - [Função `encontrarTime(termoPesquisa, nomesPaises)`](#função-encontrartimetermopesquisa-nomespaises)
     - [Função `selecionarDataPesquisa(partidas)`](#função-selecionardatapresequisa-partidas)
     - [Função `exibirPartidasNoMain(partidas)`](#função-exibirpartidasnomainpartidas)
   - [Conclusão](#conclusão-3)

5. [Explicação do Código - services/apiData.js](#explicação-do-código---servicesapiDatajs)

   - [Objetivo](#objetivo-4)
   - [Explicação do Código](#explicação-do-código-4)
     - [Função `fetchData`](#função-fetchdata)
   - [Conclusão](#conclusão-4)

6. [Explicação do Código - assts/js/faseDeGrupos.js](#explicação-do-código---asstsjsfaseDeGruposjs)

   - [Objetivo](#objetivo-5)
   - [Explicação do Código](#explicação-do-código-5)
     - [Importação de Módulos](#importação-de-módulos-1)
     - [Função `exibirGrupos`](#função-exibirgrupos)
   - [Conclusão](#conclusão-5)

7. [Explicação do Código - assets/js/eliminatorias.js](#explicação-do-código---assetsjseliminatoriasjs)
   - [Objetivo](#objetivo-6)
   - [Explicação do Código](#explicação-do-código-6)
     - [Importação de Módulos](#importação-de-módulos-2)
     - [Função `exibirPartidas(dataFiltro = null)`](#função-exibirpartidasdatafiltro--null)
     - [Função `selecionarData()`](#função-selecionardata)
   - [Conclusão](#conclusão-6)

# Respostas às Questões Utilizando a Explicação do Código

## 1. Como o código faz a requisição para a API e exibe todos os jogos de uma data específica?

O código usa a função `fetchData` do arquivo `services/apiData.js` para buscar dados de partidas da API. Para exibir todos os jogos de uma data específica, o código poderia usar a função `exibirPartidas` do arquivo `assets/js/eliminatorias.js`. Esta função permite filtrar as partidas por data ao passar um parâmetro `dataFiltro`. Ela obtém todas as partidas armazenadas ou faz uma requisição para buscar novas partidas e, em seguida, filtra as partidas com base na data fornecida.

## 2. Como o código faz a requisição para a API e exibe os detalhes de um jogo específico?

A função `carregarDetalhesPartida` do arquivo `utils/detalhesPartidas.js` é responsável por buscar os detalhes de uma partida específica. Ela utiliza o `partidaId` para construir a URL da API, faz uma requisição para obter os detalhes da partida e, se a resposta for bem-sucedida, armazena as informações no `localStorage`. Em seguida, chama a função `carregarPopup` para exibir os detalhes da partida no popup.

## 3. Como o código faz a requisição para a API e exibe todos os jogos de uma equipe específica?

Para exibir todos os jogos de uma equipe específica, o código usa a função `pesquisar` do arquivo `utils/barraPesquisa.js`. Esta função faz uma busca pelo termo de pesquisa inserido pelo usuário, filtra os times e as partidas armazenadas no `localStorage`, e exibe os resultados filtrados, que incluem os jogos da equipe específica. A função também utiliza a função `encontrarTime` para localizar o time correspondente ao termo de pesquisa.

## 4. Como o código faz a requisição para a API e exibe uma tabela de classificação dos grupos da Copa do Mundo?

A tabela de classificação dos grupos é exibida pela função `exibirGrupos` do arquivo `assts/js/faseDeGrupos.js`. Esta função obtém os dados dos grupos de times, ordena os times com base em suas estatísticas e cria tabelas HTML para exibir as informações. A função limpa o container de grupos, cria uma tabela para cada grupo, e adiciona as seções das tabelas ao container principal.

## 5. Como o código faz a requisição para a API e exibe o resultado final da Copa do Mundo, incluindo o campeão e o vice-campeão?

O resultado final da Copa do Mundo, incluindo o campeão e o vice-campeão, pode ser exibido pela função `exibirPartidas` do arquivo `assets/js/eliminatorias.js`. Esta função exibe as partidas da fase de eliminatórias e pode ser ajustada para mostrar as partidas finais. Para obter o campeão e o vice-campeão, a função poderia filtrar as partidas da final e processar os resultados para determinar os vencedores. As informações são obtidas a partir do `localStorage` ou diretamente da API, conforme necessário.


# Explicação do Código - main.js

## Objetivo

O código tem como objetivo gerenciar o carregamento dinâmico de conteúdo para uma página da web, manipular a interface do usuário, e integrar funcionalidades relacionadas a detalhes de partidas e pesquisa.

## Explicação do Código

### 1. Importação de Módulos e Funções

O código importa várias funções e módulos necessários para a operação do script:

- **Importação de Funções**:
  - `fetchData` é importada para obter dados sobre times e partidas.
  - `sugerir` e `pesquisar` são importadas para fornecer sugestões e realizar pesquisas na barra de pesquisa.
  - Funções para manipulação de detalhes de partidas (`carregarDetalhesPartida`, `exibirPopup`, `carregarPopup`, `fecharPopup`) são importadas para exibir e gerenciar informações sobre partidas.
  - Funções para exibir grupos e partidas (`exibirGrupos`, `exibirPartidas`, `selecionarData`) são importadas para exibir informações específicas nas diferentes fases do campeonato.

### 2. Configuração Global

- **Funções Globalmente Disponíveis**: As funções importadas são adicionadas ao objeto global `window`, tornando-as acessíveis globalmente no código da página.

### 3. Verificação e Carregamento de Dados

- **Verificação no `localStorage`**: Verifica se os dados de times e partidas estão armazenados no `localStorage`. Se não estiverem, chama a função `fetchData` para buscar esses dados.

### 4. Função para Carregar Conteúdo

- **Função `carregarConteudo`**:
  - **Requisição e Resposta**: Faz uma requisição para a URL fornecida e verifica se a resposta é bem-sucedida.
  - **Tratamento de Erros**: Lança um erro se a resposta não for bem-sucedida e exibe um erro no console.
  - **Atualização do HTML**: Atualiza o conteúdo do elemento com id "conteudoPagina" com os dados recebidos.

### 5. Configuração da Barra de Pesquisa

- **Configuração da Barra de Pesquisa**:
  - **Manipuladores de Eventos**: Se o elemento "barraPesquisa" existir, configura manipuladores de eventos para sugerir resultados enquanto o usuário digita e realizar a pesquisa quando a tecla "Enter" é pressionada.

### 6. Função para Remover Elementos

- **Função `removeSelect`**:
  - Remove um elemento com id "selectDatas" do contêiner com id "selectDiv", se existir.

### 7. Configuração dos Links de Navegação

- **Manipuladores de Eventos de Navegação**:
  - **Primeiro Link**: Carrega o conteúdo da página "inicio.html" e remove o elemento de seleção quando o primeiro link é clicado.
  - **Segundo Link**: Carrega o conteúdo da página "faseDeGrupos.html" e exibe os grupos quando o segundo link é clicado.
  - **Terceiro Link**: Carrega o conteúdo da página "eliminatorias.html", exibe as partidas e permite a seleção de data quando o terceiro link é clicado.

## Conclusão

O código é responsável por gerenciar a navegação e a exibição de conteúdo dinâmico em uma página web, manipulando dados relacionados a partidas e oferecendo funcionalidades interativas para o usuário.

# Explicação do Código - utils/detalhesPartidas.js

## Objetivo

O código tem como objetivo carregar e exibir detalhes de partidas de futebol, gerenciar a interface do popup e manipular as informações da partida, como estatísticas e dados das equipes.

## Explicação do Código

### 1. Importação de Módulos e Funções

- **Importação de Dados**:
  - `bandeirasPaises` e `nomesPaises` são importados para fornecer as bandeiras e nomes dos países para exibição nos detalhes da partida.

### 2. Função `carregarDetalhesPartida`

- **Objetivo**:

  - Carrega os detalhes de uma partida específica a partir de uma API e armazena essas informações no `localStorage`.

- **Passos**:
  - **Construção da URL**: Utiliza o `partidaId` para construir a URL da API que fornece detalhes da partida.
  - **Requisição e Resposta**: Faz uma requisição para a API e verifica se a resposta é bem-sucedida.
  - **Armazenamento e Exibição**: Armazena os detalhes da partida no `localStorage` e chama a função `carregarPopup` para exibir o conteúdo.

### 3. Função `carregarPopup`

- **Objetivo**:

  - Carrega o conteúdo HTML do popup a partir de um arquivo e exibe-o na página.

- **Passos**:
  - **Requisição e Resposta**: Faz uma requisição para obter o HTML da página de detalhes da partida.
  - **Criação do Elemento**: Cria o elemento `conteudoPopup` se ele não existir e adiciona-o ao DOM.
  - **Atualização e Exibição**: Atualiza o conteúdo do popup com os dados recebidos e chama a função `exibirPopup`.

### 4. Função `exibirPopup`

- **Objetivo**:

  - Exibe as informações detalhadas da partida em um popup.

- **Passos**:
  - **Recuperação de Dados**: Obtém os detalhes da partida armazenados no `localStorage`.
  - **Exibição dos Detalhes**:
    - **Cabeçalho da Partida**: Exibe a data, hora, estádio e localização da partida.
    - **Informações dos Times**: Exibe o nome, bandeira e gols dos times da casa e visitante.
    - **Estatísticas da Partida**: Exibe estatísticas detalhadas como posse de bola, chutes a gol e faltas.
    - **Informações Adicionais**: Exibe informações adicionais como árbitro e competição.
  - **Exibição do Popup**: Torna visíveis os elementos `popup` e `overlay` para exibir o conteúdo.

### 5. Função `fecharPopup`

- **Objetivo**:

  - Fecha o popup e oculta o overlay.

- **Passos**:
  - **Alteração de Estilos**: Define o estilo de `popup` e `overlay` para `none`, ocultando-os da visualização.

## Conclusão

O código gerencia a exibição de detalhes de partidas em um popup, carregando e exibindo informações detalhadas, estatísticas e dados das equipes, e fornecendo uma interface interativa para o usuário.

# Explicação do Código - utils/criarCard.js

## Objetivo

O código tem como objetivo criar um cartão HTML para exibir informações sobre uma partida de futebol, incluindo detalhes dos times, resultado, estádio, data e horário, e fornecer um botão para visualizar detalhes adicionais da partida.

## Explicação do Código

### 1. Importação de Módulos

- **Importação de Dados**:
  - `bandeirasPaises` e `nomesPaises` são importados para fornecer as bandeiras e nomes dos países para exibição no cartão.

### 2. Função `criarCard`

- **Objetivo**:

  - Cria um cartão HTML para exibir informações sobre uma partida de futebol.

- **Passos**:

  - **Criação do Elemento**:

    - Cria um novo elemento `<div>` que será usado como o cartão da partida.
    - Adiciona a classe "card" ao elemento para estilização.

  - **Obtendo Bandeiras**:

    - Obtém a URL da bandeira do time da casa (`bandeiraTime1`) e do time visitante (`bandeiraTime2`) a partir do objeto `bandeirasPaises`.

  - **Definição do Conteúdo HTML**:
    - **Estrutura do Cartão**:
      - Adiciona um ID ao elemento `<div>` usando a data e hora da partida para facilitar a identificação.
      - Cria uma seção para as informações dos times, incluindo as bandeiras e os nomes dos times.
      - Aplica classes "ganhador" ou "perdedor" aos nomes dos times com base no resultado da partida.
      - Exibe o resultado da partida (gols dos times).
      - Adiciona informações sobre o estádio e a localização.
      - Exibe a data e o horário da partida formatados.
      - Adiciona um botão que, ao ser clicado, chama a função `carregarDetalhesPartida` com o ID da partida para exibir detalhes adicionais.

- **Retorno do Cartão**:
  - Retorna o cartão HTML criado.

## Conclusão

O código é responsável por criar um cartão visualmente formatado para exibir informações de uma partida de futebol, incluindo detalhes dos times, resultados, estádio, data e horário, e fornece uma interação para visualizar mais detalhes sobre a partida.

# Explicação do Código - utils/barraPesquisa.js

## Objetivo

Este código fornece funcionalidades para realizar buscas e exibir sugestões relacionadas a times, bem como filtrar e exibir partidas com base na data. Ele é projetado para melhorar a interação do usuário com a interface, permitindo pesquisas eficientes e uma visualização clara das informações.

## Explicação do Código

### 1. Importação de Módulos e Funções

O código importa dois módulos:

- **bandeirasPaises** e **nomesPaises**: Dados sobre bandeiras e nomes dos países.
- **criarCard**: Função para criar um cartão de exibição para uma partida.

### 2. Função `sugerir(termoPesquisa)`

- **Objetivo**: Fornecer sugestões de nomes de times com base no termo de pesquisa inserido pelo usuário.
- **Processo**:
  - Converte o termo de pesquisa para minúsculas.
  - Itera sobre o objeto `nomesPaises` para encontrar correspondências.
  - Adiciona as correspondências a uma lista de sugestões.
  - Chama `mostrarSugestoes` para exibir essas sugestões.

### 3. Função `mostrarSugestoes(sugestoes)`

- **Objetivo**: Exibir uma lista de sugestões de nomes de times.
- **Processo**:
  - Limpa o conteúdo do container de sugestões.
  - Cria e adiciona um item de sugestão para cada sugestão encontrada.
  - Define o comportamento de clique para que, ao selecionar uma sugestão, o campo de pesquisa seja preenchido e a função `pesquisar` seja chamada.

### 4. Função `pesquisar()`

- **Objetivo**: Buscar e exibir informações relacionadas a um time com base no termo de pesquisa.
- **Processo**:
  - Obtém o termo de pesquisa e o filtra com base no nome do time.
  - Verifica se o time existe e, se não, exibe uma mensagem de erro.
  - Filtra os times e partidas armazenados no `localStorage` com base no nome do time.
  - Exibe os resultados filtrados:
    - Cria e exibe uma tabela com os times encontrados, se houver.
    - Cria e exibe cartões para as partidas encontradas.
    - Exibe uma mensagem caso nenhuma partida seja encontrada.
  - Adiciona um seletor de datas para filtrar as partidas por data.

### 5. Função `encontrarTime(termoPesquisa, nomesPaises)`

- **Objetivo**: Encontrar um time correspondente ao termo de pesquisa.
- **Processo**:
  - Converte o termo de pesquisa para minúsculas.
  - Itera sobre os nomes dos países e verifica se o termo corresponde ao nome em inglês ou português.
  - Retorna um objeto com o nome em inglês e português se houver correspondência, ou `null` se não houver.

### 6. Função `selecionarDataPesquisa(partidas)`

- **Objetivo**: Criar um seletor de datas para filtrar as partidas por data.
- **Processo**:
  - Cria e exibe um seletor de datas, incluindo uma opção para mostrar todas as partidas.
  - Adiciona opções para datas únicas encontradas nas partidas.
  - Adiciona um manipulador de eventos ao seletor para filtrar partidas com base na data selecionada e atualizar a exibição de partidas.

### 7. Função `exibirPartidasNoMain(partidas)`

- **Objetivo**: Exibir todas as partidas em uma seção específica da página principal.
- **Processo**:
  - Limpa o conteúdo da seção onde as partidas serão exibidas.
  - Adiciona um cartão para cada partida no container.

## Conclusão

O código fornece uma série de funcionalidades para pesquisa e exibição de informações sobre times e partidas, melhorando a interação do usuário com a interface ao permitir pesquisas e filtragens eficientes. Ele lida com sugestões, exibição de resultados e filtragem de dados de forma dinâmica e interativa.

# Explicação do Código - services/apiData.js

## Objetivo

Este código tem o objetivo de buscar dados de times e partidas da Copa do Mundo a partir de uma API e armazenar essas informações no `localStorage` do navegador.

## Explicação do Código

### 1. Função `fetchData`

- **Objetivo**: Buscar dados de times e partidas e armazená-los no `localStorage`.

- **Processo**:

  - **Requisições Simultâneas**:

    - Utiliza `Promise.all` para realizar duas requisições HTTP simultâneas para obter os dados dos times e das partidas.
    - A URL `https://worldcupjson.net/teams` é usada para buscar informações sobre os times.
    - A URL `https://worldcupjson.net/matches` é usada para buscar informações sobre as partidas.

  - **Conversão para JSON**:

    - Converte as respostas das requisições para o formato JSON usando `response.json()`.

  - **Armazenamento no `localStorage`**:

    - Armazena os dados dos grupos de times e das partidas no `localStorage` do navegador, convertendo-os para strings JSON com `JSON.stringify()`.

  - **Mensagem de Sucesso**:

    - Exibe uma mensagem no console para indicar que os dados foram carregados e armazenados com sucesso.

  - **Tratamento de Erros**:
    - Captura e exibe qualquer erro que ocorra durante o processo de busca dos dados.

## Conclusão

O código é responsável por buscar dados sobre times e partidas de uma API externa e armazenar essas informações localmente no navegador, facilitando o acesso rápido a esses dados em futuras interações com a aplicação.

# Explicação do Código - assts/js/faseDeGrupos.js

## Objetivo

O código tem como objetivo exibir as informações dos grupos da fase de grupos da Copa do Mundo, incluindo a criação e exibição de tabelas com os dados dos times. A função `exibirGrupos` carrega os dados dos grupos, ordena os times com base em suas estatísticas e atualiza o conteúdo da página com as informações dos times.

## Explicação do Código

### 1. Importação de Módulos

- **Importação de Dados**:
  - `nomesPaises` e `bandeirasPaises` são importados para obter os nomes e bandeiras dos países para exibição nas tabelas.

### 2. Função `exibirGrupos`

- **Objetivo**:

  - Exibir as informações dos grupos de times, criando e populando tabelas HTML com os dados dos times.

- **Passos**:

  - **Obtendo os Dados**:

    - Obtém os grupos de times do `localStorage` ou faz uma requisição para buscar os times se não estiverem armazenados.

  - **Selecionando e Limpando o Container**:

    - Seleciona o container com id "gruposContainer" e limpa seu conteúdo para preparar a atualização.

  - **Iteração sobre os Grupos**:

    - Itera sobre cada grupo de times.

    - **Ordenação dos Times**:

      - Ordena os times dentro do grupo por pontos, vitórias e saldo de gols usando a função `sort`.

    - **Criação da Tabela**:

      - Cria um elemento de tabela HTML.
      - Define o conteúdo da tabela com um template literal, que inclui:
        - **Cabeçalho da Tabela**:
          - Define os nomes das colunas, como "Equipe", "Pts", "PJ", etc.
        - **Corpo da Tabela**:
          - Mapeia os times do grupo para criar linhas da tabela, adicionando:
            - **Classe da Linha**:
              - Define uma classe "classificado" ou "desclassificado" com base na posição do time.
            - **Informações do Time**:
              - Exibe a bandeira e o nome do time, pontos, jogos, vitórias, empates, derrotas, gols a favor, gols contra e saldo de gols.

    - **Criação da Seção do Grupo**:

      - Cria uma nova `div` para representar a seção do grupo.
      - Define o título da seção com a letra do grupo e adiciona a tabela à seção.

    - **Adição ao Container Principal**:
      - Adiciona a seção do grupo ao container principal.

  - **Remoção do Seletor de Datas**:
    - Seleciona e remove qualquer seletor de datas antigo, se existir, do contêiner com id "selectDiv".

## Conclusão

O código é responsável por criar e exibir tabelas com informações detalhadas sobre os times em cada grupo da fase de grupos da Copa do Mundo. Ele lida com a ordenação dos times, a criação de elementos HTML e a atualização da interface do usuário para refletir as informações dos grupos de forma dinâmica e interativa.

# Explicação do Código - assets/js/eliminatorias.js

## Objetivo

O código tem como objetivo exibir as partidas da fase de eliminatórias da Copa do Mundo, permitindo a filtragem por data. Ele inclui funções para mostrar as partidas de diferentes fases e criar um seletor para escolher a data das partidas a serem exibidas.

## Explicação do Código

### 1. Importação de Módulos

- **Importação da Função**:
  - `criarCard` é importada para criar a representação visual de cada partida.

### 2. Função `exibirPartidas(dataFiltro = null)`

- **Objetivo**:

  - Exibir as partidas da fase de eliminatórias, filtradas por data se um filtro for fornecido.

- **Passos**:
  - **Obtendo as Partidas**:
    - Obtém as partidas armazenadas no `localStorage` ou faz uma requisição para buscar os jogos se não estiverem armazenados.
  - **Preparando o Container**:
    - Seleciona o container HTML onde as partidas serão exibidas e limpa seu conteúdo.
  - **Definindo as Fases**:
    - Mapeia os nomes das fases da competição para uma exibição mais amigável.
  - **Criando Seções para Cada Fase**:
    - Para cada fase, cria uma `div` e adiciona um título.
    - Cria um container para os cartões das partidas e filtra as partidas para a fase atual e data (se fornecida).
    - Adiciona os cartões de partidas ao container e, se houver cartões, adiciona a `div` da fase ao container principal.

### 3. Função `selecionarData()`

- **Objetivo**:

  - Criar e exibir um seletor de datas para filtrar as partidas exibidas.

- **Passos**:
  - **Preparando o Seletor**:
    - Seleciona o container de navegação e remove qualquer seletor de datas antigo.
    - Cria um novo seletor de datas com uma opção para mostrar todas as partidas.
  - **Obtendo Datas Únicas**:
    - Obtém as partidas armazenadas e extrai datas únicas para adicionar ao seletor.
    - Adiciona uma opção para cada data única no seletor.
  - **Adicionando o Seletor ao DOM**:
    - Adiciona o seletor de datas ao container de navegação.
  - **Adicionando Manipulador de Eventos**:
    - Adiciona um evento ao seletor para exibir partidas com base na data selecionada. Se a opção "todas" for selecionada, exibe todas as partidas.

## Conclusão

O código é responsável por exibir as partidas da fase de eliminatórias da Copa do Mundo, incluindo a capacidade de filtrar as partidas por data. Ele configura as seções das fases do torneio e cria um seletor para permitir ao usuário escolher quais partidas visualizar com base na data.
