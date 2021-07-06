import React from 'react';

export default props => {
    return(
        <div className="display">
            <div>Y = {props.rol}</div>
            <div>X = {props.col}</div>
        </div>
    )
}