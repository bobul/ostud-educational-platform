import { createTheme } from '@mui/material/styles';

declare module "@mui/material/styles" {
    interface Palette {
        ostudYellowPrimary?: string;
        ostudGrayPrimary?: string;
        ostudGrayAlpha?: string;
        ostudGraySecondary?: string;
    }
    interface PaletteOptions {
        ostudYellowPrimary?: string;
        ostudGrayPrimary?: string;
        ostudGrayAlpha?: string;
        ostudGraySecondary?: string;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: 17,
        h1: {
            fontFamily: 'Grotesk'
        },
        h4: {
            fontFamily: 'Ermilov',
            fontSize: '1.8rem'
        }
    },
    palette: {
        ostudYellowPrimary: "#FFD422",
        ostudGrayPrimary: "#898890",
        ostudGraySecondary: "#65646B",
        ostudGrayAlpha: "rgba(137, 136, 144, 0.1)",
    }
});
