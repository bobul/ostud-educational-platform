import {Card, Typography} from "@mui/material";
import {OstudButton} from "../button";
import {OstudDialogPanel} from "./dialog";
import {IClass} from "../../../entities";
import {Link} from "react-router-dom";


interface IOstudPanelProps {
    title: string;
    type: string;
    action: (letter: string, number: number, teacher_id: string) => Promise<void>;
    items: IClass[];
}

export function OstudPanel({title, type, items, action}: IOstudPanelProps) {
    return (
        <div>
            <Card sx={{minWidth: '800px', padding: 2, margin: 2, position: 'relative'}}>
                <Typography variant="h5">{title}</Typography>
                {items.length === 0 ? (
                    <Typography variant="body2">Нічого не знайдено.</Typography>
                ) : (
                    <ul>
                        {items.map((item) => (
                            <li key={item._id}>
                                <Link to={`/classes/${item._id}`}>
                                    Class {item.number} {item.letter}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <OstudDialogPanel type={type} action={action}>
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