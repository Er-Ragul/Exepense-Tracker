import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';
import { Input, Icon } from '@rneui/themed';

export default function Reset({ navigation }) {

  let [visibility, setVisibility] = useState('eye-off')
  let [secured, setSecured] = useState(true)

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

  return (
    <KeyboardAwareScrollView>
    <View style={resetStyle.resetContainer}>
      <View style={resetStyle.animationContainer}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../../assets/lottie/reset.json')}
        />
      </View>
      <View style={resetStyle.textContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 32, marginLeft: 10, color: 'rgba(78, 116, 289, 1)'}}>Reset Password</Text>
      </View>
      <View style={resetStyle.inputBoxContainer}>
        <Input
          placeholder="Password"
          leftIcon={{ type: 'ionicon', name: 'key', color: '#c6c6c6' }}
          secureTextEntry={secured}
        />
        <Icon 
          type='ionicon'
          name={visibility}
          color='#c6c6c6'
          containerStyle={{
            position: 'absolute',
            right: 12,
            top: 13,
            color: '#c6c6c6'
          }}
          onPress={visibilitySetter}
        />
        <Input
          placeholder="Confirm Password"
          leftIcon={{ type: 'ionicon', name: 'key', color: '#c6c6c6' }}
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
      <View style={resetStyle.buttonContainer}>
        <TouchableOpacity style={resetStyle.setPasswordButton} onPress={() => navigation.navigate('Login')}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>Set Password</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAwareScrollView>
  )
}

const resetStyle = StyleSheet.create({
  resetContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80
  },
  animationContainer: {
    flex: 1,
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
  setPasswordButton: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'rgba(78, 116, 289, 1)',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 8
  }
});