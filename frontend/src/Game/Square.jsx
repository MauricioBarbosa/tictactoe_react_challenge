import React, { Component } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
    let classname; 
    if(props.winner || props.selected){
      classname = "square selected"; 
    }else{
      classname = "square"
    }
    return (
        <button className={classname} onClick={()=> props.onClick()}>
          {props.value}
        </button>
    )
}