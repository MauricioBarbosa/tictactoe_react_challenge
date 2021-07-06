import React, { Component } from 'react';

import Square from './Square';

class Board extends Component {

    renderSquare(i) {
      var winner = false;
      if(this.props.positions) {
        this.props.positions.map((n)=>{
          if(n === i){
            winner = true;
          }
        }) 
      }
      return <Square value={this.props.squares[i]}
      onClick={()=> this.props.onClick(i)} key={i * 783728}
      winner = {winner}
      selected = {i === this.props.arrayPosition}
      />;
    }

    render() {
      let table = [];
      var j = 0;
      for(var i = 3; i <= 9; i= i+3){
        let squares = [];
        for(;j < i; j++){
          squares.push(this.renderSquare(j)); 
        }
        table.push(<div className="board-row" key={`${i}`}>{squares}</div>); 
      }

      return (
        <div>
          {
            table
          }
        </div>
      );
    }
  }

export default Board; 