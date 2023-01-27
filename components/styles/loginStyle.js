import { StyleSheet } from 'react-native';

export const loginStyle = StyleSheet.create({
    loginContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: 30
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
    forgotTextContainer: {
      width: '95%',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    buttonContainer: {
      width: '95%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginVertical: 16
    },
    loginButtonOne: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: 'rgba(78, 116, 289, 1)',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 12,
      marginVertical: 8
    },
    loginButtonTwo: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: '#e4e1e1',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 12,
      marginVertical: 8
    },
    signupTextContainer: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 8
    }
});