import logo from './logo.svg';
import './App.css';
import React from 'react';

class Square extends React.Component {
  
  render() {
    function handleClick() {
      console.log('click');
    }

    return (
      <button className="square" onClick={handleClick}>
       <img src={this.props.value}/>
     </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i}/>;
  }

  render() {
    const player = 'X';
    const gameCode = '1234';

    return (
      <div>
        <div className="status">Game Code: {gameCode}</div>
        <div className="status">Current nominating player: {player}</div>
        <div className="status">Choose the image which matches the following description:</div>
        <div className="board-row">
          {this.renderSquare("https://miro.medium.com/max/1400/1*yBCgIO7Az4yfvFqQRplG1A.png")}
          {this.renderSquare("https://qphs.fs.quoracdn.net/main-qimg-525ed2c8bc94f8b987ff8cc01386f570")}
          {this.renderSquare("https://qphs.fs.quoracdn.net/main-qimg-296c255cf905e97cbbf450423c74d868.webp")}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <Game />
  );
}

export default App;
