import {useAppDispatch, useAppSelector} from "../../../shared/hooks/redux";
import {useEffect} from "react";
import {userCheckAuth} from "../../../entities/user/store/reducers/actionCreators.ts";

export function TeacherProfile() {
    const {user, isAuth, isLoading, error} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log('token')
            dispatch(userCheckAuth())
        }
    }, [])

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <h1>{error}</h1>}
            {isAuth && <div>Hello, {user.role}, {user.firstName} {user.lastName}, {user.email}, {user.password}</div>}
        </div>
    );
}
