import { TextField } from "@mui/material";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";


type Props<T extends FieldValues> = {
  name: Path<T>;      
  control: Control<T>;  
  label: string;
  multiline?: boolean;
  rows?: number;
};

export default function TextInput<T extends FieldValues>({
  name,
  control,
  label,
  multiline,
  rows
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          multiline={multiline}
          rows={rows}
          value={field.value ?? ''} 
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}