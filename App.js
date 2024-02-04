import React, {useState} from 'react';
import {View} from 'react-native';
import Home from './Home';
import TicTacToe from './TicTacToe';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [players, setPlayers] = useState({player1: '', player2: ''});

  const navigateToTicTacToe = (player1, player2) => {
    setPlayers({player1, player2});
    setCurrentScreen('TicTacToe');
  };

  const navigateToHome = () => {
    setCurrentScreen('Home');
  };

  return (
    <View style={{flex: 1}}>
      {currentScreen === 'Home' && (
        <Home navigateToTicTacToe={navigateToTicTacToe} />
      )}
      {currentScreen === 'TicTacToe' && (
        <TicTacToe players={players} navigateToHome={navigateToHome} />
      )}
    </View>
  );
};

export default App;
