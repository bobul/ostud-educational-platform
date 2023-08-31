import { userCheckAuth } from "../../entities/user/store/reducers/actionCreators.ts";
import { useAppDispatch } from "../hooks/redux";
import { useEffect } from "react";

export const withCheckAuth = (Component: React.ComponentType<any>) => (props: any) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log('token');
            dispatch(userCheckAuth());
        }
    }, [dispatch]);

    return <Component {...props} />;
};
