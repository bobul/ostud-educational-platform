import {useAppSelector} from "../../../shared/hooks/redux";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

export function TeacherProfile() {
    const {user, isAuth, isLoading, error} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();
    const {teacherId: otherTeacherId} = useParams();


    useEffect(() => {
        console.log(otherTeacherId);
    }, [])

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <h1>{error}</h1>}
            {isAuth && <div>Hello, {user.role}, {user.firstName} {user.lastName}, {user.email}, {user.password}</div>}
        </div>
    );
}
