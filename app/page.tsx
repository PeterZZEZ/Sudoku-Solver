'use client';

import { useState } from "react";
import { Type } from "typescript";
import { findEmpty,solver } from './solver.js';
import { valid } from './valid.js'
const ANIMATION_SPEED_MS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

let initial=[
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1]
]
export default function Home() {
  const [sudokuArr, setSudokuArr] = useState(initial);
  const [solving, setSolving] = useState(false);

  function getDeepCopy(arr:number[][]){
    return JSON.parse(JSON.stringify(arr));
  }
  function onInputChange(e, row:number, col:number){
    var val = parseInt(e.target.value)||-1 , grid=getDeepCopy(sudokuArr);
    if(val === -1 || val >=1 && val<=9){
      grid[row][col]=val;
    }
    setSudokuArr(grid);
  }
  //button functions
  
  function animateArrayUpdate(animations:number[][],sudoku:number[][]) {
    let prev=animations[0][0];
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('CellInput');
      const [idx, num, on] = animations[i];
      const CurrentCell = arrayBars[idx-1].style;
      const prevCell = arrayBars[prev-1].style;
      const color= on===1 ? SECONDARY_COLOR : 'green';
      setTimeout(() => {
        CurrentCell.backgroundColor =color;
        arrayBars[idx-1].value=num===-1? 0:num;
      },  i * ANIMATION_SPEED_MS);
      prev=idx;
    }
    setTimeout(() => {
      setSolving(false)
      setSudokuArr(sudoku)
    }, animations.length * ANIMATION_SPEED_MS);
    return true;
  }
  
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


  function solveSudoku(){
    if(solving){return}
    let sudoku = getDeepCopy(initial);
    let animations:number[][]=[]
    solver(sudoku, animations);
    setSolving(true);
    if(animateArrayUpdate(animations,sudoku) && !solving){
      //setSudokuArr(sudoku)
      return
    }
    
  }
  function resetSudoku(){
    if(solving){return}
    setSudokuArr(initial);
    var arrayBars = document.getElementsByClassName('Editable');
    for (var i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor=PRIMARY_COLOR
    }
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
                          value={sudokuArr[row][col]=== -1 ? '': sudokuArr[row][col]} 
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
        </div>
      </div>
    </div>
  )
}
