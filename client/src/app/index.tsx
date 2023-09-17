import './index.css'
import {RouterProvider} from "react-router-dom";
import {router, withStore} from "./providers";
import {Theme} from "@radix-ui/themes";
import {withCheckAuth} from "../shared";


function App() {

    return (
        <Theme>
            <RouterProvider router={router}/>
        </Theme>
    )
}

export default withStore(withCheckAuth(App))