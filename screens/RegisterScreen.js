// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState('0');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://financeapp-ejy2.onrender.com/api/auth/register', {
        username,
        phonenumber,
        password,
        balance,
      });
      console.log(response.data); // You can handle success response as needed
      // Navigate to Login Screen or any other screen
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message || 'Please Try Again');
      // console.error(error.response.data);
      // Handle error, show error message, etc.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phonenumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Initial Amount"
        keyboardType="numeric"
        value={balance}
        onChangeText={(text) => setBalance(text)}
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark text color
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc', // Light border color
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white', // White background color
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterScreen;
