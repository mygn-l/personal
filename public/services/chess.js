const chess_service = {};

chess_service.Piece = class {
  constructor(color, name) {
    this.color = color;
    this.name = name;
    this.moved = false;
  }
  in_range(board, tile_initial, tile_final) {
    let destination = board[tile_final.x][tile_final.y];

    let dir_x = 0;
    let dir_y = 0;
    if (tile_final.x - tile_initial.x > 0) {
      dir_x = 1;
    } else if (tile_final.x - tile_initial.x < 0) {
      dir_x = -1;
    }
    if (tile_final.y - tile_initial.y > 0) {
      dir_y = 1;
    } else if (tile_final.y - tile_initial.y < 0) {
      dir_y = -1;
    }

    if (piece.name === "Pawn" && piece.color === "White") {
      if (tile_final.x === tile_initial.x) {
        if (
          tile_final.y === tile_initial.y + 2 &&
          piece.moved === false &&
          board[tile_initial.x][tile_initial.y + 1] == undefined
        ) {
          return true;
        } else if (tile_final.y === tile_initial.y + 1) {
          return true;
        }
      } else if (
        Math.abs(tile_final.x - tile_initial.x) === 1 &&
        tile_final.y === tile_initial.y + 1 &&
        destination != undefined
      ) {
        if (destination.color == "Black") {
          return true;
        }
      }
    }

    if (piece.name === "Pawn" && piece.color === "Black") {
      if (tile_final.x === tile_initial.x) {
        if (
          tile_final.y === tile_initial.y - 2 &&
          piece.moved === false &&
          board[tile_initial.x][tile_initial.y + 1] == undefined
        ) {
          return true;
        } else if (tile_final.y === tile_initial.y - 1) {
          return true;
        }
      } else if (
        Math.abs(tile_final.x - tile_initial.x) === 1 &&
        tile_final.y === tile_initial.y - 1 &&
        destination != undefined
      ) {
        if (destination.color == "White") {
          return true;
        }
      }
    }

    if (piece.name === "Rook") {
      if (dir_x === 0) {
        for (let i = 1; i < Math.abs(tile_final.y - tile_initial.y); i++) {
          if (board[tile_initial.x][tile_initial.y + dir_y * i] != undefined) {
            return false;
          }
        }

        return true;
      } else if (dir_y === 0) {
        for (let i = 1; i < Math.abs(tile_final.x - tile_initial.x); i++) {
          if (board[tile_initial.x + dir_x * i][tile_initial.y] != undefined) {
            return false;
          }
        }

        return true;
      }
    }

    if (piece.name === "Knight") {
      if (
        (tile_final.x === tile_initial.x - 1 && tile_final.y === tile_initial + 2) ||
        (tile_final.x === tile_initial.x + 1 && tile_final.y === tile_initial + 2) ||
        (tile_final.x === tile_initial.x - 2 && tile_final.y === tile_initial + 1) ||
        (tile_final.x === tile_initial.x + 2 && tile_final.y === tile_initial + 1) ||
        (tile_final.x === tile_initial.x - 2 && tile_final.y === tile_initial - 1) ||
        (tile_final.x === tile_initial.x + 2 && tile_final.y === tile_initial - 1) ||
        (tile_final.x === tile_initial.x - 1 && tile_final.y === tile_initial - 2) ||
        (tile_final.x === tile_initial.x + 1 && tile_final.y === tile_initial - 2)
      ) {
        return true;
      }
    }

    if (piece.name === "Bishop") {
      if (Math.abs(tile_final.x - tile_initial.x) === Math.abs(tile_final.y - tile_initial.y)) {
        for (let i = 1; i < Math.abs(tile_final.x - tile_initial.x); i++) {
          if (board[tile_initial.x + dir_x * i][tile_initial.y + dir_y * i] != undefined) {
            return false;
          }
        }

        return true;
      }
    }

    if (piece.name === "Queen") {
      if (Math.abs(tile_final.x - tile_initial.x) == Math.abs(tile_final.y - tile_initial.y)) {
        for (let i = 1; i < Math.abs(tile_final.x - tile_initial.x); i++) {
          if (board[tile_initial.x + dir_x * i][tile_initial.y + dir_y * i] != undefined) {
            return false;
          }
        }

        return true;
      } else if (dir_x === 0) {
        for (let i = 1; i < Math.abs(tile_final.y - tile_initial.y); i++) {
          if (board[tile_initial.x][tile_initial.y + dir_y * i] != undefined) {
            return false;
          }
        }

        return true;
      } else if (dir_y === 0) {
        for (let i = 1; i < Math.abs(tile_final.x - tile_initial.x); i++) {
          if (board[tile_initial.x + dir_x * i][tile_initial.y] != undefined) {
            return false;
          }
        }

        return true;
      }
    }

    if (piece.name === "King") {
      if (board.tile_attacked([tile_final.x][tile_final.y]) === true) {
        return false;
      }
      if (
        Math.abs(tile_final.x - tile_initial.x) <= 1 &&
        Math.abs(tile_final.y - tile_initial.y) <= 1
      ) {
        return true;
      } else if (dir_y === 0) {
        if (tile_final.x === tile_initial.x + 2) {
          let rook = board[tile_initial.x + 3][tile_initial.y];
          if (rook != undefined) {
            if (rook.name === "Rook" && rook.moved === false) {
              if (
                board.tile_attacked([tile_initial.x][tile_initial.y]) === false &&
                board.tile_attacked([tile_initial.x + 1][tile_initial.y]) === false
              ) {
                return true;
              }
            }
          }
        } else if (tile_final.x === tile_initial.x - 2) {
          let rook = board[tile_initial.x - 4][tile_initial.y];
          if (rook != undefined) {
            if (rook.name === "Rook" && rook.moved === false) {
              if (
                board.tile_attacked([tile_initial.x][tile_initial.y]) === false &&
                board.tile_attacked([tile_initial.x - 1][tile_initial.y]) === false
              ) {
                return true;
              }
            }
          }
        }
      }
    }

    return false;
  }
};

chess_service.Default_board = class {
  constructor() {
    this.matrix = [
      [
        new chess_service.Piece("White", "Rook"),
        new chess_service.Piece("White", "Pawn"),
        undefined,
        undefined,
        undefined,
        undefined,
        new chess_service.Piece("Black", "Pawn"),
        new chess_service.Piece("Black", "Rook"),
      ],
      [
        new chess_service.Piece("White", "Knight"),
        new chess_service.Piece("White", "Pawn"),
        undefined,
        undefined,
        undefined,
        undefined,
        new chess_service.Piece("Black", "Pawn"),
        new chess_service.Piece("Black", "Knight"),
      ],
      [
        new chess_service.Piece("White", "Bishop"),
        new chess_service.Piece("White", "Pawn"),
        undefined,
        undefined,
        undefined,
        undefined,
        new chess_service.Piece("Black", "Pawn"),
        new chess_service.Piece("Black", "Bishop"),
      ],
      [
        new chess_service.Piece("White", "Queen"),
        new chess_service.Piece("White", "Pawn"),
        undefined,
        undefined,
        undefined,
        undefined,
        new chess_service.Piece("Black", "Pawn"),
        new chess_service.Piece("Black", "Queen"),
      ],
      [
        new chess_service.Piece("White", "King"),
        new chess_service.Piece("White", "Pawn"),
        undefined,
        undefined,
        undefined,
        undefined,
        new chess_service.Piece("Black", "Pawn"),
        new chess_service.Piece("Black", "King"),
      ],
      [
        new chess_service.Piece("White", "Bishop"),
        new chess_service.Piece("White", "Pawn"),
        undefined,
        undefined,
        undefined,
        undefined,
        new chess_service.Piece("Black", "Pawn"),
        new chess_service.Piece("Black", "Bishop"),
      ],
      [
        new chess_service.Piece("White", "Knight"),
        new chess_service.Piece("White", "Pawn"),
        undefined,
        undefined,
        undefined,
        undefined,
        new chess_service.Piece("Black", "Pawn"),
        new chess_service.Piece("Black", "Knight"),
      ],
      [
        new chess_service.Piece("White", "Rook"),
        new chess_service.Piece("White", "Pawn"),
        undefined,
        undefined,
        undefined,
        undefined,
        new chess_service.Piece("Black", "Pawn"),
        new chess_service.Piece("Black", "Rook"),
      ],
    ];
  }
  tile_attacked(tile) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] != undefined) {
          if (this.matrix[i][j].in_range(this.matrix, { x: i, y: j }, tile) === true) {
            return true;
          }
        }
      }
    }
    return false;
  }
};

chess_service.Game = class {
  constructor() {
    this.board = new chess_service.Default_board();
    this.move_count = 0;
  }
  move(tile_initial, tile_final) {
    if (tile_initial < 0 || tile_initial > 7 || tile_final < 0 || tile_final > 7) {
      throw "Selected tile out of bound.";
    }
    if (tile_initial.x === tile_final.x && tile_initial.y === tile_final.y) {
      throw "Select two different tiles.";
    }

    let piece = this.board.matrix[tile_initial.x][tile_initial.y];
    let destination = this.board.matrix[tile_final.x][tile_final.y];

    if (piece == undefined) {
      throw "No piece selected.";
    }

    if (this.move_count % 2 == 0 && piece.color != "White") {
      throw "Black cannot move. Select a white piece.";
    }
    if (this.move_count % 2 == 1 && piece.color != "Black") {
      throw "White cannot move. Select a black piece.";
    }

    if (destination != undefined) {
      if (destination.color === piece.color) {
        throw "Piece of same color already occupying the destination tile.";
      }
    }

    if (piece.in_range(this.board.matrix, tile_initial, tile_final) === true) {
      this.board.matrix[tile_final.x][tile_final.y] = piece;
      this.board.matrix[tile_initial.x][tile_initial.y] = undefined;
      this.move_count++;
    }
  }
};

chess_service.render = function (game, canvas) {
  canvas.width = 500;
  canvas.height = 500;

  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let tile_size = 500 / 8;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + (j % 2)) % 2 === 0) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "beige";
      }
      console.log((i + (j % 2)) % 2);
      ctx.beginPath();
      ctx.rect(i * tile_size, canvas.height - j * tile_size - tile_size, tile_size, tile_size);
      ctx.fill();

      if (game.board.matrix[i][j] != undefined) {
        let piece = game.board.matrix[i][j];
        if (piece.color === "White") {
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "black";
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.font = "25px serif";

        ctx.fillText(piece.name, i * tile_size, canvas.height - j * tile_size - tile_size / 2);
        ctx.strokeText(piece.name, i * tile_size, canvas.height - j * tile_size - tile_size / 2);
      }
    }
  }
};

chess_service.on_canvas_click = function (canvas) {
  canvas.addEventListener("mousedown", function (e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
  });
};

export default chess_service;
