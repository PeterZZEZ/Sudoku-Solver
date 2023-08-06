//checking if the row has any elements that are same
function checkRow(grid:number[],num:number,idx:number){
  let row=Math.floor(idx/9);
  let col=idx-row*9;
    for(let i = 0; i < 9; i++){
      if(grid[(row*9)+i]===num && i != col){
        return false;
      }
    }
    return true;
  }
//checking if the collumn has any elements that are same
function checkCol(grid:number[],num:number,idx:number){
  let row=Math.floor(idx/9);
  let col=idx-row*9;
    for(let i = 0; i < 9; i++){
      if(grid[(i*9)+col]===num && i != row){
        return false;
      }
    }
    return true;
  }
//checking if the box has any elements that are same
  function checkBox(grid:number[],num:number,idx:number){
    let row=Math.floor(idx/9);
    let col=idx-row*9;
    let boxArr=[],
    rowStart=row-(row%3),
    colStart=col-(col%3);
    let count=0;
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(grid[((rowStart+i)*9)+(colStart+j)]===num && ((rowStart+i)!==row && (colStart+j)!==col)){
          count++;
        }
      } 
    }
    return count<1;
  }

//The main function that uses all the checks if the number is valid to be in the cell
export function valid(grid:number[],num:number,idx:number){
    if(checkBox(grid,num,idx) && checkCol(grid,num,idx) && checkRow(grid,num,idx)){
      return true;
    }
    return false;
  }