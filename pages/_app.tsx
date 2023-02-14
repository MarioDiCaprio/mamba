import '../styles/globals.sass'
import type { AppProps } from 'next/app';
import Head from "next/head";
import {useRouter} from "next/router";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {useServerConnectionCheck} from "../hooks/useServerConnectionCheck";
import LoaderOnStart from "../components/LoaderOnStart/LoaderOnStart";


const Wrapper: React.FC<AppProps> = ({ Component, pageProps }) => {
    const serverCheckStatus = useServerConnectionCheck();
    const router = useRouter();

    const isHttpError = ['/_error', '/500'].includes(router.pathname);

    if (serverCheckStatus === 'successful' || isHttpError) {
        return (
            <Component {...pageProps} />
        );
    }

    if (serverCheckStatus === 'unreachable') {
        router.push('/500');
    }

    return (
        <>
            <Head>
                <title>Mamba</title>
            </Head>
            <LoaderOnStart />
        </>
    );
}


export default function App(props: AppProps) {
    return (
        <Provider store={store}>
            <Wrapper {...props} />
        </Provider>

    );
}
