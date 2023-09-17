import {Card, Typography} from "@mui/material";
import {OstudButton} from "../button";
import {OstudDialogPanel} from "./dialog";

interface IOstudPanelProps {
    title: string;
    type: string;
}

export function OstudPanel({title, type}: IOstudPanelProps) {
    return (
        <div>
            <Card sx={{minWidth: '800px', padding: 2, margin: 2, position: 'relative'}}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body2">Нічого не знайдено.</Typography>
                <OstudDialogPanel type={type}>
                    <OstudButton variant="contained"
                                 custombackgroundcolor="#3D9A50"
                                 style={{position: 'absolute', right: '10px', bottom: '10px'}}>Створити
                    </OstudButton>
                </OstudDialogPanel>
            </Card>
        </div>
    );
}