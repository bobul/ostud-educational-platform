import {OtherUserState} from "../../../entities/user/store/reducers/otherUserSlice";

export function OtherStudentProfile({otherUser, otherError}: OtherUserState) {
    return (
        <div>
            {otherError && <h1>{otherError}</h1>}
            {<div>
                Hello
                other, {otherUser.role}, {otherUser.firstName} {otherUser.lastName}, {otherUser.email}
            </div>}
        </div>
    );
};