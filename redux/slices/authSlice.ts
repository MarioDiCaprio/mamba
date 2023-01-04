import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface AuthState {
    username: string | null;
    token: string | null;
}


const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, username: null } as AuthState,
    reducers: {

        setAuthToken: (_state, action: PayloadAction<AuthState>) => {
            return action.payload;
        }

    }
});


export default authSlice;

export const { setAuthToken } = authSlice.actions;
