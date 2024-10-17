import React from "react";

const Piece = ({ type }) => {
  const unicodePieces = {
    P: "♙", // White Pawn
    R: "♖", // White Rook
    N: "♘", // White Knight
    B: "♗", // White Bishop
    Q: "♕", // White Queen
    K: "♔", // White King
    p: "♟", // Black Pawn
    r: "♜", // Black Rook
    n: "♞", // Black Knight
    b: "♝", // Black Bishop
    q: "♛", // Black Queen
    k: "♚", // Black King
  };

  return <span className="piece">{unicodePieces[type]}</span>;
};

export default Piece;
