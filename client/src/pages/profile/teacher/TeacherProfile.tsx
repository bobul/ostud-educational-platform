import {UserState} from "../../../entities/user/store/reducers/userSlice";
import {ClassPanel, CoursePanel, ProfileCard} from "../../../widgets";
import {ErrorPage} from "../../error";
import {Flex, Box} from "@radix-ui/themes";

export function TeacherProfile({user, isAuth, error}: UserState) {
    if (error) {
        return <ErrorPage errorMessage={error}/>
    }
    if (isAuth) {
        return (
            <Flex style={{justifyContent: "space-around"}}>
                <Flex style={{flexDirection: "column"}}>
                    <CoursePanel/>
                    <ClassPanel/>
                </Flex>
                <ProfileCard user={user}/>
            </Flex>
        )
    }
    return null;
}
