import { createSlice } from '@reduxjs/toolkit'

export const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        login: false,
        uid: null,
        search: false,
    },
    reducers: {
        doLogin: (state, action) => {
            state.login = true
            state.uid = action.payload
            console.log('UID inside : ' + action.payload);
        },
        callSearchWindow: (state, action) => {
            state.search = action.payload
            console.log('Search Window Call : ' + action.payload)
        }
    }
})

export const { doLogin, productUpdaterFunction, callSearchWindow } = storageSlice.actions
export default storageSlice.reducer

/**
 * Id : '5OtTRxJWDgY1dhqvfy5ixJigaO53'
 * 
 */