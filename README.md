# Live Cursors App

Este projeto é um aplicativo de cursores em tempo real, inspirado no vídeo “[Build a Real-Time Live Cursors App with Ably](https://www.youtube.com/watch?v=4Uwq0xB30JE&ab_channel=AblyRealtime)”. Ele permite que múltiplos usuários vejam os movimentos dos cursores uns dos outros em tempo real, utilizando a plataforma Ably Realtime.

## Funcionalidades

- Compartilhamento de posição do cursor em tempo real entre usuários
- Interface web interativa
- Backend Node.js para gerenciamento de conexões
- Utilização do serviço Ably para comunicação em tempo real

## Tecnologias Utilizadas

- Node.js
- Ably Realtime
- JavaScript/HTML/CSS (frontend)
- WebSockets

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/jonatasu/live-cursors-app.git
   cd live-cursors-app
   ```
2. Instale as dependências do servidor:
   ```bash
   cd server
   npm install
   ```
3. Configure sua chave da API do Ably em um arquivo `.env`:
   ```
   ABLY_API_KEY=your-ably-api-key
   ```
4. Inicie o servidor:
   ```bash
   node index.js
   ```

## Como usar

- Acesse a interface web do app (instruções de frontend podem ser adicionadas conforme o desenvolvimento).
- Movimente o cursor e veja os cursores dos outros usuários em tempo real.

## Referências

- [Vídeo tutorial no YouTube](https://www.youtube.com/watch?v=4Uwq0xB30JE&ab_channel=AblyRealtime)
- [Documentação Ably Realtime](https://ably.com/docs)
