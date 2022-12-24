import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SERVER_URL} from "../../variables";
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "../store";
import {UserBasicDataResponse, UserResponse} from "../models/user";
import {SearchUsersResponse} from "../models/search";


export const mambaApi = createApi({
    reducerPath: 'mambaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        prepareHeaders: (headers, api) => {
            // authorization token
            const jwtToken = (api.getState() as RootState).auth.token;
            if (jwtToken) {
                headers.set('Authorization', `Basic ${jwtToken}`);
            }
            // finalize
            return headers;
        },
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: builder => ({

        login: builder.mutation<void, { username: string | null, password: string | null }>({
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

        userByUsername: builder.query<UserResponse, string | null>({
            query: username => ({
                url: '/user/byUsername',
                params: { username },
                method: 'GET'
            })
        }),

        userBasicData: builder.query<UserBasicDataResponse, string | null>({
            query: userId => ({
                url: '/user/basicData',
                params: { userId },
                method: 'GET'
            })
        }),

        searchUsers: builder.query<SearchUsersResponse, string | null>({
            query: term => ({
                url: '/search/users',
                params: { term },
                method: 'GET'
            })
        }),

    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useUserByUsernameQuery,
    useUserBasicDataQuery,
    useSearchUsersQuery
} = mambaApi;
