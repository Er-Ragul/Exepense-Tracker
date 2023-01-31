import { StyleSheet } from "react-native";

export const signupStyle = StyleSheet.create({
    signupContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30
    },
    animationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4
    },
    continueButton: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: 'rgba(78, 116, 289, 1)',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 12,
        marginVertical: 8,
        paddingHorizontal: 10
    },
    loginButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 14
    }
})