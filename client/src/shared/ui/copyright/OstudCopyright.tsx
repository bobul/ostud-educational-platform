import {Typography} from "@mui/material";
import {Link} from "react-router-dom";

export function OstudCopyright(props: any) {
    return (
        <Typography variant="body2"
                    color="text.secondary"
                    align="center" {...props}>
            {'Copyright © '}
            <Link to={'/'}>
                OSTUD
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}