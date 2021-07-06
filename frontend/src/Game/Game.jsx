import React, { Component } from 'react';

import Board from './Board';
import DisplayRolCol from './DisplayRolCol';
import ButtonSets from './ButtonSets';
import { withRouter} from 'react-router-dom';

import { getGame, putGame, postGame } from '../api/consume';

class Game extends Component {
    constructor(props){ 
        super(props); 
        this.state = {
            loading: false,
            id: null,
            history: [{
                squares: Array(9).fill(null),
                number: 0,
                arrayPosition: null, 
                rol: null, 
                col: null
            }],
            xIsNext: true,
            stepNumber: 0 
        }
        
    }

    async componentDidMount(){
      let url = window.location.href;
      let params = url.split('/');
      let id = params.pop();
      if(id!='game'){
        this.setState({
          ...this.state, 
          loading: true
        })
        const game = await getGame(id); 
        if(game){
          this.setState({
            id: game[0]._id,
            history: game[0].history, 
            xIsNext: game[0].xIsNext, 
            stepNumber: 1,
            loading: false
          })
          console.log(this.state)
        }else{
          alert('Game not Found');
        }
      }
    }

    async saveGame(){
      if(this.state.id){
         const resp = await putGame(this.state.id, {...this.state, _id: this.state.id}); 
         if(resp && resp.nModified){
           alert('Game Modified!')
         }else{
          alert('An error has occured on update game')
         }
      }else{
        this.setState({
          loading: true
        })
        const resp = await postGame({...this.state});
        if(resp) {
          this.setState({
            id: resp, 
            loading: false
          })
        } else{
          alert('An error has occured on update game')
        }
        console.log(resp);
      }
    }


    verifyX(value){
      if(value < 3) 
       return 0; 
      else if(value >= 3 && value < 6)
        return 1; 
      else 
        return 2; 
    }

    verifyY(value){
      const col1 = [0,3,6]; 
      const col2 = [1,4,7];

      if(col1.indexOf(value) > -1)
        return 0; 
      else if(col2.indexOf(value) > -1)
        return 1; 
      else 
        return 2;
    }

    reorder(){
      var sub_history = this.state.history.slice();
      var index = [] 
      for(var i = sub_history.length - 1; i >=0 ; i--){
        index.push(sub_history[i]); 
      }
      this.setState({
        history: index
      })
    }

    calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        var possibilidade = 8 ;
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
              winner: squares[a], 
              positions: [a, b, c]
            };
          }

          if(squares[a] && (squares[b] || squares[c])){
            possibilidade--;
          }
        }
        //possibilidade = 2
        if(possibilidade === 0){
          return {
            winner: 'Empate', 
            positions: [0,2,3,5,7]
          };
        }

        return null;
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step, 
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1); 
        const current = history[history.length - 1]; 
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
          }
        this.state.xIsNext ? squares[i] = 'X' : squares[i] = 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                number: this.state.stepNumber + 1, 
                rol: this.verifyX(i),
                arrayPosition: i, 
                col: this.verifyY(i)
            }]),
            xIsNext: !this.state.xIsNext, 
            stepNumber: history.length
        });
    }

    render() {
      const history = this.state.history; 
      const current = history[this.state.stepNumber]; 
      const result = this.calculateWinner(current.squares);
      var winner;
      var positions; 
    
      if(result != null){
        winner = result.winner; 
        positions = result.positions;
      }

      let status;
      if(winner){
          status = 'Winner: ' + winner; 
      }else{
          status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
      }
      
      const moves = history.map((step, move)=>{
          const desc = move ? 
          'Go to move #' + (step.number + 1) : 
          'Go to game start'; 
          return (
              <li key={move}>
                  {
                      move === this.state.stepNumber? 
                      <button onClick={()=> this.jumpTo(move)} style={{border: '2px solid red'}}>{desc}</button> : 
                      <button onClick={()=> this.jumpTo(move)}>{desc}</button>
                  }
              </li>
          );
      });

      var frame= this.state.loading? <div>
        Loading... 
      </div> : <React.Fragment>
        <h1>Jogo da velha - Maurício Barbosa</h1>
        <div className="game">
          <div className="game-board">
            <Board 
            squares={current.squares}
            arrayPosition={current.arrayPosition}
            onClick={(i) => this.handleClick(i)}
            positions={positions}
            />
            <DisplayRolCol
             rol={current.rol}
             col={current.col}
            ></DisplayRolCol>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
        <div>
        <ButtonSets text="Change Order" color={"#0077FF"} onClick={() => this.reorder()}></ButtonSets>
        <ButtonSets text="Reset" color={"#ff0022"} onClick={() => this.reorder()}></ButtonSets>
        <ButtonSets text="Save" color={"#0b8519"} onClick={() => this.saveGame()}></ButtonSets>
        </div>
        </React.Fragment>


      return frame;
    }
  }

export default withRouter(Game); 