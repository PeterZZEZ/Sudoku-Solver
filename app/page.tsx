'use client';

import React from "react";
import { SudokuProvider } from './sudoku';
import {Game} from "./game";

const Home: React.FC<{}>=() =>{
  return (
    <SudokuProvider>
      <Game/>
    </SudokuProvider>
  )
}
export default Home
