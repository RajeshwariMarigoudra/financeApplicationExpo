// screens/DashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, ScrollView, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused} from '@react-navigation/native';

const MyPofile = () => {
  const [username, setUserName] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [profilePictureUri, setProfilePictureUri] = useState(null);

//image picker 
const pickImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      // Update the profile picture URI
      setProfilePictureUri(result.assets[0].uri);
      // Clear the default profile picture URI if present
      await AsyncStorage.removeItem('profilePictureUri');
    } else {
      // Set the default profile picture URI
      setProfilePictureUri(require('../assets/bank_logo.png'));
      // Store the default profile picture URI locally
      await AsyncStorage.setItem('profilePictureUri', '../assets/bank_logo.png');
    }
  } catch (error) {
    Alert.alert('Image picker Error', error.message || 'Please select the image');
    // console.error('Image picker error:', error);
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNmNTEyZTA0YjViNzAxNjRhYzMwMmMiLCJpYXQiOjE3MDg0OTk4ODEsImV4cCI6MTcwODUwMzQ4MX0.RxjSEjtpkvRx1tn-uLoZey7_6-DMrZja9ivQjjnsWTU'; // Hardcoded token

        const token = await AsyncStorage.getItem('token');
        const balanceResponse = await axios.get('https://financeapp-ejy2.onrender.com/api/bank/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(balanceResponse.data.balance);

        const users = await axios.get('https://financeapp-ejy2.onrender.com/api/bank/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(users.data.usernames);

        const transactionsResponse = await axios.get('https://financeapp-ejy2.onrender.com/api/bank/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(transactionsResponse.data.transactions);

        AsyncStorage.removeItem('profilePictureUri');
      } catch (error) {
        console.error(error);
      }
    };

    if (isFocused) {
      fetchData();
    }
    // Fetch data every time the screen gains focus
  // const unsubscribe = navigation.addListener('focus', () => {
  //   fetchData();
  // });

  // return unsubscribe;
}, [isFocused]); // Ensure to include navigation in the dependency array

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity style={styles.transactionCard}>
      <Text style={styles.transactionText}>Amount: {item.amount}</Text>
      <Text style={styles.transactionText}>Date: {new Date(item.timestamp).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.contentContainer}
  showsVerticalScrollIndicator={true}
>
<View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.profilePictureBorder}>
            <Image
              source={profilePictureUri ? { uri: profilePictureUri } : require('../assets/bank_logo.png')}
              style={styles.profilePicture}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Card containerStyle={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Account Balance</Text>
        <Text style={styles.balanceAmount}>₹{balance}</Text>
      </Card>

      <View style={styles.cardsContainer}>
        <Card containerStyle={styles.userCard}>
          <Text style={styles.userCardTitle}>User</Text>
          <Text style={styles.userCardValue}>{username}</Text>
        </Card>

        <View style={styles.transactionsList}>
  <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
    <Card containerStyle={styles.transactionListCard}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={renderTransactionItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Card>
  </TouchableOpacity>
</View>
      </View>

      <Button
        title="Go to Transfer Amount"
        onPress={() => navigation.navigate('Transfer')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flexGrow: 1,
  },
  balanceCard: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5, // Add elevation for shadow on Android
  },
  balanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  userCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
    backgroundColor: '#fff',
  },
  userCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  transactionsList: {
    flexGrow: 1,
  },
  transactionListCard: {
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    backgroundColor: '#fff',
  },
  transactionCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: 200,
    elevation: 5,
    backgroundColor: '#fff',
  },
  transactionText: {
    fontSize: 14,
    marginBottom: 5,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePictureBorder: {
    borderWidth: 3,  // Adjust the border width as needed
    borderColor: '#25D366',  // WhatsApp's green color
    borderRadius: 60,  // Half of the width and height to make it circular
    overflow: 'hidden',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});

export default MyPofile;
