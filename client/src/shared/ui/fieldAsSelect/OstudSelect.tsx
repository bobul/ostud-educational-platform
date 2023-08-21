import { FieldProps } from 'formik';
import {InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {OstudFormControl} from "../select";

interface OstudSelectProps {
    label: string;
    options: { value: string; label: string }[];
}

export const OstudSelect: React.FC<FieldProps & OstudSelectProps> = ({
                                                                  field,
                                                                  form,
                                                                  label,
                                                                  options,
                                                              }) => {
    const handleChange = (event: SelectChangeEvent) => {
        const { value } = event.target;
        form.setFieldValue(field.name, value);
    };

    return (
        <OstudFormControl fullWidth>
            <InputLabel id={`${field.name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${field.name}-label`}
                id={field.name}
                value={field.value}
                onChange={handleChange}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </OstudFormControl>
    );
};
