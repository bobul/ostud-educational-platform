import {DatePicker, DatePickerProps} from "@mui/x-date-pickers";
import {useTheme} from "@mui/material";


type OstudPickerProps = DatePickerProps<Date> & {
    customBorderColor?: string;
    customColor?: string
}

export function OstudDatePicker({ customBorderColor, customColor, ...props }: OstudPickerProps) {
    const theme = useTheme();

    return (
        <DatePicker
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