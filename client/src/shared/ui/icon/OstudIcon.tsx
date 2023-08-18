import { Box, SxProps } from "@mui/material";
import {Link} from "react-router-dom"
import ostud from "../assets/ostud_logo.png";

interface OstudIconProps {
    sx?: SxProps;
}

export function OstudIcon({ sx }: OstudIconProps) {
    return (
        <Link to="/">
            <Box
                component="img"
                sx={{ height: 40, ...sx }}
                alt="Logo"
                src={ostud}
            />
        </Link>
    );
}
