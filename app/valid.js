//checking if the row has any elements that are same
function checkRow(grid,row,col,num){
    for(let i = 0; i < 9; i++){
      if(grid[row][i]===num && i != col){
        return false;
      }
    }
    return true;
  }
//checking if the collumn has any elements that are same
function checkCol(grid,row,col,num){
    for(let i = 0; i < 9; i++){
      if(grid[i][col]===num && i != row){
        return false;
      }
    }
    return true;
  }
//checking if the box has any elements that are same
  function checkBox(grid,row,col,num){
    let boxArr=[],
    rowStart=row-(row%3),
    colStart=col-(col%3);
    let count=0;
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(grid[rowStart+i][colStart+j]===num && (rowStart+i!==row && colStart+j!==col)){
          count++;
        }
      } 
    }
    return count<1;
  }

//The main function that uses all the checks if the number is valid to be in the cell
export function valid(grid,num,row,col){
    if(checkBox(grid,row,col,num)&&checkCol(grid,row,col,num)&&checkRow(grid,row,col,num)){
      return true;
    }
    return false;
  }