'use client';
import React, { createContext, useContext, useState } from 'react';

type SudokuContextProps = {
  numberSelected: string,
  setNumberSelected: React.Dispatch<React.SetStateAction<string>>,
  gameArray: number[],
  setGameArray: React.Dispatch<React.SetStateAction<number[]>>,
  difficulty: string,
  setDifficulty: React.Dispatch<React.SetStateAction<string>>,
  cellSelected: number,
  setCellSelected: React.Dispatch<React.SetStateAction<number>>,
  initArray: number[],
  setInitArray: React.Dispatch<React.SetStateAction<number[]>>,
  won: boolean,
  setWon: React.Dispatch<React.SetStateAction<boolean>>
};


const SudokuContext = createContext<SudokuContextProps>({ numberSelected: '0', setNumberSelected: () => {},
                                                          gameArray: [], setGameArray: () => {},
                                                          difficulty: 'easy', setDifficulty: () => {},
                                                          cellSelected: -1, setCellSelected: () => {},
                                                          initArray: [], setInitArray: () => {},
                                                          won: false, setWon: () => {} });

type SudokuProviderProps = {
  children: React.ReactElement
};

export const SudokuProvider = ({ children }: SudokuProviderProps) => {
  let [ numberSelected, setNumberSelected ] = useState<string>('0');
  let [ gameArray, setGameArray ] = useState<number[]>([]);
  let [ difficulty,setDifficulty ] = useState<string>('easy');
  let [ cellSelected, setCellSelected ] = useState<number>(-1);
  let [ initArray, setInitArray ] = useState<number[]>([]);
  let [ won, setWon ] = useState<boolean>(false);

  return (
    <SudokuContext.Provider value={
      {
        numberSelected, setNumberSelected,
        gameArray, setGameArray,
        difficulty,setDifficulty,
        cellSelected, setCellSelected,
        initArray, setInitArray,
        won, setWon
      }
    }>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudokuContext = (): SudokuContextProps => useContext(SudokuContext);

// Usage
// const { numberSelected, setNumberSelected } = useNumberValue();