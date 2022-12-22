import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SERVER_URL} from "../../variables";
import {HYDRATE} from "next-redux-wrapper";


export const mambaApi = createApi({
    reducerPath: 'mambaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: builder => ({

        login: builder.mutation<void, { username: string, password: string }>({
            query: args => ({
                url: '/login',
                params: args,
                method: 'POST'
            })
        }),

        signup: builder.mutation<void, { username: string, email: string, password: string }>({
            query: args => ({
                url: '/register',
                body: args,
                method: 'POST'
            })
        }),

    }),
});

export const { useLoginMutation, useSignupMutation } = mambaApi;
