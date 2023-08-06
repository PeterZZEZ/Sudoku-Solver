'use client';

import { useState } from "react";
import { Type } from "typescript";
import { findEmpty, solver } from './solver.js';
import { valid } from './valid.js'
import { genBoard } from "./generator";
const ANIMATION_SPEED_MS = 50;

// This is the main color of the editable cell.
const PRIMARY_COLOR = 'white';

// This is the color of cells that are wrong.
const SECONDARY_COLOR = 'red';
// This is the color of the cells that are maybe correct
const THIRD_COLOR ='green'

// The Difficulty modifier

const EASY=15,MEDIUM=30,HARD=45;


let initial:number[][];
initial=genBoard(MEDIUM);
export default function Home() {
  const [sudokuArr, setSudokuArr] = useState(initial);
  const [solving, setSolving] = useState(false);

  function getDeepCopy(arr:number[][]){
    return JSON.parse(JSON.stringify(arr));
  }
  function onInputChange(e:React.ChangeEvent<HTMLInputElement>, row:number, col:number){
    var val = parseInt(e.target.value)||-1 , grid=getDeepCopy(sudokuArr);
    if(val === -1 || val >=1 && val<=9){
      grid[row][col]=val;
    }
    setSudokuArr(grid);
  }
  //The animation control
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
  }
  //button functions
  function checkSudoku(){
    if(solving){return}
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if(!valid(sudokuArr,sudokuArr[i][j],i,j)){
          alert('it is not okay');
          return false;
        }
      } 
    }
    alert('it is okay');
  }
  //solving functions
  function solveSudoku(){
    if(solving){return}
    resetSudoku();
    let sudoku = getDeepCopy(initial);
    let animations:number[][]=[]
    solver(sudoku, animations);
    setSolving(true);
    animateArrayUpdate(animations,sudoku)
  }
  //I need to make this a bit less brute force
  function resetSudoku(){
    if(solving){return}
    setSudokuArr(initial);
    let arrayBars = document.getElementsByClassName('Editable') as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor=PRIMARY_COLOR
    }
  }
  //generate a Sudoku board
  function genSudoku(){
    if(solving){return}
    resetSudoku()
    initial=genBoard(MEDIUM)
    setSudokuArr(initial)
  }
  return (
    <div className='App'>
      <div className='App-header'>
        <h3>Sudoku Solver</h3>
        <table>
          <tbody>
            {
              [0,1,2,3,4,5,6,7,8].map((row,rIndex)=>{
                return <tr key={rIndex} className={((row+1)%3===0) ? 'bBorder':''}>
                    {[0,1,2,3,4,5,6,7,8].map((col,cIndex)=>{
                      return <td key={rIndex+cIndex} className={((col+1)%3===0) ? 'rBorder':''}>
                          <input onChange={(e)=>onInputChange(e,row,col)} 
                          value={initial[row][col]=== -1 ? '': initial[row][col]} 
                          type="text" 
                          className={initial[row][col]!==-1 ? 'CellInput':'CellInput Editable'}
                          disabled={initial[row][col]!==-1}
                          />
                        </td>
                    })}
                </tr>
              })
            }
            
          </tbody>
        </table>
        <div className="buttonContainer">
          <button className="Button_style checkButton" onClick={checkSudoku}>Check</button>
          <button className="Button_style solveButton" onClick={solveSudoku}>Solve</button>
          <button className="Button_style resetButton" onClick={resetSudoku}>Reset</button>
          {/*  <button className="Button_style generatorButton" onClick={genSudoku}>Generate</button>*/} 
        </div>
      </div>
    </div>
  )
}
