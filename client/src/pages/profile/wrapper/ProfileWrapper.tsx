import { useAppSelector } from "../../../shared/hooks/redux";
import { FC, ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StudentProfile } from "../student";
import { TeacherProfile } from "../teacher";
import UserService from "../../../entities/user/service/UserService.ts";
import { ErrorPage } from "../../error";
import { OtherStudentProfile } from "../otherStudent";
import { OtherTeacherProfile } from "../otherTeacher";

export async function ProfileWrapper(): Promise<ReactElement<FC>> {
    const { user, isAuth, isLoading, error } = useAppSelector(
        (state) => state.userReducer
    );
    const params = useParams<{ id: string }>();

    if (isLoading) {
        return <div>loading...</div>;
    }

    const returnProfile = (): ReactElement<FC> => {
        if (user.role === "student") {
            return <StudentProfile />;
        } else if (user.role === "teacher") {
            return <TeacherProfile />;
        }
        return <ErrorPage />;
    };

    const returnOtherProfile = (role: string): ReactElement<FC> => {
        if (role === "student") {
            return <OtherStudentProfile />;
        } else if (role === "teacher") {
            return <OtherTeacherProfile />;
        }
        return <ErrorPage />;
    };

    if (user.id === params.id) {
        if (isAuth) {
            return returnProfile();
        }
    } else {
        if (!params.id) {
            if (isAuth) {
                return returnProfile();
            }
        } else {
            try {
                const response = await UserService.getUserById(params.id);
                return returnOtherProfile(response.data?.getUserById.role as string);
            } catch (e: any) {
                console.log(e.message);
            }
        }
    }

    return <div>Default JSX if no conditions match</div>;
}
