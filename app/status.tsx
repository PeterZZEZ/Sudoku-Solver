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
          <Difficulty action="easy" onClickAction={props.onClickDifficulty}/>
          <Difficulty action="medium" onClickAction={props.onClickDifficulty}/>
          <Difficulty action="hard" onClickAction={props.onClickDifficulty}/>
        </div>
        <div className="status__actions">
          <Action action='erase' onClickAction={props.onClickErase} />
          <Action action='solve' onClickAction={props.onClickSolve}/>
          <Action action='restart' onClickAction={props.onClickRestart}/>
        </div>
      </section>
    )
  }