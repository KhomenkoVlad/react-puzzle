import styles from "./Puzzle.module.css";
import React, { useState, useContext, useEffect } from "react";
import { PuzzleContext } from "../../context/PuzzleProvider";
import { useLanguage } from "../../utils/hooks";

export default function Puzzle() {
  const { tr } = useLanguage();
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [replacedPiece, setReplacedPiece] = useState(null);
  const {
    state: { grid, columns, image, isDraggable },
    switchPieces,
  } = useContext(PuzzleContext);

  const dragStart = event => {
    setDraggedPiece(event.target);
  };

  const dragDrop = event => {
    setReplacedPiece(event.target);
  };

  const dragEnd = event => {
    if (event.target.parentElement.contains(replacedPiece)) {
      switchPieces(draggedPiece, replacedPiece);
      setDraggedPiece(null);
      setReplacedPiece(null);
    }
  };

  const touchStart = event => {
    if (isDraggable && event.touches.length === 1) {
      event.target.style.zIndex = "5";
      setDraggedPiece({
        touch: event.touches[0],
        element: event.touches[0].target,
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
    } else {
      event.preventDefault();
    }
  };

  const touchMove = event => {
    if (draggedPiece && event.touches.length === 1) {
      const moveX = event.touches[0].clientX - draggedPiece.x;
      const moveY = event.touches[0].clientY - draggedPiece.y;
      draggedPiece.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      event.preventDefault();
    }
  };

  const getElementBelow = event => {
    const allPieces = [...document.getElementById("puzzle-wrap").children];
    const touch = event.changedTouches[0];
    for (const piece of allPieces) {
      const pieceRect = piece.getBoundingClientRect();
      if (
        touch.clientX > pieceRect.left &&
        touch.clientX < pieceRect.right &&
        touch.clientY < pieceRect.bottom &&
        touch.clientY > pieceRect.top
      ) {
        return piece;
      }
    }
    return null;
  };

  const touchEnd = event => {
    if (draggedPiece && event.touches.length === 0) {
      draggedPiece.element.style.transform = `translate(0, 0)`;
      draggedPiece.element.style.zIndex = "1";
      const elementBelow = getElementBelow(event);

      if (elementBelow) {
        switchPieces(draggedPiece.element, elementBelow);
      }
      setDraggedPiece(null);
    } else {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const puzzle = document.getElementById("puzzle-wrap");
    const documentTouch = () => {
      for (const piece of puzzle.children) {
        piece.style.transform = `translate(0, 0)`;
      }
    };

    document.addEventListener("touchend", documentTouch);
    return () => document.removeEventListener("touchend", documentTouch);
  }, []);

  return (
    <div
      id="puzzle-wrap"
      className={styles.puzzle}
      style={{
        aspectRatio: image ? `${image.naturalWidth / image.naturalHeight}` : "1",
        backgroundImage: image && !isDraggable ? `url("${image.src}")` : "none",
        borderColor: isDraggable ? "grey" : "green",
      }}
    >
      {!image && (
        <div style={{ margin: "10px auto" }}>{tr({ en: "Loading...", uk: "Завантаження..." })}</div>
      )}
      {grid.map((piece, index) => (
        <div
          key={index}
          data-position={piece.position}
          draggable={isDraggable}
          onDragStart={dragStart}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
          onDragOver={e => e.preventDefault()}
          onDragEnter={e => e.preventDefault()}
          onDragLeave={e => e.preventDefault()}
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
          onTouchMove={touchMove}
          style={{
            order: index,
            backgroundImage: `url("${image.src}")`,
            backgroundPosition: `${piece.x}% ${piece.y}%`,
            backgroundSize: `${100 * columns}%`,
            flex: `1 1 ${100 / columns}%`,
          }}
        ></div>
      ))}
    </div>
  );
}
