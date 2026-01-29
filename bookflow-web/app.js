const reader = document.getElementById("reader");
const voiceSelect = document.getElementById("voice");

// Load PDF
document.getElementById("pdfInput").addEventListener("change", async e => {
  reader.innerHTML = "";
  const file = e.target.files[0];
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 });

  const canvas = document.createElement("canvas");
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  reader.appendChild(canvas);

  page.render({
    canvasContext: canvas.getContext("2d"),
    viewport
  });
});

// Load voices
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

// Read text
function readText() {
  const text = document.getElementById("note").value;
  if (!text) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = document.getElementById("speed").value;
  utter.voice = speechSynthesis.getVoices()
    .find(v => v.name === voiceSelect.value);

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// Export Markdown
function exportMD() {
  const text = document.getElementById("note").value;
  const md = `# Ghi chú ??c sách\n\n${text}`;
  const blob = new Blob([md], { type: "text/markdown" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ghichu.md";
  a.click();
}
