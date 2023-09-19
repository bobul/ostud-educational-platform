import React from "react";
import { FallingLines } from "react-loader-spinner";
import {useTheme} from "@mui/material";

const ostudLoaderStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh"
};

export function OstudLoader() {
    const theme = useTheme();

    return (
        <div aria-label="falling-lines-loading" style={ostudLoaderStyles}>
            <FallingLines color={theme.palette.ostudYellowPrimary} width="100" visible={true} />
        </div>
    );
}
