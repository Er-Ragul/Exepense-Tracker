import { StyleSheet } from "react-native";

export const resetStyle = StyleSheet.create({
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