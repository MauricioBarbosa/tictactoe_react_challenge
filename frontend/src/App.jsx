import React, { Component } from 'react';

import Menu from './Main/Menu';
import Routes from './Main/Routes';



export default props => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Menu></Menu>
            <Routes></Routes>
        </div>
    )
}