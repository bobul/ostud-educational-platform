import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./providers/react-router";
import {withStore} from "./providers/redux/withStore";


function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default withStore(App)