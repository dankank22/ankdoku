"use client"
import Link from "next/link";

import React, { useState, useEffect } from "react";

// Declare variables outside of the component scope
let userError = new Set();
let setOfFixedWrong = new Set();
let setOfUserWrong = new Set();

// Function to shuffle an array
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to generate a complete, valid Sudoku board
const generateCompleteBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  const isValid = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (
        board[row][x] === num ||
        board[x][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
          3 * Math.floor(col / 3) + (x % 3)
        ] === num
      ) {
        return false;
      }
    }
    return true;
  };

  const fillBoard = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (let num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillBoard(board);
  return board;
};

// Function to create a Sudoku puzzle by removing elements from a complete board
const createPuzzle = (board, numOfClues) => {
  const puzzle = board.map((row) => row.slice());

  // Flatten the board to a list of coordinates
  let coordinates = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      coordinates.push([row, col]);
    }
  }

  // Shuffle the coordinates and remove the required number of clues
  coordinates = shuffle(coordinates);
  let count = 81 - numOfClues;
  while (count > 0) {
    const [row, col] = coordinates.pop();
    puzzle[row][col] = 0;
    count--;
  }

  return puzzle;
};

// Function to solve a Sudoku puzzle and count the number of solutions
const solveSudoku = (board) => {
  let solutions = 0;

  const isValid = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (
        board[row][x] === num ||
        board[x][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
          3 * Math.floor(col / 3) + (x % 3)
        ] === num
      ) {
        return false;
      }
    }
    return true;
  };

  const solve = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              solve(board);
              board[row][col] = 0;
            }
          }
          return;
        }
      }
    }
    solutions++;
  };

  solve(board);
  return solutions;
};

// Function to create a puzzle with a unique solution
const createUniquePuzzle = (numOfClues) => {
  let puzzle;
  let completeBoard = generateCompleteBoard();

  do {
    puzzle = createPuzzle(completeBoard, numOfClues);
  } while (solveSudoku(puzzle) !== 1);

  return puzzle;
};

const Home = () => {
  const [sudokuBoard, setSudokuBoard] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [originalPuzzle, setOriginalPuzzle] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [errorCells, setErrorCells] = useState([]);
  const [errorsCount, setErrorsCount] = useState(0);
  const [checkClicked, setCheckClicked] = useState(false); // State to track if Check button is clicked
  const [userError, setUserError] = useState(new Set());
  const [setOfFixedWrong, setSetOfFixedWrong] = useState(new Set());
  const [setOfUserWrong, setSetOfUserWrong] = useState(new Set());
  const [hintCount, setHintCount] = useState(0);
  const [hintedCells, setHintedCells] = useState([]);
  const [completeBoard, setCompleteBoard] = useState([]);
  const [checkCount, setCheckCount] = useState(0);
  const [time, setTime] = useState(900); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true); // State to track timer running status
  const [submitTime, setSubmitTime] = useState(null); // State to store the time at which the submit button was pressed


  // Function to generate a new Sudoku board
  const generateNewBoard = () => {
    const newCompleteBoard = generateCompleteBoard();
    const puzzle = createPuzzle(newCompleteBoard, 28); // Adjust the number of clues
    setCompleteBoard(newCompleteBoard);
    setSudokuBoard(puzzle);
    setOriginalPuzzle(puzzle);
    setUserInput({});
    setErrorCells([]);
    setErrorsCount(0);
    setCheckClicked(false);
    setUserError(new Set());
    setSetOfFixedWrong(new Set());
    setSetOfUserWrong(new Set());
    setHintCount(0);
    setHintedCells([]);
    setCheckCount(0);
    setTime(900);
    setIsTimerRunning(true);
    setSubmitTime(null);
  };

  const Timer = () => {
   
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    // handleSubmit()
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    return (
      <div>
          <h1>{formatTime(time)}</h1>
      </div>
  );
};
  

  const handleInputChange = (e, row, col) => {
    const value = e.target.value;
    setUserInput((prevInput) => ({
      ...prevInput,
      [`${row}-${col}`]: value,
    }));
  };

  useEffect(() => {
    // Generate initial board on component mount
    generateNewBoard();

    // Set interval to check time and reset board after 12 AM
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        generateNewBoard();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Function to handle hint logic
  const handleHint = () => {
    if (hintCount >= 5) {
      alert("You have used all your hints!");
      return;
    } else {
      alert(`You have used ${hintCount+1} hint(s)!`);
    }
  
    let emptyCells = [];
    originalPuzzle.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0 && !userInput[`${rowIndex}-${colIndex}`]) {
          emptyCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });
  
    if (emptyCells.length === 0) {
      alert("No more empty cells to hint!");
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
  
    const correctNumber = completeBoard[row][col]; // Use the defined completeBoard
  
    setUserInput((prevInput) => ({
      ...prevInput,
      [`${row}-${col}`]: correctNumber,
    }));
  
    const newHintedCells = [...hintedCells, `${row}-${col}`];
    setHintedCells(newHintedCells);
    setHintCount(hintCount + 1);
  };
  

  // Function to generate the Sudoku board UI
  const generateBoard = () => {
    const board = [];
    for (let i = 0; i < 81; i++) {
      const rowIndex = Math.floor(i / 9);
      const colIndex = i % 9;
      const value =
        sudokuBoard[rowIndex] && sudokuBoard[rowIndex][colIndex] !== 0
          ? sudokuBoard[rowIndex][colIndex]
          : userInput[`${rowIndex}-${colIndex}`] || "";
      const isEditable = sudokuBoard[rowIndex][colIndex] === 0 && !hintedCells.includes(`${rowIndex}-${colIndex}`);
      const isError =
        errorCells.some(
          (cell) => cell.row === rowIndex && cell.col === colIndex
        ) && checkClicked;
  
      const textColor = isEditable ? "white" : "white";
      const backgroundColor = hintedCells.includes(`${rowIndex}-${colIndex}`) ? "grey" : "darkGray";
  
      board.push(
        <div
          key={i}
          className="tile"
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid lightgray",
            borderRight: colIndex === 2 || colIndex === 5 || colIndex === 8 ? "4px solid white" : "1px solid lightgray",
            borderLeft: colIndex === 0 ? "4px solid white" : "1px solid lightgray",
            borderBottom: rowIndex === 2 || rowIndex === 5 || rowIndex === 8 ? "2px solid white" : "1px solid lightgray",
            borderTop: rowIndex === 0 || rowIndex === 3 || rowIndex === 6 ? "2px solid white" : "1px solid lightgray",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isError ? "coral" : backgroundColor,
            color: textColor,
          }}
        >
          {isEditable ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                backgroundColor: "black",
                color: textColor,
                border: "none",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              maxLength={1}
            />
          ) : (
            <div>{value}</div>
          )}
        </div>
      );
    }
    return board;
  };
  
  // Function to check if the current user inputs follow Sudoku rules
  const isValidMove = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (
        (board[row][x] === num && x !== col) ||
        (board[x][col] === num && x !== row) ||
        (board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
          3 * Math.floor(col / 3) + (x % 3)
        ] === num &&
          (3 * Math.floor(row / 3) + Math.floor(x / 3) !== row ||
            3 * Math.floor(col / 3) + (x % 3) !== col))
      ) {
        userError.add(`${row}-${col}`);
        if (sudokuBoard[row][col] !== 0) {
          setOfFixedWrong.add(`${row}-${col}`);
        } else {
          setOfUserWrong.add(`${row}-${col}`);
        }
        return false;
      }
    }
    return true;
  };

  // Function to check the entire board for errors
  const checkSudoku = () => {

    let hasUserMadeEntries = false;

  // Check each cell to see if there's any user input
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (userInput[`${row}-${col}`]) {
        hasUserMadeEntries = true;
        break;
      }
    }
    if (hasUserMadeEntries) {
      break;
    }
  }

    if(hasUserMadeEntries){
      if (checkCount >= 10) {
        alert("You have used all your checks!");
        return;
      } else {
        setCheckCount(checkCount+1);
      }
    }
    else{
      
      alert("Board is empty!");
    }
    

    let errors = [];
    let errorCount = 0;

    const board = sudokuBoard.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const userValue = userInput[`${rowIndex}-${colIndex}`];
        return userValue ? parseInt(userValue, 10) : cell;
      })
    );

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = board[row][col];
        if (value !== 0 && !isValidMove(board, row, col, value)) {
          errors.push({ row, col });
          errorCount++;
        }
      }
    }

    setErrorCells(errors);
    setErrorsCount(errorCount);
    setCheckClicked(true); // Set checkClicked state to true after checking
    
  };

  // Function to reset the board to the original puzzle
  const resetBoard = () => {
  const resetInput = {};

  hintedCells.forEach((cell) => {
    resetInput[cell] = userInput[cell]; // Keep values of hinted cells
  });

  setSudokuBoard(originalPuzzle);
  setUserInput(resetInput);
  setErrorCells([]);
  setErrorsCount(0);
  setCheckCount(0);
  setCheckClicked(false);
  setUserError(new Set());
  setSetOfFixedWrong(new Set());
  setSetOfUserWrong(new Set());
};


  // Function to display the list of user errors
  const displayUserErrors = () => {
    return (
      <div>
        <h3>User Errors:</h3>
        <ul>
          {[...setOfFixedWrong].map((position, index) => {
            const [row, col] = position.split("-").map(Number);
            return <li key={`fixed-${index}`}>{`(${row}, ${col}) - Fixed Cell`}</li>;
          })}
          {[...setOfUserWrong].map((position, index) => {
            const [row, col] = position.split("-").map(Number);
            return <li key={`user-${index}`}>{`(${row}, ${col}) - User Input`}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="welcomeUserName" style={{ position: "absolute", top: "10px", left: "20px", display: "flex", alignItems: "center" }}>
        <Link href="/mode">
        <div style={{ fontSize: "15px", color: "white", fontWeight: "bold", textDecoration: "underline", marginLeft: "5px" }}>← Back</div>
        </Link>
      </div>
      <main className="flex flex-col items-center justify-center">
        <div
          id="board"
          style={{
            width: "450px",
            height: "450px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            marginTop: "10px",
            left: "50px",
            position: "absolute"
          }}
        >
          {generateBoard()}
        </div>
        
      </main>
      
      <div
        className="buttonContainer"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          id="checkButton"
          style={{ marginRight: "10px" , marginLeft: "100px"}}
          onClick={checkSudoku}
        >
          Check
        </button>
        <button id="solveButton" style={{ marginRight: "10px" }}>
          Submit
        </button>
        <button id="resetButton" onClick={resetBoard}>
          Reset
        </button>
        {userError.size > 0 && checkClicked && displayUserErrors()}
      </div>
      <div
        id="errorsCount"
        style={{
          marginTop: "20px",
          textAlign: "center",
          color: "white",
        }}
      >
        {errorsCount > 0 && <p>{`You have ${setOfUserWrong.size} error(s).`}</p>}
      </div>
      <button style={{ marginRight: "10px" }} onClick={handleHint}>
          Hint
        </button>
        <div style={{ position: "absolute", bottom: "50px", right: "20px", fontSize: "50px", fontWeight: "bold", color: "white" }}> <Timer /></div>
      <div style={{ position: "absolute", bottom: "10px", right: "20px", fontSize: "30px", fontWeight: "bold", color: "yellow" }}>MEDIUM</div>
      <div style={{ position: "absolute", bottom: "10px", left: "20px" }}>
        <p>Checks Used: {checkCount}/10</p>
      </div>
    </div>
  );
};

export default Home;
