import {Outlet} from "react-router-dom";
import {theme} from "../../app/providers";
import {ThemeProvider} from "@mui/material";
import {OstudNavbar} from "../../shared";

export function NavigationWrapper() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <OstudNavbar/>
                <Outlet/>
            </ThemeProvider>
        </div>
    )
}