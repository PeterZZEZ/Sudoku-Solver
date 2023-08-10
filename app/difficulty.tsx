import { diffieHellman } from 'crypto';
import React from 'react';
import { useSudokuContext } from './sudoku';
type DifficultyProp = {
    action: string,
    onClickAction:(difficulty:string) => void
}
export const Difficulty = (props : DifficultyProp) =>{
    let {
        difficulty
    } = useSudokuContext()
    let chosen:string=''
    if(props.action===difficulty){
        chosen='chosen'
    }
    return(
        <div className={"difficulty__action-"+props.action} onClick={()=>props.onClickAction(props.action)}>
            <p className={'difficulty__text'+chosen} >
                {
                  props.action
                }
            </p>
        </div>
    )
}