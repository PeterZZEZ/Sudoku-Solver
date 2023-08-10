import { Action } from "./action";
import { Difficulty } from "./difficulty";
type StatusSectionProps = {
    onClickErase: () => void,
    onClickSolve:()=>void,
    onClickRestart:()=>void,
    onClickDifficulty:(difficulty:string)=>void
  };
  export const StatusSection = (props: StatusSectionProps) => {
    return (
      <section className="status">
        <div className="difficulty-bar">
          <Difficulty action="easy" onClickAction={(diff:string)=>props.onClickDifficulty(diff)}/>
          <Difficulty action="medium" onClickAction={(diff:string)=>props.onClickDifficulty(diff)}/>
          <Difficulty action="hard" onClickAction={(diff:string)=>props.onClickDifficulty(diff)}/>
        </div>
        <div className="status__actions">
          <Action action='erase' onClickAction={props.onClickErase} />
          <Action action='solve' onClickAction={props.onClickSolve}/>
          <Action action='restart' onClickAction={props.onClickRestart}/>
        </div>
      </section>
    )
  }