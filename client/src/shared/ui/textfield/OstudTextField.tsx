import { TextField, TextFieldProps } from "@mui/material";

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
                        borderColor: customBorderColor || '#FFD422',
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: customColor || "#898890",
                },
            }}
        />
    );
}

