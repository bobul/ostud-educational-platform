import {useTheme} from "@mui/material";
import {Link, LinkProps} from "react-router-dom";
import {HTMLAttributes} from "react";

type TLinkProps = LinkProps & HTMLAttributes<HTMLAnchorElement>

interface IOstudLinkProps {
    color: 'primary' | 'default';
}

type CombinedProps = TLinkProps & IOstudLinkProps

export function OstudLink({color, ...restProps}: CombinedProps) {
    const theme = useTheme();
    const linkColor = color === 'primary' ? theme.palette.ostudYellowPrimary : theme.palette.text.primary
    return (
        <Link {...restProps} style={{color: linkColor}}/>
    );
}