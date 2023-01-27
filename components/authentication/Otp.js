import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { Input, Icon } from '@rneui/themed';

export default function Otp({ navigation }) {

  return (
    <View style={otpStyle.otpContainer}>
      <View style={otpStyle.animationContainer}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../../assets/lottie/otp.json')}
        />
      </View>
      <View style={otpStyle.textContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 32, marginLeft: 10, color: 'rgba(78, 116, 289, 1)'}}>Enter OTP</Text>
        <Text style={{fontSize: 16, marginLeft: 10, color: '#c6c6c8', marginTop: 12}}>Please enter OTP sent to your mobile number</Text>
      </View>
      <View style={otpStyle.inputBoxContainer}>
        <Input
          placeholder="OTP"
          leftIcon={{ type: 'ionicon', name: 'chatbox-ellipses', color: '#c6c6c6' }}
        />
      </View>
      <View style={otpStyle.buttonContainer}>
        <TouchableOpacity style={otpStyle.resetButton} onPress={() => navigation.navigate('Reset')}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>Reset Password</Text>
        </TouchableOpacity>
      </View>
      <View style={otpStyle.loginTextContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{fontWeight: 'bold', color: 'rgba(78, 116, 289, 1)'}}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const otpStyle = StyleSheet.create({
  otpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    alignItems: 'flex-start',
    width: 360,
    marginVertical: 8
  },
  inputBoxContainer: {
    alignItems: 'flex-start',
    width: 360,
    marginVertical: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 360,
    marginVertical: 4
  },
  resetButton: {
    flexDirection: 'row',
    width: 360,
    height: 50,
    backgroundColor: 'rgba(78, 116, 289, 1)',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 8,
    paddingHorizontal: 10
  },
  loginTextContainer: {
    alignItems: 'center',
    width: 360,
    marginVertical: 14
  }
});