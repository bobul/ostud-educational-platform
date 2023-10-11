import {createBrowserRouter} from "react-router-dom";
import {
    ErrorPage,
    News,
    Faq,
    RegistrationPage,
    LoginPage,
    ProfileWrapper,
    Welcome,
    ClassPage,
    CoursePage
} from "../../../pages";
import {NavigationWrapper} from "../../../widgets";
import { PieceOfNews } from "../../../shared";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <NavigationWrapper/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Welcome/>
            },
            {
                path: "news",
                element: <News/>
            },
            {
                path: "faq",
                element: <Faq/>
            },
            {
                path: "profile/:id?",
                element: <ProfileWrapper/>,

            },
            {
                path: "classes/:classId?",
                element: <ClassPage/>
            },
            {
                path: "courses/:courseId?",
                element: <CoursePage/>
            },
            {
                path: "news/:newsId?",
                element: <PieceOfNews/>
            }
        ],
    },
    {
        path: "/sign-up",
        element: <RegistrationPage/>,
    },
    {
        path: "/sign-in",
        element: <LoginPage/>,
    }
])