import { useUserByUsernameQuery } from "../redux/api/mambaApi";
import useAuthCredentials from "./useAuthCredentials";


export default function useClient() {
    const credentials = useAuthCredentials();
    return useUserByUsernameQuery(credentials? credentials.username : null);
}
