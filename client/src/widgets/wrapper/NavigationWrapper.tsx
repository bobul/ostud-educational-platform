import {Navbar} from "../../features/navigation/components";
import {Outlet} from "react-router-dom";
import theme from "../../app/providers/mui";
import {ThemeProvider} from "@mui/material/styles";

export function NavigationWrapper() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Navbar/>
            </ThemeProvider>
            <Outlet/>
        </div>
    )
}