import logo from './logo.svg';
import './App.css';
import React from 'react';

class Square extends React.Component {
  
  render() {
    function handleClick() {
      console.log('click');
    }

    const cardStyle = {
      backgroundImage: `url("`+this.props.value+`")`, 
      backgroundColor: "lightblue",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    return (
      <button className="square" onClick={handleClick} style={cardStyle}>
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
          {this.renderSquare("https://i.pinimg.com/564x/7a/18/59/7a18597181080f7dfa64268dd30aea8d.jpg")}
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
