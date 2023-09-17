import {useNavigate, useParams} from "react-router-dom";
import {OstudLoader, useAppDispatch, useAppSelector} from "../../../shared";
import {useEffect} from "react";
import {getUserById} from "../../../entities";
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
        if (user.id !== id) {
            if (id) {
                dispatch(getUserById(id));
            }
        }
        if (!isAuth) {
            navigate('/sign-in')
        }
    }, [dispatch, id]);

    if (error || otherError) {
        return <ErrorPage errorMessage={error || otherError}/>
    }

    if (isLoading || isOtherLoading) {
        return <OstudLoader/>
    }

    else if ((isAuth && !id) || (isAuth && user.id === id)) {
        if (user.role === 'student') {
            return <StudentProfile user={user} error={error} isAuth={isAuth}/>
        } else if (user.role === 'teacher') {
            return <TeacherProfile user={user} error={error} isAuth={isAuth}/>
        }
    }
    else if ((user.id !== id) && id) {
            if (otherUser.role === 'student') {
                return <OtherStudentProfile otherUser={otherUser} otherError={otherError}/>
            } else if (otherUser.role === 'teacher') {
                return <OtherTeacherProfile otherUser={otherUser} otherError={otherError}/>
            }
    }
    return null;
}
