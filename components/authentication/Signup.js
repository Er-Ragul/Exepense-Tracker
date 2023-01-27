import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';
import { Input, Icon } from '@rneui/themed';
import { account } from '../../secret/appwriteConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/storageSlice';
import axios from "axios";

export default function Signup({ navigation }) {

  let dispatch = useDispatch()

  let [visibility, setVisibility] = useState('eye-off')
  let [secured, setSecured] = useState(true)
  let [email, setEmail] = useState()
  let [mobile, setMobile] = useState()
  let [password, setPassword] = useState()

  let visibilitySetter = () => {
    if(visibility == 'eye-off'){
      setVisibility('eye')
      setSecured(false)
    }
    else {
      setVisibility('eye-off')
      setSecured(true)
    }
  }

  let signup = () => {
    try{
      if(email != undefined
        && email.includes('@')
        && mobile != undefined 
        && mobile.length == 10 
        && password != undefined
        && password.length > 7)
        {
          const promise = account.create(
            mobile,
            email,
            password
          );
          
          promise.then(function (response) {
            let Response = response.$id
            axios.post('http://34.67.184.14:3000/createdb', {
              id: mobile
            })
            .then(function (response) {
              storeData()
              dispatch(doLogin(Response))
            })
            .catch(function (error) {
                Alert.alert('Server Error', 'Please try again !', [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
            });
          }, function (error) {
            Alert.alert('Account Exist', 'User account already exist !', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ])
          })
        }
        else {
          Alert.alert('Details Requried', 'Please enter valid credentials !',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
    }
    catch(e){
      Alert.alert('Details Required', 'Please enter valid credentials !',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  }

  const storeData = async () => {
    try {
      let cred = {
        email: email,
        password: password
      }
      await AsyncStorage.setItem('@user_data', JSON.stringify(cred))
    } catch (e) {
      console.log('Local storage is not respoding');
    }
  }

  return (
    <KeyboardAwareScrollView>
    <View style={signupStyle.signupContainer}>
      <View style={signupStyle.animationContainer}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../../assets/lottie/signup.json')}
        />
      </View>
      <View style={signupStyle.titleContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 32, marginLeft: 10, color: 'rgba(78, 116, 289, 1)'}}>Sign Up</Text>
      </View>
      <View style={signupStyle.inputBoxContainer}>
        <Input
          placeholder="Email ID"
          leftIcon={{ type: 'ionicon', name: 'mail', color: '#c6c6c6' }}
          onChangeText={(mail) => setEmail(mail)}
        />
        <Input
          placeholder="Mobile No"
          leftIcon={{ type: 'ionicon', name: 'call', color: '#c6c6c6' }}
          onChangeText={(num) => setMobile(num)}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: 'ionicon', name: 'key', color: '#c6c6c6' }}
          secureTextEntry={secured}
          onChangeText={(pass) => setPassword(pass)}
        />
        <Icon 
          type='ionicon'
          name={visibility}
          color='#c6c6c6'
          containerStyle={{
            position: 'absolute',
            right: 12,
            bottom: 36,
            color: '#c6c6c6'
          }}
          onPress={visibilitySetter}
        />
      </View>
      <View style={signupStyle.buttonContainer}>
        <TouchableOpacity style={signupStyle.continueButton} onPress={signup}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={signupStyle.loginButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{fontWeight: 'bold', color: 'rgba(78, 116, 289, 1)'}}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}

const signupStyle = StyleSheet.create({
  signupContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },
  animationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4
  },
  continueButton: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'rgba(78, 116, 289, 1)',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 8,
    paddingHorizontal: 10
  },
  loginButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 14
  }
});