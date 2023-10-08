import { UserState } from "../../../entities/user/store/reducers/userSlice";
import { ClassPanel, NewsPanel, ProfileCard } from "../../../widgets";
import { ErrorPage } from "../../error";
import { Flex } from "@radix-ui/themes";

export function TeacherProfile({user, isAuth, error}: UserState) {
    if (error) {
        return <ErrorPage errorMessage={error}/>
    }
    if (isAuth) {
        return (
            <Flex style={{justifyContent: "space-around"}}>
                <Flex style={{flexDirection: "column"}}>
                    <ClassPanel/>
                    <NewsPanel/>
                </Flex>
                <ProfileCard user={user}/>
            </Flex>
        )
    }
    return null;
}
