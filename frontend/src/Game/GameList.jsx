import React, { Component } from 'react';
import { getGames } from '../api/consume';
import { Link } from 'react-router-dom';

export default class GameList extends Component{
    constructor(props){
        super(props); 
        this.state = {
            games: []
        }

    }

    async componentDidMount(){
        await this.loadGames();
        this.render();
    }

    async loadGames(){
        const games_list = await getGames();
        this.setState({
            games: games_list
        })
    }

    render(){
        let list;
        if(this.state.games && this.state.games.length > 0){
            list = this.state.games.map(e => {
                var ref = `/game/${e._id}`;
                return (
                    <Link to={ref} key={e._id}>{e._id}</Link>
                )
            })
        }else{
            list = 'Loading...';
        }

        return (
            <div>
                <h1>Lista de Jogos salvos</h1>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {list}
                </div>
            </div>
        )
    }
}