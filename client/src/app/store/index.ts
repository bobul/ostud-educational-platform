import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "../../entities/user/store/reducers/userSlice"
import otherUserReducer from "../../entities/user/store/reducers/otherUserSlice"
import classesReducer from "../../entities/teacher/store/reducers/classesSlice"
import coursesReducer from "../../entities/teacher/store/reducers/coursesSlice"
import newsReducer from "../../entities/news/store/reducers/newsSlice"

const rootReducer = combineReducers({
    userReducer,
    otherUserReducer,
    classesReducer,
    coursesReducer,
    newsReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']