import {Button, ButtonProps} from "@mui/material";

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
                backgroundColor: customBackgroundColor || (isContained ? '#FFD422' : 'primary'),
                '&:hover': {
                    backgroundColor: customHoverBackgroundColor || (isContained ? '#898890' : 'rgba(137, 136, 144, 0.1)'),
                },
            }}
        />
    );
}
