import {useAppSelector} from "../../../shared/hooks/redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function StudentProfile() {
    const {user, isAuth, isLoading, error} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <h1>{error}</h1>}
            {isAuth && <div>Hello, {user.role}, {user.firstName} {user.lastName}, {user.email}, {user.password}</div>}
        </div>
    );
}
