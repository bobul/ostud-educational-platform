import {FormControl, FormControlProps, useTheme} from "@mui/material";

const theme = useTheme();

type OstudFormControlProps = FormControlProps & {
    customBorderColor?: string;
    customColor?: string;
}

export function OstudFormControl({ customBorderColor, customColor, ...props }: OstudFormControlProps) {
    return (
        <FormControl
            {...props}
            sx={{
                width: '100%',
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
