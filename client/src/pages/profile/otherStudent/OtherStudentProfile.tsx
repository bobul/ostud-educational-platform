import {OtherUserState} from "../../../entities/user/store/reducers/otherUserSlice";

export function OtherStudentProfile({otherUser, isOtherLoading, otherError}: OtherUserState) {
    return (
        <div>
            {isOtherLoading && <div>Loading...</div>}
            {otherError && <h1>{otherError}</h1>}
            {<div>
                Hello
                other, {otherUser.role}, {otherUser.firstName} {otherUser.lastName}, {otherUser.email}, {otherUser.password}
            </div>}
        </div>
    );
};