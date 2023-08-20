import {Checkbox, checkboxClasses, CheckboxProps, useTheme} from "@mui/material";


type OstudCheckboxProps = CheckboxProps & {
    customCheckboxColor?: string
}

export function OstudCheckbox({customCheckboxColor, ...props}: OstudCheckboxProps) {
    const theme = useTheme();

    return (
        <Checkbox
            {...props}
            value="allowExtraEmails"
            sx={{
                [`&, &.${checkboxClasses.checked}`]: {
                    color: customCheckboxColor || theme.palette.ostudYellowPrimary,
                },
            }}
        />
    )
}