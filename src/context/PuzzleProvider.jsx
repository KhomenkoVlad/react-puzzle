import React, { createContext, useReducer, useEffect } from "react";
import { shuffle } from "../utils/functions";
import defaultImage from "../assets/mona-lisa.jpg";

export const PuzzleContext = createContext();

const initialState = {
  grid: [],
  rows: 0,
  columns: 0,
  image: "",
  title: {},
  isDraggable: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setImage": {
      return {
        ...initialState,
        image: action.image,
        title: action.title,
        isDraggable: false,
      };
    }
    case "newGame": {
      return {
        ...state,
        grid: action.grid,
        rows: action.rows,
        columns: action.columns,
        isDraggable: true,
      };
    }
    case "setGrid": {
      return {
        ...state,
        grid: action.grid,
      };
    }
    case "endGame": {
      return {
        ...state,
        isDraggable: false,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const PuzzleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadImage = (src, title) => {
    dispatch({ type: "setImage", image: "", title: {} });
    const image = new Image();
    image.addEventListener("load", () => {
      image.alt = title;
      dispatch({ type: "setImage", image, title });
    });
    image.src = src;
  };

  const newGame = (rows, columns) => {
    const backgroundGrid = new Array();
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        backgroundGrid.push({
          y: (100 / (rows - 1)) * i,
          x: (100 / (columns - 1)) * j,
        });
      }
    }

    const grid = shuffle(
      Array.from({ length: rows * columns }, (_, index) => {
        return {
          position: index,
          ...backgroundGrid[index],
        };
      })
    );

    dispatch({ type: "newGame", grid, rows, columns });
  };

  const switchPieces = (draggedPiece, replacedPiece) => {
    const draggedOrder = draggedPiece.style.order;
    const replacedOrder = replacedPiece.style.order;
    const tempGrid = [...state.grid];

    let temp = tempGrid[draggedOrder];
    tempGrid[draggedOrder] = tempGrid[replacedOrder];
    tempGrid[replacedOrder] = temp;

    dispatch({ type: "setGrid", grid: tempGrid });
  };

  const isWinning = () => {
    for (let i = 0; i < state.grid.length; i++) {
      if (state.grid[i].position !== i) return false;
    }
    return true;
  };

  useEffect(() => {
    loadImage(defaultImage, {
      en: "Mona Lisa - Leonardo da Vinci",
      uk: "Мона Ліза - Леонардо да Вінчі",
    });
  }, []);

  useEffect(() => {
    if (isWinning()) {
      dispatch({ type: "endGame" });
    }
  }, [state.grid]);

  useEffect(() => {
    if (isWinning()) {
      dispatch({ type: "setGrid", grid: [] });
    }
  }, [state.isDraggable]);

  return (
    <PuzzleContext.Provider value={{ state, dispatch, loadImage, newGame, switchPieces }}>
      {children}
    </PuzzleContext.Provider>
  );
};
