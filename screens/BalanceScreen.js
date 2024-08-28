import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

const BalanceScreen = () => {
  const [newBalance, setNewBalance] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  // const navigation = useNavigation();

  const fetchBalance = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const balanceResponse = await axios.get('https://financeapp-ejy2.onrender.com/api/bank/balance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentBalance(balanceResponse.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error.message);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleModifyAmount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!newBalance) {
        Alert.alert('Validation Error', 'Please enter amount.');
        return;
      }

      const response = await axios.post(
        'https://financeapp-ejy2.onrender.com/api/bank/updatebalance',
        {
          newBalance,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Amount Modified', `New Balance: ${newBalance}`);
      fetchBalance(); // Fetch the updated balance after modification
      // navigation.navigate('MyProfile');
    } catch (error) {
      console.error('Transfer failed:', error.message);
      Alert.alert('Transfer Failed', 'An error occurred while transferring funds. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance Screen</Text>
      <View style={styles.card}>
        <Text>Current Balance: ₹{currentBalance}</Text>
        <TextInput
          placeholder="New Balance"
          value={newBalance}
          onChangeText={(text) => setNewBalance(text)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.modifyButton} onPress={handleModifyAmount}>
          <Text style={styles.buttonText}>Modify Amount</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  modifyButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BalanceScreen;
