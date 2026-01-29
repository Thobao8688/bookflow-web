export function initAI() {
  document.getElementById("aiSummary").onclick = summarize;
}

async function summarize() {
  const text = window.currentText?.slice(0, 3000);
  if (!text) return;

  alert("Gắn API free (Together / Groq / OpenRouter) vào đây để dùng AI");
}
