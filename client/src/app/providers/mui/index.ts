import { createTheme } from '@mui/material/styles';

declare module "@mui/material/styles" {
    interface Palette {
        ostudYellowPrimary?: string;
        ostudGrayPrimary?: string;
        ostudGrayAlpha?: string;
    }
    interface PaletteOptions {
        ostudYellowPrimary?: string;
        ostudGrayPrimary?: string;
        ostudGrayAlpha?: string;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: 17,
    },
    palette: {
        ostudYellowPrimary: "#FFD422",
        ostudGrayPrimary: "#898890",
        ostudGrayAlpha: "rgba(137, 136, 144, 0.1)",
    }
});
