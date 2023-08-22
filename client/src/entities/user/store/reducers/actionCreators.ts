import {AppDispatch} from "../../../../app/store";
import {userSlice} from "./userSlice";


// TODO: Implement this action creator
// TODO: remove (data: any) from parameter
export const fetchUserRegistration = (data: any) => async (dispatch: AppDispatch) => {

    try {
        dispatch(userSlice.actions.userFetchRegistrationPending)
        dispatch(userSlice.actions.userFetchRegistrationSuccess(data))
    }
    catch (e) {
        dispatch(userSlice.actions.userFetchRegistrationError(e.message))
    }
}