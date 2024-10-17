import React, { useState } from "react";
import Piece from "./Piece";
import { getValidMoves } from "./helpers/moveLogic"; // Import the move logic

const initialBoardSetup = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const Board = () => {
  const [board, setBoard] = useState(initialBoardSetup.map((row) => [...row])); // Use copy
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  // Reset the board and state
  const resetGame = () => {
    setBoard(initialBoardSetup.map((row) => [...row])); // Create a new copy of the initial board
    setSelectedPiece(null);
    setValidMoves([]);
  };

  // Handle click on a cell
  const handleCellClick = (row, col) => {
    if (selectedPiece) {
      // Move the piece if it's a valid move
      if (validMoves.some((move) => move.row === row && move.col === col)) {
        const newBoard = [...board];
        newBoard[row][col] = board[selectedPiece.row][selectedPiece.col];
        newBoard[selectedPiece.row][selectedPiece.col] = "";
        setBoard(newBoard);
        setSelectedPiece(null);
        setValidMoves([]);
      } else {
        setSelectedPiece(null);
        setValidMoves([]);
      }
    } else {
      const piece = board[row][col];
      if (piece) {
        setSelectedPiece({ row, col });
        setValidMoves(getValidMoves(piece, board, row, col));
      }
    }
  };

  const renderPiece = (piece) => {
    if (!piece) return null;
    return <Piece type={piece} />;
  };

  const isValidMove = (row, col) => {
    return validMoves.some((move) => move.row === row && move.col === col);
  };

  return (
    <>
      <div className="chess-board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${
                (rowIndex + colIndex) % 2 === 0 ? "white" : "black"
              }
              ${
                selectedPiece &&
                selectedPiece.row === rowIndex &&
                selectedPiece.col === colIndex
                  ? "selected"
                  : ""
              }
              ${isValidMove(rowIndex, colIndex) ? "valid-move" : ""}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {renderPiece(cell)}
            </div>
          ))
        )}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </>
  );
};

export default Board;
