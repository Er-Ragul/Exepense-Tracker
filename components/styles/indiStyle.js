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
    heading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    list: {
        flex: 8
    },
    contentStyle: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d1',
        marginTop: 14,
        paddingBottom: 14
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonStyle: {
        backgroundColor: 'rgba(78, 116, 289, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 6
    }
})