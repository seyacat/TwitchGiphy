const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const channel = urlParams.get("channel") ?? "seyacat";

const subscribers = [];
export default (f) => {
  subscribers.push(f);
};

// Crear una instancia de WebSocket
const ws = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

// Evento que se ejecuta cuando la conexión se abre
ws.addEventListener("open", (event) => {
  console.log("Conexión establecida");
  ws.send("CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands");
  ws.send("NICK justinfan12345");
  ws.send("PASS kappa");
  ws.send("JOIN #" + channel);
  // Enviar un mensaje al servidor
});

// Evento que se ejecuta cuando se recibe un mensaje del servidor
ws.addEventListener("message", (event) => {
  let msg = event.data;
  console.log({ rawmsg: msg });

  if (msg.indexOf("PING") == 0) {
    ws.send("PONG");
  }

  let data = {};
  for (let pair of msg.split("!", 2)[0].split(";")) {
    let p = pair.split("=");
    if (p.length == 2) {
      data[p[0]] = p[1];
    }
  }
  let remsg =
    /(?:(([a-zA-Z0-9_]*?)!([a-zA-Z0-9_]*?)@[a-zA-Z0-9_]*?.tmi.twitch.tv)|tmi.twitch.tv)\s([A-Z]*?)?\s#([^\s]*)\s{0,}:?(.*?)?$/gim.exec(
      msg
    ); // ['cd', undefined, 'cd']

  if (remsg?.length >= 7) {
    data["username"] = remsg[2];
    data["cmd"] = remsg[4];
    data["channel"] = remsg[5];
    data["msg"] = remsg[6];
  }

  for (const f of subscribers) {
    if (typeof f == "function") {
      f(data);
    }
  }
});

// Evento que se ejecuta cuando la conexión se cierra
ws.addEventListener("close", (event) => {
  console.log("Conexión cerrada");
});

// Evento que se ejecuta en caso de error
ws.addEventListener("error", (event) => {
  console.error("Error en la conexión:", event);
});
