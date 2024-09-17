import twitch from "./twitch.js";

//USO
//https://seyacat.github.io/TwitchGiphy/?channel=YOUR_CHANNEL_NAME&api-key=YOUR_API_KEY&custom-reward-id=YOUR_CUSTOM_REWARD_ID

//api-key se consigue en el portal de giphy
//custom-reward-id es el id de reward que se crea en el panel de control de twitch

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const apiKey = urlParams.get("api-key") ?? localStorage.apikey;
const customRewardId =
  urlParams.get("custom-reward-id") ?? "37f43acd-8b34-42cf-8392-39f2ebda97ad";

const constainer = document.getElementById("container");

const image = document.getElementById("image");

const msg = document.getElementById("msg");
const msgQueue = [];
let nextText = "Test";
let timeout = 0;

const gifQueu = function (msgData) {
  if (
    msgData.cmd != "PRIVMSG" ||
    msgData?.["custom-reward-id"] != customRewardId
  ) {
    return;
  }
  msgQueue.push(msgData);
};

const getRandomGif = async function (msgData) {
  console.log({ msgData });
  if (
    msgData.cmd != "PRIVMSG" ||
    msgData?.["custom-reward-id"] != customRewardId
  ) {
    return;
  }
  const ret = await (
    await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&rating=pg-13&q=${msgData.msg}`,
      { method: "GET" }
    )
  ).json();
  const gif = ret.data[Math.floor(Math.random() * ret.data.length)];
  image.src = gif.images.original.url;
  nextText = `${msgData?.["display-name"]}: ${msgData.msg}`;
};

twitch(gifQueu);

image.addEventListener("load", () => {
  timeout = 8;
  constainer.classList.remove("on");
  constainer.style.opacity = 1;
  msg.innerText = nextText;
});

const tic = function () {
  if (timeout <= 0) {
    if (msgQueue.length) {
      getRandomGif(msgQueue.shift());
      timeout = 5;
    } else {
      constainer.classList.add("on");
    }
  }
  timeout--;
};

setInterval(tic, 1000);
