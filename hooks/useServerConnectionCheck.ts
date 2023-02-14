import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useEffect, useState} from "react";
import {SERVER_URL} from "../variables";
import {serverConnectionSuccessful} from "../redux/slices/serverConnectionSlice";


export function useServerConnectionCheck(minTimeMs?: number): "loading" | "unreachable" | "successful" {
    const dispatch = useDispatch();
    const { available, wasConnectionChecked } = useSelector((state: RootState) => state.serverCon);
    const [isTimerFinished, setIsTimerFinished] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setIsTimerFinished(true);
        }, minTimeMs ?? 4000);
    }, []);

    if (!wasConnectionChecked) {
        fetch(SERVER_URL, { mode: 'no-cors' })
            .then(() => {
                dispatch(serverConnectionSuccessful(true));
            })
            .catch(() => {
                dispatch(serverConnectionSuccessful(false));
            });
    }

    if (!isTimerFinished)
        return "loading";
    else if (!available)
        return "unreachable";
    else
        return "successful";
}
