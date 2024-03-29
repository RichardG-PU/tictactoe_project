import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import Header from './Header';

const TicTacToe = ({players, navigateToHome}) => {
  const [history, setHistory] = useState([
    {squares: Array(9).fill(null), xIsNext: Math.random() < 0.5},
  ]);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateDraw = squares => {
    return squares.every(square => square !== null);
  };

  const calculateWinner = squares => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = index => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();

    if (squares[index] || calculateWinner(squares) || calculateDraw(squares)) {
      return;
    }

    squares[index] = current.xIsNext ? 'X' : 'O';
    setHistory(currentHistory.concat([{squares, xIsNext: !current.xIsNext}]));
    setStepNumber(currentHistory.length);
  };

  const handleUndo = () => {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
    }
  };

  const handleNewGame = () => {
    setHistory([{squares: Array(9).fill(null), xIsNext: Math.random() < 0.5}]);
    setStepNumber(0);
  };

  const handleHome = () => {
    navigateToHome();
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;

  if (winner) {
    const winningPlayer = current.xIsNext ? players.player1 : players.player2;
    status = `Winner: ${winningPlayer}`;
  } else if (calculateDraw(current.squares)) {
    status = "It's a draw!";
  } else {
    const currentPlayer = current.xIsNext ? players.player1 : players.player2;
    status = `Next player: ${currentPlayer}`;
  }
  const renderSquare = index => {
    const isSquareClickable = !current.squares[index] && !winner;

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => isSquareClickable && handleClick(index)}>
        <View style={styles.square}>
          <Text style={styles.squareText}>
            {current.squares[index] ? String(current.squares[index]) : ' '}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <View style={styles.board}>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>{status}</Text>
          </View>
          <View style={styles.row}>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </View>
          <View style={styles.row}>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </View>
          <View style={styles.row}>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </View>
          <View style={styles.buttonRow}>
            <Button onPress={handleNewGame} title="New Game" />
            <Button onPress={handleUndo} title="Undo" />
            <Button onPress={handleHome} title="Home" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial',
  },
  board: {
    marginTop: 20,
  },
  statusContainer: {
    marginBottom: 10,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    height: 100,
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  squareText: {
    fontSize: 36,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    height: 35,
  },
});

export default TicTacToe;
