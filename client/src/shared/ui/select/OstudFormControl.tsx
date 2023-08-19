import { FormControl, FormControlProps } from "@mui/material";

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
