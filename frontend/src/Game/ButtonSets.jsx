import React from 'react';

export default props =>{
    return(
        <button onClick={()=> props.onClick()} 
        className="changeorderbutton"  
        style={{backgroundColor: props.color}}>{props.text}</button>
    )
}