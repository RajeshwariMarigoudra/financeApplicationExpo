// navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import BalanceScreen from '../screens/BalanceScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import TransferScreen from '../screens/TransferScreen';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/MyPofile';
import AppNavigator from '../components/AppNavigator';
// import OtpVerificationScreen from '../screens/OtpVerificationScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="AppNavigator" component={AppNavigator} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} /> */}
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Balance" component={BalanceScreen} />
      <Stack.Screen name="Transfer" component={TransferScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
