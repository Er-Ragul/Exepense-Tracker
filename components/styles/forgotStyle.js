import { StyleSheet } from "react-native";

export const forgotStyle = StyleSheet.create({
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