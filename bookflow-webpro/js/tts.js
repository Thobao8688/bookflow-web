let voiceSelect;

export function initTTS() {
  voiceSelect = document.getElementById("voice");
  loadVoices();

  document.getElementById("read").onclick = () => {
    speak(window.currentText?.slice(0, 2000));
  };
}

function loadVoices() {
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = v.name;
    voiceSelect.appendChild(opt);
  });
}

speechSynthesis.onvoiceschanged = loadVoices;

function speak(text) {
  if (!text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.voice = speechSynthesis.getVoices()
    .find(v => v.name === voiceSelect.value);
  speechSynthesis.speak(u);
}
