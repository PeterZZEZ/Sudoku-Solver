import { Action } from "./action";

type StatusSectionProps = {
    onClickErase: () => void,
  };
  export const StatusSection = (props: StatusSectionProps) => {
    return (
      <section className="status">
        <div className="status__actions">
          <Action action='erase' onClickAction={props.onClickErase} />
        </div>
      </section>
    )
  }