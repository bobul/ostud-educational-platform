import {createBrowserRouter} from "react-router-dom";
import {ErrorPage, News, Faq, RegistrationPage, LoginPage, ProfileWrapper, Welcome, ClassPage} from "../../../pages";
import {NavigationWrapper} from "../../../widgets";

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
                element: <ProfileWrapper />,

            },
            {
                path: "classes/:classId?",
                element: <ClassPage />,
            },
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