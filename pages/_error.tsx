import { NextPage, NextPageContext } from "next";
import BaseError from "../components/BaseError/BaseError";


function getErrorMessage(statusCode?: number): string | undefined {
    if (statusCode === 401) {
        return 'You do not have permission to access this content.'
    }
    if (statusCode === 404) {
        return 'The page you were looking for seems not to exist.';
    }
    if (statusCode === 500) {
        return 'The server seems not to be reachable. Please try again later.';
    }
}


interface ErrorProps {
    statusCode?: number
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
    return (
        <BaseError status={statusCode as number} message={getErrorMessage(statusCode)} />
    );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
