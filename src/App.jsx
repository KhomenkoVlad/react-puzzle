import React from "react";
import { PuzzleProvider } from "./context/PuzzleProvider";
import { LangProvider } from "./context/LangProvider";
import Form from "./components/Form/Form";
import Hint from "./components/Hint/Hint";
import Puzzle from "./components/Puzzle/Puzzle";
import LangSwitch from "./components/LangSwitch/LangSwitch";

export default function App() {
  return (
    <LangProvider>
      <PuzzleProvider>
        <Form />
        <Hint />
        <Puzzle />
      </PuzzleProvider>
      <LangSwitch />
    </LangProvider>
  );
}
