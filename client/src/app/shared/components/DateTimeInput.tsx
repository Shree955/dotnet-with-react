// DateTimeInput.tsx
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
};

export default function DateTimeInput<T extends FieldValues>({ name, control, label }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DateTimePicker
          label={label}
          // Fix: cast to any or use a safer check for the value
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value={(field.value as any) instanceof Date ? field.value : null} 
          onChange={(date) => field.onChange(date)}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!fieldState.error,
              helperText: fieldState.error?.message
            }
          }}
        />
      )}
    />
  );
}