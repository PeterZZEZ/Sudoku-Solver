import React from 'react';

type ActionProp = {
    action: string,
    onClickAction:() => void
}
type SvgProps = {
    action: string
  };
  
  /**
   * Return the SVGs of the Action buttons in the Status Section.
   */
  const Svg = (props: SvgProps) => {
    if (props.action === 'erase') {
      return (
        <svg className="status__action-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512.001 512.001"><path d="M505.922,476.567L285.355,256L505.92,35.435c8.106-8.105,8.106-21.248,0-29.354c-8.105-8.106-21.248-8.106-29.354,0L256.001,226.646L35.434,6.081c-8.105-8.106-21.248-8.106-29.354,0c-8.106,8.105-8.106,21.248,0,29.354L226.646,256L6.08,476.567c-8.106,8.106-8.106,21.248,0,29.354c8.105,8.105,21.248,8.106,29.354,0l220.567-220.567l220.567,220.567c8.105,8.105,21.248,8.106,29.354,0S514.028,484.673,505.922,476.567z" fill="hsl(213, 30%, 59%)"/></svg>
      )
    } else {
      return null;
    }
  }
export const Action = (props : ActionProp) =>{
    return(
        <div className={"status__action-erase"} onClick={props.onClickAction}>
            <Svg action={props.action} />
            <p className='status__action_text'>
                {"Erase"}
            </p>
        </div>
    )
}