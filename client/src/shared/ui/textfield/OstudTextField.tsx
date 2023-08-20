import {TextField, TextFieldProps, useTheme} from "@mui/material";

const theme = useTheme();

type OstudTextFieldProps = TextFieldProps & {
    customBorderColor?: string;
    customColor?: string
}

export function OstudTextField({ customBorderColor, customColor, ...props }: OstudTextFieldProps) {
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

