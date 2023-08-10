'use client';
import React, {useEffect, useState } from "react";
import { findEmpty, solver } from './solver';
import { valid } from './valid'
import { genBoard } from "./generator";
import {Board} from './board';
import { useSudokuContext } from "./sudoku";
import {StatusSection} from "./status"
import { getDeepCopy } from "./generator";
const ANIMATION_SPEED_MS = 50;

// This is the main color of the editable cell.
const PRIMARY_COLOR = 'white';

// This is the color of cells that are wrong.
const SECONDARY_COLOR = 'red';
// This is the color of the cells that are maybe correct
const THIRD_COLOR ='green'

// The Difficulty modifier

const EASY=15,MEDIUM=30,HARD=45;


export const Game:React.FC<{}>=()=> {
  let { numberSelected, setNumberSelected,
    gameArray, setGameArray,
    difficulty, setDifficulty,
    cellSelected, setCellSelected,
    initArray, setInitArray,
    won, setWon } = useSudokuContext();
    
  function _winCheck(){
    for(let i = 0 ; i < gameArray.length ; i++){
      if(!valid(gameArray,gameArray[i],i)){
        setWon(false)
        return false;
      }
    }
    setWon(true)
    return true;
  }
  function onClickCell(indexOfArray: number) {
    setCellSelected(indexOfArray);
  }
  function _createNewGame(dif:string=difficulty) {
    let temporaryInitArray = genBoard(dif);
    setInitArray(temporaryInitArray);
    setGameArray(temporaryInitArray);
    setNumberSelected('0');
    setCellSelected(-1);
    setWon(false);
  }
  function _resetGame(){
    setGameArray(initArray)
    setCellSelected(-1)
    setWon(false)
  }
  function _fillCell(index: number, value: number) {
    if (initArray[index] === -1) {
      let tempArray = gameArray.slice();
      tempArray[index] = value;
      setGameArray(tempArray);
    }
    _winCheck()
  }
  function _setNewDifficulty(diff:string){
    setDifficulty(diff);
  }
  function onClickNewGame() {
    _createNewGame();
  }
  function getDeepCopy(arr:number[]){
    return JSON.parse(JSON.stringify(arr));
}
  function onKeyDownVal(val:number){
    let copy = getDeepCopy(gameArray);
    if(initArray[cellSelected]===-1){
      if(valid(copy,val,cellSelected)){
        copy[cellSelected]=val
        setGameArray(copy);
      }
    }
    _winCheck()
  }
  function onClickErase() {
    if(cellSelected !== -1 && gameArray[cellSelected] !== -1) {
      _fillCell(cellSelected, -1);
    }
  }
  function dto2d(arr:number[]){
    const newArr:number[][] = [];
    while(arr.length){newArr.push(arr.splice(0,9));}
    return newArr;
  }
  function dto1d(arr:number[][]){
    let temp:number[]=[]
    return temp.concat(...arr);
  }
  function onClickSolve(){
    let temp = getDeepCopy(initArray);
    let temper = dto2d(temp)
    solver(temper,[])
    let tempBoardArray=dto1d(temper)
    setGameArray(tempBoardArray)
  }
  function onClickRestart(){
    _resetGame()
  }

  function onClickDifficulty(diff:string){
    _setNewDifficulty(diff)
    _createNewGame(diff)
  }
  //don't remove the empty array it stops it from updating everytick
  useEffect(() => {
    _createNewGame();
  },[]);
  
  //The animation control
  /*
  function animateArrayUpdate(animations:number[][],sudoku:number[][]) {
    let prev=animations[0][0];
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('CellInput') as HTMLCollectionOf<HTMLInputElement>;
      const [idx, num, on] = animations[i];
      //The current cell that is being checked
      const CurrentCell = arrayBars[idx-1].style;
      //The prev cell that might get checked or not
      const prevCell = arrayBars[prev-1].style;
      const color= on===1 ? SECONDARY_COLOR : THIRD_COLOR;
      setTimeout(() => {
        CurrentCell.backgroundColor =color;
        arrayBars[idx-1].value = num===-1? "":num.toString();
      },  i * ANIMATION_SPEED_MS);
      prev=idx;
    }
    //Solving has finished and updating the sudoku array
    setTimeout(() => {
      setSolving(false)
      setSudokuArr(sudoku)
    }, 
    //The lines above will run after below amount of time has run
    animations.length * ANIMATION_SPEED_MS);
    return true;
  }*/
  
  

  return (
    <div className='App' >
      <div className='App-header'>
        <h3 onClick={onClickNewGame}>Sudoku Solver</h3>
        <div className="innercontainer">
            <Board 
                onClick={(indexOfArray: number) => onClickCell(indexOfArray)}
                onKeyDown={(enterVal:number) => onKeyDownVal(enterVal)}
            />
        </div>
        <StatusSection
            onClickErase={onClickErase}
            onClickSolve={onClickSolve}
            onClickRestart={onClickRestart}
            onClickDifficulty={(diff:string)=>onClickDifficulty(diff)}
          />
      </div>
      
    </div>
  )
}
