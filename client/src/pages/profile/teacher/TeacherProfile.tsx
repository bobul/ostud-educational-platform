import {UserState} from "../../../entities/user/store/reducers/userSlice";
import {ProfileCard} from "../../../widgets";

export function TeacherProfile({user, isAuth, error}: UserState) {
    return (
        <div>
            {error && <h1>{error}</h1>}
            {isAuth && <ProfileCard user={user}/>}
        </div>
    );
}
