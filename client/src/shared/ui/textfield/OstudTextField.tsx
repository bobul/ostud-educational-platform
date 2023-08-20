import {TextField, TextFieldProps, useTheme} from "@mui/material";

type OstudTextFieldProps = TextFieldProps & {
    customBorderColor?: string;
    customColor?: string
}

export function OstudTextField({ customBorderColor, customColor, ...props }: OstudTextFieldProps) {
    const theme = useTheme();

    return (
        <TextField
            {...props}
            sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: customBorderColor || theme.palette.ostudYellowPrimary,
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: customColor || theme.palette.ostudGrayPrimary,
                },
            }}
        />
    );
}

