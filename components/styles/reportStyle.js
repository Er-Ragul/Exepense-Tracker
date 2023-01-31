import { StyleSheet } from "react-native";

export const reportStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      marginTop: 30
    },
    totalAmount: {
      flex: 1,
      alignItems: 'flex-start',
      marginHorizontal: 10
    },
    barGrap: {
      flex: 1.4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    barBox: {
      position: 'relative',
      width: 30,
      height: 140,
      justifyContent: 'flex-end',
      backgroundColor: '#f1f0f0',
      borderRadius: 4,
      alignItems: 'center'
    },
    barFill: {
      width: '100%',
      height: '0%',
      backgroundColor: 'rgba(78, 116, 289, 1)',
      borderRadius: 4,
    },
    filterBar: {
      flex: 0.5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#f8f7f7',
      borderTopColor: '#f8f7f7',
    },
    filterButton: {
      width: 80,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginHorizontal: 8,
      color:'#acabab'
    },
    listView: {
      flex: 2,
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