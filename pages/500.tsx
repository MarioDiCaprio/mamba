import {NextPage} from "next";
import Error from "./_error";


const Error500: NextPage = () => {
    return (
        <Error statusCode={500} />
    );
}


export default Error500;
