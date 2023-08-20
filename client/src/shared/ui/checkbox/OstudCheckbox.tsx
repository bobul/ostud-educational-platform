import {Checkbox, checkboxClasses, CheckboxProps} from "@mui/material";

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
                    color: customCheckboxColor || '#FFD422',
                },
            }}
        />
    )
}