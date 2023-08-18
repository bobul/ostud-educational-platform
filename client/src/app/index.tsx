import './index.css'
import {ThemeProvider} from '@mui/material/styles';
import {Navbar} from "../shared/ui/nav";
import theme from "./providers/mui"
import {News} from "../pages/news";
import {Faq} from "../pages/faq";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Welcome} from "../pages/welcome";

function App() {

    return (
        <BrowserRouter>
            <div>
                <ThemeProvider theme={theme}>
                    <Navbar/>
                </ThemeProvider>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/news'
                           element={<News/>}/>
                    <Route path='/faq'
                           element={<Faq/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App