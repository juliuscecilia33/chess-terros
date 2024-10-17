// Check if a position is within the bounds of the board
const isWithinBoard = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

// Gget moves in straight lines (for rooks and queens)
const getLinearMoves = (board, row, col, directions) => {
  const moves = [];
  directions.forEach(([rowDir, colDir]) => {
    let r = row + rowDir;
    let c = col + colDir;
    while (isWithinBoard(r, c)) {
      if (board[r][c] === "") {
        moves.push({ row: r, col: c });
      } else {
        break; // Stop when we hit another piece
      }
      r += rowDir;
      c += colDir;
    }
  });
  return moves;
};

// Pawn moves
const getPawnMoves = (board, row, col, isWhite) => {
  const moves = [];
  const direction = isWhite ? -1 : 1;

  // Regular move
  if (
    isWithinBoard(row + direction, col) &&
    board[row + direction][col] === ""
  ) {
    moves.push({ row: row + direction, col });
  }

  // Initial two-square move
  if ((isWhite && row === 6) || (!isWhite && row === 1)) {
    if (
      board[row + direction][col] === "" &&
      board[row + 2 * direction][col] === ""
    ) {
      moves.push({ row: row + 2 * direction, col });
    }
  }

  // Capturing moves (diagonal)
  [
    [direction, 1],
    [direction, -1],
  ].forEach(([rowDir, colDir]) => {
    if (
      isWithinBoard(row + rowDir, col + colDir) &&
      board[row + rowDir][col + colDir] !== ""
    ) {
      moves.push({ row: row + rowDir, col: col + colDir });
    }
  });

  return moves;
};

// Rook moves
const getRookMoves = (board, row, col) => {
  return getLinearMoves(board, row, col, [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // Up, Down, Left, Right
  ]);
};

// Knight moves
const getKnightMoves = (board, row, col) => {
  const moves = [];
  const knightOffsets = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1], // Vertical L shapes
    [-1, -2],
    [1, -2],
    [-1, 2],
    [1, 2], // Horizontal L shapes
  ];

  knightOffsets.forEach(([rowOffset, colOffset]) => {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;
    if (isWithinBoard(newRow, newCol)) {
      moves.push({ row: newRow, col: newCol });
    }
  });

  return moves;
};

// Bishop moves
const getBishopMoves = (board, row, col) => {
  return getLinearMoves(board, row, col, [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // Diagonals
  ]);
};

// Queen moves (combines rook and bishop moves)
const getQueenMoves = (board, row, col) => {
  return [...getRookMoves(board, row, col), ...getBishopMoves(board, row, col)];
};

// King moves (only one square in any direction)
const getKingMoves = (board, row, col) => {
  const moves = [];
  const kingOffsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // Horizontal and Vertical
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // Diagonal
  ];

  kingOffsets.forEach(([rowOffset, colOffset]) => {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;
    if (isWithinBoard(newRow, newCol)) {
      moves.push({ row: newRow, col: newCol });
    }
  });

  return moves;
};

// Main function to get valid moves based on the piece type
export const getValidMoves = (piece, board, row, col) => {
  const isWhite = piece === piece.toUpperCase();

  switch (piece.toUpperCase()) {
    case "P":
      return getPawnMoves(board, row, col, isWhite);
    case "R":
      return getRookMoves(board, row, col);
    case "N":
      return getKnightMoves(board, row, col);
    case "B":
      return getBishopMoves(board, row, col);
    case "Q":
      return getQueenMoves(board, row, col);
    case "K":
      return getKingMoves(board, row, col);
    default:
      return [];
  }
};
