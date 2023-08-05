'allowImportingTsExtensions'
import {valid} from './valid.js'
  //The backtrack algo
  export function solver(grid,animations){
    let find= findEmpty(grid),
    row,col;
    if(find[0]===-1){
      return true;
    }
    else{
      row=find[0];
      col=find[1];
    }
    for(let i=1;i<10;i++){
      if(valid(grid,i,row,col)){
        grid[row][col]=i;
        animations.push([ (row+1) * 9 -  (9- (col+1) ), i,0])
        if(solver(grid,animations)){
          return true;
        }
        animations.push([(row+1) * 9 -  (9- (col+1) ), -1,1])
        grid[row][col]=-1;
      }
    }
    return false;
  }
  //Find the empty first empty cell to be filled in by the backtrack algo
  export function findEmpty(grid){
    for(let i =0;i<9;i++){
      for(let j =0;j<9;j++){
        if(grid[i][j]===-1){
          return [i, j];
        }
      } 
    }
    return [-1,-1];
  }
  