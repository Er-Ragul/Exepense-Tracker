import { StyleSheet } from "react-native";

export const addStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      marginTop: 30
    },
    totalAmount: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    comment: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 18
    },
    saveEntry: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#f8f7f7',
      borderTopColor: '#f8f7f7'
    },
    spentChip: {
      width: 100,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    categoryButton: {
      width: 80,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
  
    },
    saveButton: {
      width: 80,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: 'rgba(78, 116, 289, 1)',
      borderRadius: 10
    },
    numPad: {
      display: 'flex',
      flex: 4,
      justifyContent: 'space-around',
    },
    numPadRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    modalView: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    headingTab: {
      width: '100%',
      height: '12%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: 'rgba(78, 116, 289, 1)',
      backgroundColor: 'rgba(78, 116, 289, 1)',
      padding: 8,
      elevation: 4
    },
    categoryList: {
      height: '64%',
      width: '100%',
      backgroundColor: 'white'
    },
    listView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: 8,
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#d1d1d1'
    },
    calendarView: {
      flex: 1,
      flexDirection: 'column'
    },
    calendarClose: {
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center'
    }
})