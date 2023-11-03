# My GPS - Tracking

Este aplicativo React Native com Expo permite aos usuários sincronizar suas localizações em tempo real e definir intervalos de tempo personalizados para atualizações de localização do dispositivo.

## Funcionalidades

- Sincronização da localização do dispositivo em tempo real.
- Configuração personalizada do intervalo de tempo para envio da localização.
- Exibição do status de envio das localizações, indicando sucesso ou pendências.

## Tecnologias Utilizadas

- React Native
- Expo
- @expo/vector-icons
- @react-native-community/netinfo
- Redux
- Axios
- date-fns-tz
- expo-location
- expo-router
- uuid
- TypeScript
- Vitest
- react-native-safe-area-context

## Bibliotecas Principais

### expo-location
Acessa a localização do dispositivo e permite o monitoramento da posição em tempo real, crucial para a funcionalidade principal do aplicativo.

### @expo/vector-icons
Fornece uma coleção de ícones para uso dentro do aplicativo, facilitando a implementação de uma interface de usuário intuitiva.

### @react-native-community/netinfo
Monitora a conectividade de rede do dispositivo, permitindo que o aplicativo responda adequadamente a alterações na disponibilidade de conexão à Internet.

### Redux
Gerencia o estado do aplicativo, armazenando e atualizando o status das localizações e as configurações do usuário.

### Axios
Responsável pelas requisições HTTP para enviar dados de localização para um servidor ou API externa.

### date-fns-tz
Manipula datas com fusos horários, garantindo que as localizações sejam marcadas corretamente de acordo com o horário local do usuário.

### expo-router
Gerencia a navegação e as rotas dentro do aplicativo, permitindo uma transição suave entre diferentes telas e estados.

### uuid
Gera identificadores únicos que podem ser usados para rastrear as sessões de envio de localização individualmente.

### TypeScript
Adiciona tipos estáticos ao código para melhorar a prevenção de erros e permitir uma manutenção mais clara do código.

### Vitest
Um framework de teste utilizado para executar testes unitários e garantir que o código funcione como esperado.

### react-native-safe-area-context
Fornece um wrapper seguro para componentes que precisam estar dentro das áreas seguras da tela, evitando sobreposições com elementos como o notch ou o software home indicator em dispositivos móveis.

## Pré-requisitos

Antes de executar este aplicativo, você precisará ter o Expo CLI instalado em seu computador. O Expo CLI é uma ferramenta de linha de comando que é usada para iniciar, construir e servir projetos React Native. Para verificar se você já tem o Expo CLI instalado, execute o seguinte comando no terminal:

```sh
expo --version

Se o Expo CLI estiver instalado, você verá a versão atual listada. Caso contrário, será necessário instalar o Expo CLI. Você pode instalar o Expo CLI globalmente usando o NPM ou o Yarn com o seguinte comando:

# Usando NPM
npm install -g expo-cli

# Usando Yarn
yarn global add expo-cli

## Instalação

Para rodar o projeto, você precisará do Node.js e do Expo CLI instalados. Clone o repositório e instale as dependências:

```sh
# Clone o repositório
git clone git@github.com:luislong0/contele-test-react-ative.git
cd projeto

# Instale as dependências
npm install

# Inicie o servidor Expo
expo start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar no Web
npm run web

# Executar testes
npm run test

# Executar testes em modo de observação
npm run test:watch

## Rotas/Telas

O aplicativo possui duas rotas principais:

- **Home (`/`):** É a tela inicial onde o usuário pode ativar ou desativar a sincronização da localização do dispositivo com o sistema.

- **Status (`/status`):** Nesta tela, o usuário pode verificar o status dos envios de localização para o sistema, identificando se os envios foram bem-sucedidos ou se estão pendentes devido à falta de conexão com a internet.

## Agradecimentos

Gostaria de expressar minha sincera gratidão pela oportunidade de participar do processo seletivo para esta vaga de emprego. Trabalhar neste projeto teste foi uma experiência enriquecedora e demonstrou o potencial de crescimento e aprendizado que a posição oferece. Estou ansioso para, possivelmente, fazer parte da equipe e contribuir de forma significativa para o sucesso da empresa.

Agradeço 💜 pelo tempo e consideração dispensados durante este processo.

---

Atenciosamente,

Luis Otavio Longo