import { solver } from "./solver";
function shuffle(array:any[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function initialize2DArray(w:number, h:number, val:number){
  return Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));
}

function fillSmall(grid:number[][],row:number,col:number){
    let arr=shuffle([1,2,3,4,5,6,7,8,9]);
    let rowStart=row;
    let colStart=col;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++ ){
            grid[rowStart+i][colStart+j]=arr[((i+1)*3-(3-(j+1)))-1];
        }
    }
    return grid;
}
function cellMaker(){
  let comb=[] as number[][]
  for(let i = 0 ; i < 9 ; i++){
    for(let j = 0 ; j < 9 ; j++){
      comb.push([i,j]);
    }  
  }
  return comb;
}
export function getDeepCopy(arr:number[][]){
  return JSON.parse(JSON.stringify(arr));
}
function gapMaker(grid:number[][],k:number){
  let comb=cellMaker();
  let combs=shuffle(comb);
  for(let i = 0; i < k; i++){
    grid[combs[i][0]][combs[i][1]]=-1;
  }
}
export function genBoard(difficulty:string){
  let dif = 0
  if(difficulty=='easy'){
    dif=15
  }
  if(difficulty=='medium'){
    dif=30
  }
  if(difficulty=='hard'){
    dif=45
  }
  let board=initialize2DArray(9,9,-1) as number[][];
  [[0,0],[3,3],[6,6]].forEach(
        ([row,col])=>(
               board=fillSmall(board,row,col)
    ))
    let animations:number[][]=[]
    solver(board, animations);
    gapMaker(board,dif);
    let temp:number[]=[]
    return temp.concat(...board);
}