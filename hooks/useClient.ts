import { useUserByUsernameQuery } from "../redux/api/mambaApi";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";


export default function useClient() {
    const username = useSelector((state: RootState) => state.auth.username);
    return useUserByUsernameQuery(username);
}
