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
<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="status__action-svg" id="IconChangeColor"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" id="mainIconPathAttribute" stroke="#fff"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>      )
    }
    else if(props.action==='solve'){
      return (
        <svg xmlns="http://www.w3.org/2000/svg"fill="currentColor" className="status__action-svg" viewBox="0 0 16 16"> <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/> </svg>
      )
    }
    else if(props.action==='restart'){
      return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='status__action-svg' fill="none" id="IconChangeColor" transform="scale(-1, 1)"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 9v5h-5M4 16c.497-4.5 3.367-8 8-8 2.73 0 5.929 2.268 7.294 5.5" id="mainIconPathAttribute"></path></svg>
      )
    }
    else {
      return null;
    }
  }
export const Action = (props : ActionProp) =>{
    return(
        <div className={"status__action-"+props.action} onClick={props.onClickAction}>
            <Svg action={props.action} />
            <p className='status__action_text'>
                {
                  props.action
                }
            </p>
        </div>
    )
}