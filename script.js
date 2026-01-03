let chess;

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Chess.js
    chess = new Chess();

    const importBtn = document.getElementById("importBtn");
    if (importBtn) {
        importBtn.addEventListener("click", importGame);
    }
});

function importGame() {
    const pgnInput = document.getElementById("pgnInput");
    const movesDiv = document.getElementById("moves");

    // Reset the engine
    chess = new Chess();
    movesDiv.innerHTML = "";

    const text = pgnInput.value.trim();
    
    if (!text) {
        movesDiv.textContent = "Please paste a PGN first.";
        return;
    }

    // Load PGN - returns true if successful
    const loaded = chess.load_pgn(text, { sloppy: true });

    if (!loaded) {
        movesDiv.innerHTML = "<span style='color: red;'>Invalid PGN format.</span>";
        return;
    }

    const history = chess.history();
    
    if (history.length === 0) {
        movesDiv.textContent = "No moves found in this PGN.";
        return;
    }

    // Build the moves table
    let html = "<table class='moves-table'>";
    for (let i = 0; i < history.length; i += 2) {
        const moveNumber = Math.floor(i / 2) + 1;
        const whiteMove = history[i];
        const blackMove = history[i + 1] ? history[i + 1] : ""; // Handle case where game ends on white's move

        html += `
            <tr>
                <td class="num">${moveNumber}.</td>
                <td class="white">${whiteMove}</td>
                <td class="black">${blackMove}</td>
            </tr>`;
    }
    html += "</table>";

    movesDiv.innerHTML = html;
}
