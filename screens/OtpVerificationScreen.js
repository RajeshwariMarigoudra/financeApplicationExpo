
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'expo-firebase-auth';

const OtpVerificationScreen = () => {
  const [phonenumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [code, setCode] = useState('');
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  const auth = getAuth();

  const handleSendOtp = async () => {
    try {
      const phoneProvider = new auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phonenumber,
        recaptchaVerifier
      );
      setVerificationId(verificationId);
      setPhoneNumber('');
      Alert.alert('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      await signInWithPhoneNumber(auth, credential);
      Alert.alert('Login successful. Welcome to the dashboard!');
      navigation.navigate('Dashboard');
      // Navigate to the dashboard or the desired screen
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      Alert.alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Phone Number"
        value={phonenumber}
        onChangeText={(text) => setPhoneNumber(text)}
        style={styles.input}
      />
      <RecaptchaVerifier
        ref={(ref) => setRecaptchaVerifier(ref)}
        firebaseConfig={firebaseConfig}
      />
      <Button title="Send OTP" onPress={handleSendOtp} />
      <TextInput
        placeholder="OTP"
        value={code}
        onChangeText={(text) => setCode(text)}
        style={styles.input}
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
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
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default OtpVerificationScreen;
