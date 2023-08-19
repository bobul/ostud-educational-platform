import {createBrowserRouter} from "react-router-dom";
import Welcome from "../../../pages/welcome/Welcome.tsx";
import {ErrorPage} from "../../../pages/error";
import {News} from "../../../pages/news";
import {Faq} from "../../../pages/faq";
import {NavigationWrapper} from "../../../widgets/wrapper";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <NavigationWrapper />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Welcome />
            },
            {
                path: "news",
                element: <News />
            },
            {
                path: "faq",
                element: <Faq />
            }
        ]
    }
])