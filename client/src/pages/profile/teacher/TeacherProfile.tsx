import { useAppSelector } from "../../../shared/hooks/redux";
// TODO: make persistent , fix date undefined
export function TeacherProfile() {
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
