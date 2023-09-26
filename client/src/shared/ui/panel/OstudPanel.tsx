import {Card, Typography} from "@mui/material";
import {OstudButton} from "../button";
import {OstudDialogPanel} from "./dialog";
import React from "react";
import {IOstudDialogProps} from "./dialog/OstudDialogPanel.tsx";

interface IOstudPanelProps {
    title: string;
    renderedItems: React.ReactNode[];
    dialogConfig: IOstudDialogProps;
}

export function OstudPanel({title, renderedItems, dialogConfig}: IOstudPanelProps) {

    return (
        <div>
            <Card sx={{minWidth: '800px', padding: 2, margin: 2, position: 'relative'}}>
                <Typography variant="h5">{title}</Typography>
                {renderedItems.length === 0 ? (
                    <Typography variant="body2">Нічого не знайдено.</Typography>
                ) : (
                    <ul>
                        {renderedItems}
                    </ul>
                )}
                <OstudDialogPanel {...dialogConfig}>
                    <OstudButton variant="contained"
                                 custombackgroundcolor="#3D9A50"
                                 style={{position: 'absolute', right: '10px', bottom: '10px'}}
                    >Створити
                    </OstudButton>
                </OstudDialogPanel>
            </Card>
        </div>
    );
}