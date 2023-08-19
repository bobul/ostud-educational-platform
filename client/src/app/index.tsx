import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./providers/react-router";


function App() {

    return (
        <RouterProvider router={router}/>
    )
}

export default App