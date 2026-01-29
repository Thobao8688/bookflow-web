let timer;
let sec = 1500;

export function initFocus() {
  document.getElementById("startFocus").onclick = start;
  document.getElementById("stopFocus").onclick = stop;
}

function start() {
  stop();
  timer = setInterval(() => {
    sec--;
    update();
    if (sec <= 0) {
      stop();
      speechSynthesis.speak(
        new SpeechSynthesisUtterance("Hết phiên đọc, nghỉ 5 phút")
      );
    }
  }, 1000);
}

function stop() {
  clearInterval(timer);
}

function update() {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  document.getElementById("focusTime").innerText =
    `${m}:${s.toString().padStart(2, "0")}`;
}
