import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface AuthState {
    token: string | null;
}

interface AuthParams {
    username: string | null;
    password: string | null;
}


const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null } as AuthState,
    reducers: {

        setAuthToken: (_state, action: PayloadAction<AuthParams>) => {
            let { username, password } = action.payload;
            if (!username || !password) {
                return { token: null };
            }
            let base64 = Buffer.from(`${username}:${password}`).toString('base64');
            return { token: base64 };
        }

    }
});


export default authSlice;

export const { setAuthToken } = authSlice.actions;
