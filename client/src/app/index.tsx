import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./providers/react-router";
import {withStore} from "./providers/redux/withStore";
import {withCheckAuth} from "../shared/hoc/withCheckAuth";


function App() {

    return (
        <RouterProvider router={router}/>
    )
}

export default withStore(withCheckAuth(App))