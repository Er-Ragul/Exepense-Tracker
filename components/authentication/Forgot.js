import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';
import { Input, Icon } from '@rneui/themed';
import { account } from '../../secret/appwriteConfig';

export default function Forgot({ navigation }) {

  let [email, setEmail] = useState('')

  let validate = () => {
    try{
      if(email.includes('@')){
        navigation.navigate('Reset')

        {/*
        const promise = account.createRecovery(email, 'http://192.168.0.213');

        promise.then(function (response) {
            console.log(response)
        }, function (error) {
            console.log(error)
        });
      */}
      }
      else {
        console.log('Enter valid email address');
      }
    }
    catch(e){
      console.log('Error');
    }
    setEmail('')
  }

  return (
    <KeyboardAwareScrollView>
    <View style={forgotStyle.forgotContainer}>
      <View style={forgotStyle.animationContainer}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../../assets/lottie/mobileno.json')}
        />
      </View>
      <View style={forgotStyle.textContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 32, marginLeft: 10, color: 'rgba(78, 116, 289, 1)'}}>Forgot Password?</Text>
        <Text style={{fontSize: 16, marginLeft: 10, color: '#c6c6c8', marginTop: 12}}>Please enter registered email address to reset</Text>
      </View>
      <View style={forgotStyle.inputBoxContainer}>
        <Input
          placeholder="Email"
          leftIcon={{ type: 'ionicon', name: 'mail', color: '#c6c6c6' }}
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
      </View>
      <View style={forgotStyle.buttonContainer}>
        <TouchableOpacity style={forgotStyle.otpButtonContainer} onPress={validate}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>VERIFY EMAIL</Text>
        </TouchableOpacity>
      </View>
      <View style={forgotStyle.loginTextContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{fontWeight: 'bold', color: 'rgba(78, 116, 289, 1)'}}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}

const forgotStyle = StyleSheet.create({
  forgotContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    width: '95%',
    alignItems: 'flex-start',
    marginVertical: 8
  },
  inputBoxContainer: {
    width: '95%',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  buttonContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 16
  },
  otpButtonContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'rgba(78, 116, 289, 1)',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 8
  },
  loginTextContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8
  }
});