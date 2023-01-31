import { StyleSheet } from "react-native";

export const indiStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: 'white'
    },
    total: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    table: {
        paddingHorizontal: 30,
    },
    heading: {
        backgroundColor: 'white',
    },
    list: {
        flex: 8
    },
    buttons: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: '24%',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
})