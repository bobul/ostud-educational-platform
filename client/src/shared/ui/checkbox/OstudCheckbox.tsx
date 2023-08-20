import {Checkbox, checkboxClasses, CheckboxProps, useTheme} from "@mui/material";

const theme = useTheme();

type OstudCheckboxProps = CheckboxProps & {
    customCheckboxColor?: string
}

export function OstudCheckbox({customCheckboxColor, ...props}: OstudCheckboxProps) {
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