import {UserState} from "../../../entities/user/store/reducers/userSlice";

export function StudentProfile({user, isAuth, isLoading, error}: UserState) {
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <h1>{error}</h1>}
            {isAuth && <div>Hello, {user.role}, {user.firstName} {user.lastName}, {user.email}, {user.password}, status {`${user.isActivate}+`}</div>}
        </div>
    );
}
