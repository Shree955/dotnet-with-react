import { TextField, MenuItem } from "@mui/material";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

type Option = { text: string; value: string };

// 1. Add the generic T to the Props type
type Props<T extends FieldValues> = {
  name: Path<T>;        // Path<T> ensures the name matches your schema keys
  control: Control<T>;  // Links the control to your specific form schema
  label: string;
  items: Option[];
};

// 2. Pass the generic T through the component function
export default function SelectInput<T extends FieldValues>({ name, control, label, items }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          select
          label={label}
          fullWidth
          // Ensure value is at least an empty string to avoid "uncontrolled" errors
          value={field.value ?? ''} 
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}