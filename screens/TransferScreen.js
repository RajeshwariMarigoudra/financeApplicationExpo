import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const TransferScreen = () => {
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online'); // Default to online
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(''); // Change to 'token' for consistency
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Step 1: Get the token from AsyncStorage
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);

      // Step 2: Check if the token is present
      if (!storedToken) {
        console.error('Token not found in AsyncStorage');
        return; // Or handle the absence of the token appropriately
      }

      // Step 3: Use the provided token to make a request for user details
      const response = await axios.get('https://financeapp-ejy2.onrender.com/api/bank/users', {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Step 4: Update the state with response.data.users
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      // Step 5: Handle the error, display an alert, or navigate to an error screen
    }
  };

  const handleTransfer = async () => {
    try {
      // Step 6: Validation checks
      if (!recipientPhoneNumber || !amount) {
        Alert.alert('Validation Error', 'Please enter both recipient phone number and amount.');
        return;
      }

      // Step 7: Find the selected user
      const selectedUser = users.find((user) => user.phonenumber === recipientPhoneNumber);
      const recipientUsername = selectedUser ? selectedUser.username : 'Unknown User';

      // Step 8: Make a transfer request
      const response = await axios.post(
        'https://financeapp-ejy2.onrender.com/api/bank/transfer',
        {
          recipientPhoneNumber,
          recipientUsername,
          amount,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Step 9: Navigate to the profile screen on success
      navigation.navigate('MyPofile');
      // console.log('Transfer response:', response.data);
      // You can navigate to a success screen or handle the response accordingly
    } catch (error) {
      console.error('Transfer failed:', error.message);
      // Step 10: Handle the error, display an alert, or navigate to an error screen
      Alert.alert('Transfer Failed', 'An error occurred while transferring funds. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transfer Screen</Text>
      <View style={styles.card}>
        {/* Input for amount */}
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Picker for selecting recipient */}
        <View style={styles.pickerContainer}>
          {users.length > 0 ? (
            <RNPickerSelect
              placeholder={{ label: 'Select a user...', value: '' }}
              items={users.map((user) => ({ label: user.username, value: user.phonenumber }))}
              onValueChange={(value) => setRecipientPhoneNumber(value)}
              style={styles.pickerSelect}
            />
          ) : (
            <Text>Loading users...</Text>
          )}
        </View>

        {/* Picker for selecting payment method */}
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: 'Select a payment method...', value: '' }}
            items={[
              { label: 'Online', value: 'online' },
              { label: 'Offline', value: 'offline' },
              { label: 'NEFT', value: 'neft' },
              { label: 'RTGS', value: 'rtgs' },
              { label: 'ATM Transfer', value: 'atm' },
            ]}
            onValueChange={(value) => setPaymentMethod(value)}
            style={styles.pickerSelect}
          />
        </View>

        {/* Button for initiating the transfer */}
        <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
          <Text style={styles.buttonText}>Transfer</Text>
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
  transferButton: {
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
  pickerContainer: {
    marginBottom: 10,  
  },
  pickerSelect: {
    marginTop: 5,
    inputIOS: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    inputAndroid: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
  },
});

export default TransferScreen;
