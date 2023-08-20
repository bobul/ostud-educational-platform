import {Button, ButtonProps, useTheme} from "@mui/material";

const theme = useTheme();

type OstudButtonProps = ButtonProps & {
    customBackgroundColor?: string;
    customHoverBackgroundColor?: string;
    customColor?: string;
};

export function OstudButton({
                                customBackgroundColor,
                                customHoverBackgroundColor,
                                customColor,
                                ...props
                            }: OstudButtonProps) {
    const isContained = props.variant === 'contained';
    return (
        <Button
            {...props}
            sx={{
                color: customColor || (isContained ? 'white' : 'primary'),
                backgroundColor: customBackgroundColor || (isContained ? theme.palette.ostudYellowPrimary : 'primary'),
                '&:hover': {
                    backgroundColor: customHoverBackgroundColor || (isContained ? theme.palette.ostudGrayPrimary : theme.palette.ostudGrayAlpha),
                },
            }}
        />
    );
}
