import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/bank_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Finance App!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Register"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        />
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db', // Change the color based on your preference
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
