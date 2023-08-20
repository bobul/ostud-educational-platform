import {DatePicker, DatePickerProps} from "@mui/x-date-pickers";

type OstudPickerProps = DatePickerProps<Date> & {
    customBorderColor?: string;
    customColor?: string
}

export function OstudDatePicker({ customBorderColor, customColor, ...props }: OstudPickerProps) {
    return (
        <DatePicker
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