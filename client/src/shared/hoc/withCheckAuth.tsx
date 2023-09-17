import { userCheckAuth } from "../../entities";
import { useAppDispatch } from "../hooks";
import {useEffect, useState} from "react";

export const withCheckAuth = (Component: React.ComponentType<any>) => (props: any) => {
    const dispatch = useAppDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log('token');
            dispatch(userCheckAuth())
                .then(() => {
                    setAuthChecked(true);
                })
                .catch((error) => {
                    console.error('Error checking authentication:', error);
                    setAuthChecked(true);
                });
        } else {
            setAuthChecked(true);
        }
    }, [dispatch]);

    return authChecked ? <Component {...props} /> : null;
};
