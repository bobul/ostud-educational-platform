import React from "react";
import {Button, ButtonProps, useTheme} from "@mui/material";

type OstudButtonProps = ButtonProps & {
    custombackgroundcolor?: string;
    customhoverbackgroundcolor?: string;
    customcolor?: string;
};

export const OstudButton = React.forwardRef<HTMLButtonElement, OstudButtonProps>(
    (props, ref) => {
        const isContained = props.variant === 'contained';
        const theme = useTheme();
        return (
            <Button
                {...props}
                sx={{
                    color: props.customcolor || (isContained ? 'white' : 'primary'),
                    backgroundColor: props.custombackgroundcolor || (isContained ? theme.palette.ostudYellowPrimary : 'primary'),
                    '&:hover': {
                        backgroundColor: props.customhoverbackgroundcolor || (isContained ? theme.palette.ostudGrayPrimary : theme.palette.ostudGrayAlpha),
                    },
                }}
            />
        );
    }
);
