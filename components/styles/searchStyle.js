import { StyleSheet } from "react-native";

export const searchStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    menu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 20
    },
    menuButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputBox: {
        padding: 6,
        borderWidth: 1,
        borderColor: 'rgba(78, 116, 289, 1)',
        borderRadius: 12
    },
    groupList: {
        height: '100%',
    },
    listView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 12,
    },
    calendarModal: {
        flex: 1,
        flexDirection: 'column'
      },
    calendarClose: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})