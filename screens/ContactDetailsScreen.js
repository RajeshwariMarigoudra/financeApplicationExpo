import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from Expo

const ContactDetailsScreen = () => {
  const contactDetails = {
    name: 'Abcd ef',
    email: 'abcd@example.com',
    phoneNumber: '1234567890',
    financeInfo: {
      accountBalance: '₹5,000',
      creditScore: '750',
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Details</Text>
      <View style={styles.card}>
        <View style={styles.detailItem}>
          <FontAwesome name="user" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{contactDetails.name}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{contactDetails.email}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{contactDetails.phoneNumber}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="money" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Account Balance:</Text>
          <Text style={styles.value}>{contactDetails.financeInfo.accountBalance}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="credit-card" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Credit Score:</Text>
          <Text style={styles.value}>{contactDetails.financeInfo.creditScore}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent', // Transparent background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Darker title color
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#FFF', // White background color
    elevation: 5,
    padding: 20,
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555', // Darker label color
  },
  value: {
    fontSize: 18,
    color: '#333', // Slightly darker value color
  },
});

export default ContactDetailsScreen;
