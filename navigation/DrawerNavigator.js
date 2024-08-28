// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BalanceScreen from '../screens/BalanceScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import TransferScreen from '../screens/TransferScreen';
import UsersScreen from '../screens/UsersScreen';
import Dashboard from '../screens/Dashboard';
import LogoutScreen from '../screens/LogoutScreen';
import MyPofile from '../screens/MyPofile';
import ContactDetailsScreen from '../screens/ContactDetailsScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Dashboards" component={Dashboard} />
      {/* <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} /> */}
      <Drawer.Screen name="MyPofile" component={MyPofile} />
      <Drawer.Screen name="Balance" component={BalanceScreen} />
      <Drawer.Screen name="Transfer" component={TransferScreen} />
      <Drawer.Screen name="Transactions" component={TransactionsScreen} />
      <Drawer.Screen name="UsersScreen" component={UsersScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
      <Drawer.Screen name="ContactDetails" component={ContactDetailsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
