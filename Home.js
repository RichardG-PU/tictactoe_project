// Home.js
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

const Home = ({navigateToTicTacToe}) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleStartPlaying = () => {
    navigateToTicTacToe(player1, player2);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Player 1 Name"
        value={player1}
        onChangeText={text => setPlayer1(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Player 2 Name"
        value={player2}
        onChangeText={text => setPlayer2(text)}
      />
      <Button title="Start Playing" onPress={handleStartPlaying} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
    width: 200,
  },
});

export default Home;
