const chess = new Chess();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("importBtn").addEventListener("click", importGame);
});

function importGame() {
  const pgn = document.getElementById("pgnInput").value.trim();
  const movesDiv = document.getElementById("moves");

  chess.reset();
  movesDiv.innerHTML = "";

  if (!pgn) {
    movesDiv.textContent = "Paste PGN";
    return;
  }

  chess.load_pgn(pgn, { sloppy: true });

  const history = chess.history();
  if (!history.length) {
    movesDiv.textContent = "No moves parsed";
    return;
  }

  let html = "<table>";
  for (let i = 0; i < history.length; i += 2) {
    html += `<tr>
      <td class="num">${i / 2 + 1}.</td>
      <td class="white">${history[i] || ""}</td>
      <td class="black">${history[i + 1] || ""}</td>
    </tr>`;
  }
  html += "</table>";

  movesDiv.innerHTML = html;
}
