import React from 'react';

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Game from '../Game/Game'; 
import GameList from '../Game/GameList';

export default props =>(
    <HashRouter>
        <Switch>
            <Route path='/game' component={Game}></Route>
            <Route path='/historico' component={GameList}></Route>
            <Route path='/game/:id' component={Game}></Route>
            <Redirect from='*' to='/game' />
        </Switch>
    </HashRouter>
)