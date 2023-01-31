import { StyleSheet } from "react-native";

export const documentStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    totalAmount: {
      width: '94%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    listView: {
      width: '94%',
      height: '50%',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      marginTop: 8
    },
    contentStyle: {
      width: '100%',
      height: 60,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#d1d1d1',
      marginTop: 14,
      paddingBottom: 14
    }
})