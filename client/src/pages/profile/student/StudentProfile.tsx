import {UserState} from "../../../entities/user/store/reducers/userSlice";
import {ProfileCard} from "../../../widgets";

export function StudentProfile({user, isAuth, isLoading, error}: UserState) {
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <h1>{error}</h1>}
            {isAuth && <ProfileCard user={user}/>}
        </div>
    );
}
