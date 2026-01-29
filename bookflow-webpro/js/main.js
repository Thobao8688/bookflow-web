import { initPDF } from "./pdf.js";
import { initTTS } from "./tts.js";
import { initFocus } from "./focus.js";
import { initAI } from "./ai.js";

window.onload = () => {
  initPDF();
  initTTS();
  initFocus();
  initAI();
};
