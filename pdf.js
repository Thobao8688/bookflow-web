let pdfDoc = null;
let pageNum = 1;
let scale = 1.3;

export function initPDF() {
  document.getElementById("pdfInput").addEventListener("change", loadPDF);
  document.getElementById("next").onclick = () => renderPage(pageNum + 1);
  document.getElementById("prev").onclick = () => renderPage(pageNum - 1);
}

async function loadPDF(e) {
  const file = e.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  pdfDoc = await pdfjsLib.getDocument(url).promise;
  renderPage(1);
}

async function renderPage(num) {
  if (!pdfDoc || num < 1 || num > pdfDoc.numPages) return;
  pageNum = num;

  const page = await pdfDoc.getPage(num);
  const viewport = page.getViewport({ scale });

  const canvas = document.getElementById("pdfCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: ctx, viewport }).promise;

  const textLayerDiv = document.getElementById("textLayer");
  textLayerDiv.innerHTML = "";
  textLayerDiv.style.width = canvas.width + "px";
  textLayerDiv.style.height = canvas.height + "px";

  const textContent = await page.getTextContent();

  pdfjsLib.renderTextLayer({
    textContent,
    container: textLayerDiv,
    viewport,
    textDivs: []
  });

  window.currentText = textContent.items.map(i => i.str).join(" ");

  document.getElementById("pageInfo").innerText =
    `Trang ${pageNum}/${pdfDoc.numPages}`;
}
