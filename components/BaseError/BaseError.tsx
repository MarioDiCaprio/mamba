import styles from "./BaseError.module.sass";
import React from "react";
import Head from "next/head";


interface BaseErrorProps {
    status: number | string;
    message?: string;
}


const BaseError: React.FC<BaseErrorProps> = ({ status, message }) => {
    return (
        <div className={styles.context}>

            <Head>
                <title>Mamba | Error { status }</title>
            </Head>

            <img className={styles.logo} src="/logo/logo-full.png" alt="" />

            <p className={styles.status}>
                Error: { status }
            </p>

            <p className={styles.message}>
                { message }
            </p>

        </div>
    );
}


export default BaseError;
