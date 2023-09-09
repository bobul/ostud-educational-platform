import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "../../entities/user/store/reducers/userSlice"
import otherUserReducer from "../../entities/user/store/reducers/otherUserSlice"

const rootReducer = combineReducers({
    userReducer,
    otherUserReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']