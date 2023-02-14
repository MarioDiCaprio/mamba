import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface ServerConnectionType {
    available: boolean;
    wasConnectionChecked: boolean;
}


let json;
if (typeof window !== "undefined") {
    json = window.sessionStorage.getItem('serverConnection');
}

let initialState: ServerConnectionType = { available: false, wasConnectionChecked: false };
if (json) {
    initialState = JSON.parse(json);
}


const serverConnectionSlice = createSlice({
    name: 'serverConnection',
    initialState,
    reducers: {

        serverConnectionSuccessful: (_state, value: PayloadAction<boolean>) => {
            const payload = { available: value.payload, wasConnectionChecked: true };
            if (typeof window !== "undefined") {
                let json = JSON.stringify(payload);
                window.sessionStorage.setItem('serverConnection', json);
            }
            return payload;
        }

    }
});


export default serverConnectionSlice;

export const { serverConnectionSuccessful } = serverConnectionSlice.actions;
