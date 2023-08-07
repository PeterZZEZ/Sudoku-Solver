import { Action } from "./action";

type StatusSectionProps = {
    onClickErase: () => void,
    onClickSolve:()=>void,
  };
  export const StatusSection = (props: StatusSectionProps) => {
    return (
      <section className="status">
        <div className="status__actions">
          <Action action='erase' onClickAction={props.onClickErase} />
          <Action action='solve' onClickAction={props.onClickSolve}/>
        </div>
      </section>
    )
  }