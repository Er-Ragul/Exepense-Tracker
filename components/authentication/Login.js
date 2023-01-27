import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';
import { Input, Icon } from '@rneui/themed';
import { account } from '../../secret/appwriteConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/storageSlice';
import { loginStyle } from '../styles/loginStyle';

export default function Login({ navigation }) {

  let dispatch = useDispatch()

  let [visibility, setVisibility] = useState('eye-off')
  let [secured, setSecured] = useState(true)
  let [email, setEmail] = useState()
  let [password, setPassword] = useState()

  useEffect(() => {
    readData()
  }, [])

  const readData = async() => {
    try {
      const value = await AsyncStorage.getItem('@user_data')
      if(value !== null) {
        let data = JSON.parse(value)

        const promise = account.createEmailSession(
          data.email,
          data.password
        );

        promise.then(function (response) {
            dispatch(doLogin(response.userId))
        }, function (error) {
          Alert.alert('Login Failed', 'Auto login failed. Please try manually !', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ])
        });
      }
    } catch(e) {
      console.log('Local storage is not responding');
    }
  }

  const storeData = async () => {
    console.log('Data stored');
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

  let login = () =>{
    try {
      if(email.includes('@') && password.length > 7){
        const promise = account.createEmailSession(
          email,
          password
        );
  
        promise.then(function (response) {
            storeData()
            dispatch(doLogin(response.userId))
        }, function (error) {
            console.log(error);
          Alert.alert('Login Failed', 'Invalid username or password !', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ])
        });
      }
      else{
        Alert.alert('Error', 'Please enter valid credentials !', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    catch(e) {
      console.log('Catch Error');
      Alert.alert('Server Error !', 'Please try again !', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ])
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={loginStyle.loginContainer}>
      <View style={loginStyle.animationContainer}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../../assets/lottie/login.json')}
        />
      </View>
      <View style={loginStyle.textContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 32, marginLeft: 10, color: 'rgba(78, 116, 289, 1)'}}>Login</Text>
      </View>
      <View style={loginStyle.inputBoxContainer}>
        <Input
          placeholder="Email ID"
          leftIcon={{ type: 'ionicon', name: 'mail', color: '#c6c6c6' }}
          onChangeText={(mail) => setEmail(mail)}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: 'ionicon', name: 'key', color: '#c6c6c6' }}
          onChangeText={(pass) => setPassword(pass)}
          secureTextEntry={secured}
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
      <View style={loginStyle.forgotTextContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
        <Text style={{fontWeight: 'bold', color: 'rgba(78, 116, 289, 1)'}}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={loginStyle.buttonContainer}>
        <TouchableOpacity style={loginStyle.loginButtonOne}
        onPress={login}>
          <Image source={require('../../assets/icons/key.png')} style={{width: 30, height: 30}}/>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16, marginLeft: 8}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={loginStyle.loginButtonTwo}>
        <Image source={require('../../assets/icons/google.png')} style={{width: 30, height: 30}}/>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 8}}>Login with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={loginStyle.signupTextContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{fontWeight: 'bold', color: 'rgba(78, 116, 289, 1)'}}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}