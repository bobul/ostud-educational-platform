import { useAppSelector } from "../../../shared/hooks/redux";

export function StudentProfile() {
    const { user, isAuth } = useAppSelector(state => state.userReducer);
    return (
        isAuth ? (
            <div>
                Hello, {user.role}, {user.firstName} {user.lastName}, {user.email}, {user.password}
            </div>
        ) : (
            <p>Unauthorized</p>
        )
    );
}