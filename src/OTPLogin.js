import React from 'react';
import firebase from '@react-native-firebase/app'
import { View, Button, TextInput, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import 'firebase/auth';
// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyB-tNq9gLmk_s7fIguRgQydzVEpD8biA44",
  authDomain: "fir-project-9b0c1.firebaseapp.com",
  projectId: "fir-project-9b0c1",
  storageBucket: "fir-project-9b0c1.appspot.com",
  messagingSenderId: "497886948589",
  appId: "1:497886948589:web:bc2bdd97d727ffdf7bf0e4",
  measurementId: "G-ZDEPCMZEFV"
};
firebase.initializeApp(firebaseConfig);

export default class OTPScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      verificationCode: '',
    };
    this.confirmationResult = null;
  }

  handlePhoneNumberChange = value => {
    this.setState({ phoneNumber: value });
  };

  handleVerificationCodeChange = value => {
    this.setState({ verificationCode: value });
  };

  handleSendOTP = async () => {
    const { phoneNumber } = this.state;

    try {
      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber);
      // Save the confirmation result to use for OTP verification
      this.confirmationResult = confirmationResult;
      Alert.alert('OTP Sent', 'Please check your phone for the OTP');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  handleVerifyOTP = async () => {
    const { verificationCode } = this.state;

    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.confirmationResult.verificationId,
        verificationCode,
      );
      await firebase.auth().signInWithCredential(credential);
      Alert.alert('OTP Verified', 'You are now logged in');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to verify OTP');
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <TextInput
          style={{
            marginBottom: 8,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          placeholder="Enter Phone Number"
          onChangeText={this.handlePhoneNumberChange}
        />
        <Button title="Send OTP" onPress={this.handleSendOTP} />
        <TextInput
          style={{
            marginTop: 16,
            marginBottom: 8,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          placeholder="Enter Verification Code"
          onChangeText={this.handleVerificationCodeChange}
        />
        <Button title="Verify OTP" onPress={this.handleVerifyOTP} />
      </View>
    );
  }
}
