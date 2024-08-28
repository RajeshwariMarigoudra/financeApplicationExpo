import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
   
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const transactionsResponse = await axios.get('https://financeapp-ejy2.onrender.com/api/bank/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(transactionsResponse.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  
  const renderTransactionItem = (item) => (
    <View style={styles.transactionCard} key={item._id}>
      <Text style={styles.transactionText}>username: {item.recipientUsername}</Text>
      <Text style={styles.transactionText}>Amount: ₹{item.amount}</Text>
      <Text style={styles.transactionText}>Date: {item.timestamp}</Text>
      <Text style={styles.transactionText}>paymentMethod: {item.paymentMethod}</Text>
    </View>
  );

  const handlePrint = async () => {
    try {
      const htmlContent = `
        <html>
          <head>
            
            <style>
            body {
             font-family: 'Arial, sans-serif';
             margin: 0;
                }
                h1 {
                  margin-top: 20px; /* Add space at the top of the page */
                  text-align: center;
                }
             .transaction-card {
              background-color: #fff;
              border-radius: 10px;
              padding: 15px;
              margin-bottom: 15px;
               margin-top: 250px;
               margin-left: 20px;
               page-break-before: always; /* Ensure a new page for each transaction */
              text-align: center;
              }
             .transaction-text {
              font-size: 24px; /* Adjust font size as needed */
              margin-bottom: 10px; /* Adjust margin as needed */
              }
               </style>

          </head>
          <body>
            <h1>Transactions Report</h1>
            ${transactions.map(
              (transaction) => `
              <div class="transaction-card">
                <p class="transaction-text">Recipient Username: ${transaction.recipientUsername}</p>
                <p class="transaction-text">Amount: $${transaction.amount}</p>
                <p class="transaction-text">Date: ${transaction.timestamp}</p>
                <p class="transaction-text">Payment Method: ${transaction.paymentMethod}</p>
              </div>
            `
            ).join('')}
          </body>
        </html>
      `;
  
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
  
      // Share the generated PDF
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error generating PDF:', error.message);
    }
  };
  

  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions Screen</Text>
      <View style={styles.transactionsList}>
        <ScrollView  style={styles.scrollContainer}>
          {transactions.length > 0 ? (
            transactions.map(renderTransactionItem)
          ) : (
            <Text>No transactions available</Text>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
        <Text style={styles.buttonText}>Generate PDF</Text>
      </TouchableOpacity>
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
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transactionsList: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  transactionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  printButton: {
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

export default TransactionsScreen;
