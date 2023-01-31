import { StyleSheet } from "react-native";

export const productStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 120,
        marginHorizontal: 16,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12
    },
    inputBox: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12
    },
    listViewBox: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12
    },
    listView: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12
    }
})