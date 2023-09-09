import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks/redux";
import {useEffect} from "react";
import {getUserById} from "../../../entities/user/store/reducers/actionCreators.ts";
import {ErrorPage} from "../../error";
import {StudentProfile} from "../student";
import {TeacherProfile} from "../teacher";
import {OtherStudentProfile} from "../otherStudent";
import {OtherTeacherProfile} from "../otherTeacher";
export function ProfileWrapper() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAuth, isLoading, error } = useAppSelector((state) => state.userReducer);
    const { otherUser, isOtherLoading, otherError } = useAppSelector((state) => state.otherUserReducer);

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id));
        }
        else if (!isAuth) {
            navigate('/sign-in')
        }
        console.log(isAuth);
    }, [dispatch, id]);

    if (isLoading || isOtherLoading) {
        return <div>Loading...</div>
    }
    else if (error || otherError) {
        return <ErrorPage errorMessage={error || otherError}/>
    }
    else if ((isAuth && !id) || (isAuth && user.id === id)) {
        if (user.role === 'student') {
            return <StudentProfile user={user} error={error} isLoading={isLoading} isAuth={isAuth}/>
        } else if (user.role === 'teacher') {
            return <TeacherProfile user={user} error={error} isLoading={isLoading} isAuth={isAuth}/>
        }
    }

    else if (id && (user.id !== id)) {
        if (otherUser.role === 'student') {
            return <OtherStudentProfile otherUser={otherUser} otherError={otherError} isOtherLoading={isOtherLoading}/>
        } else if (otherUser.role === 'teacher') {
            return <OtherTeacherProfile otherUser={otherUser} otherError={otherError} isOtherLoading={isOtherLoading}/>
        }
    }

    return null;
}
