import chess_service from "/public/services/chess.js";

let game = new chess_service.Game();

chess_service.render(game, document.getElementById("canvas"));

chess_service.on_canvas_click(document.getElementById("canvas"));
