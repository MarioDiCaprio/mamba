import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Cookies from "universal-cookie";


const cookies = new Cookies();


interface AuthState {
    username: string | null;
    token: string | null;
}


let initialState: AuthState = cookies.get('auth');
if (!initialState) {
    initialState = { token: null, username: null }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setAuthToken: (_state, action: PayloadAction<AuthState>) => {
            cookies.set('auth', action.payload, { sameSite: 'strict' })
            return action.payload;
        }

    }
});


export default authSlice;

export const { setAuthToken } = authSlice.actions;
