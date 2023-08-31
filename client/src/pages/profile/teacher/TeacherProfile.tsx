import {useAppSelector} from "../../../shared/hooks/redux";

export function TeacherProfile() {
    const {user, isAuth, isLoading, error} = useAppSelector(state => state.userReducer);

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <h1>{error}</h1>}
            {isAuth && <div>Hello, {user.role}, {user.firstName} {user.lastName}, {user.email}, {user.password}</div>}
        </div>
    );
}
