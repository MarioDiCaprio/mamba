import {useSelector} from "react-redux";
import {RootState} from "../redux/store";


export default function useAuthCredentials() {
    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return null;
    }

    let usernameAndPasswordAsBase64 = token.split(' ')[1];
    let usernameAndPassword = Buffer.from(usernameAndPasswordAsBase64, 'base64').toString();
    let [username, password] = usernameAndPassword.split(':');

    return { username, password };
}
