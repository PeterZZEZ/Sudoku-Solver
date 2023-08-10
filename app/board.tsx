import React from "react";
import { useSudokuContext } from "./sudoku";
type BoardProps={
    onClick: (arrayIndex: number) => void,
    onKeyDown:(enterVal:number) => void
};
export const Board = (props:BoardProps) => {
    const rows=[0,1,2,3,4,5,6,7,8];
    let {   numberSelected,
            gameArray,
            cellSelected,
            initArray 
          ,won} = useSudokuContext();

    function _selectedCell(arrayIndex:number,val:number,highlight:string){
        if (val !== -1) {
          if (initArray[arrayIndex] === -1) {
            return (
              <td tabIndex={arrayIndex+1} className={`game__cell game__cell--userfilled game__cell--${highlight}selected`} onKeyDown={(e)=>{enterNumber(e)}} key={arrayIndex} onClick={() => props.onClick(arrayIndex)}>{val!==-1?val:''}</td>
            )
          } else {
            return (
              <td tabIndex={arrayIndex+1} className={`game__cell game__cell--filled game__cell--${highlight}selected`} onKeyDown={(e)=>{enterNumber(e)}} key={arrayIndex} onClick={() => props.onClick(arrayIndex)}>{val!==-1?val:''}</td>
            )
          }
        } else {
          return (
            <td tabIndex={arrayIndex+1} className={`game__cell game__cell--${highlight}selected`} key={arrayIndex} onKeyDown={(e)=>{enterNumber(e)}} onClick={() => props.onClick(arrayIndex)}>{val!==-1?val:''}</td>
          )
        }
      }
      function _unselectedCell(arrayIndex: number, val: number) {
        if (val !== -1) {
          if (initArray[arrayIndex] === -1) {
            return (
              <td tabIndex={arrayIndex+1} className="game__cell game__cell--userfilled" key={arrayIndex} onKeyDown={(e)=>{enterNumber(e)}} onClick={() => props.onClick(arrayIndex)}>{val!==-1?val:''}</td>
            )
          } else {
            return (
              <td tabIndex={arrayIndex+1} className="game__cell game__cell--filled" key={arrayIndex} onKeyDown={(e)=>{enterNumber(e)}} onClick={() => props.onClick(arrayIndex)}>{val!==-1?val:''}</td>
            )
          }
        } else {
          return (
            <td tabIndex={arrayIndex+1} className="game__cell" key={arrayIndex}onKeyDown={(e)=>{enterNumber(e)}} onClick={() => props.onClick(arrayIndex)}>{val!==-1?val:''}</td>
          )
        }
      }
    function _isCellSameAsSelectedCell(row: number, column: number) {
        if (cellSelected === row * 9 + column) {
          return true;
        }
        if (gameArray[cellSelected] === -1) {
          return false;
        }
        if (gameArray[cellSelected] === gameArray[row * 9 + column]) {
          return true;
        }
        
    }
    
    function enterNumber(e:React.KeyboardEvent<HTMLTableCellElement>){
        let v=e.key;
        if(!isNaN(v as any)){
            let m = parseInt(v)
            if(m<10 && m>0){
                props.onKeyDown(m)
            }
        }
    }
    return(
        <section className="game">
            <table className="game__board">
                <tbody>
                    {
                    rows.map((row)=>{
                        return(
                            <tr key={row} className="game__row">
                                {rows.map((col,cIndex)=>{
                                            let arrayIndex = row*9+col;
                                            let val= gameArray[arrayIndex];
                                            if(cellSelected===arrayIndex){
                                                return _selectedCell(arrayIndex,val,'highlight');
                                            }
                                            if (cellSelected !== -1 && _isCellSameAsSelectedCell(row, col)) {
                                                return _selectedCell(arrayIndex, val, '');
                                            } else {
                                                return _unselectedCell(arrayIndex, val);
                                            }
                                        }
                                        
                                    )
                                }
                            </tr>)
                    })
                    }
                </tbody>
            </table>
        </section>
        );
        
    
}