import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./providers/react-router";
import {withStore} from "./providers/redux/withStore";
import {withCheckAuth} from "../shared/hoc/withCheckAuth";
import {Theme} from "@radix-ui/themes";


function App() {

    return (
        <Theme>
            <RouterProvider router={router}/>
        </Theme>
    )
}

export default withStore(withCheckAuth(App))