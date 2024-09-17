import twitch from "./twitch.js";

//USO
//https://seyacat.github.io/TwitchGiphy/?api-key=YOUR_API_KEY&custom-reward-id=YOUR_CUSTOM_REWARD_ID

//api-key se consigue en el portal de giphy
//custom-reward-id es el id de reward que se crea en el panel de control de twitch

//https://api.betterttv.net/3/cached/emotes/global

const msgQueue = [];
let nextText = "Test";
let timeout = 0;
let locked = false;

const ttsQueu = function (msgData) {
  if (
    msgData.cmd != "PRIVMSG"
    //msgData?.["custom-reward-id"] != customRewardId
  ) {
    return;
  }
  msgQueue.push(msgData);
};

const readTTS = async function (msgData) {
  console.log({ msgData });

  if (
    msgData.cmd != "PRIVMSG"
    //msgData?.["custom-reward-id"] != customRewardId
  ) {
    return;
  }
  locked = true;
  nextText = `${msgData?.["display-name"]}: ${msgData.msg}`;
  const utterance = new SpeechSynthesisUtterance(nextText);
  speechSynthesis.speak(utterance);
  utterance.onend = function () {
    locked = false;
  };
};

twitch(ttsQueu);

const tic = function () {
  if (timeout <= 0) {
    if (msgQueue.length && !locked) {
      readTTS(msgQueue.shift());
      timeout = 1;
    } else {
      //constainer.classList.add("on");
    }
  }
  timeout--;
};

setInterval(tic, 1000);
