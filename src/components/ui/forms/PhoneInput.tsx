import BaseInput from "./BaseInput.tsx";
interface Props {
  label?: string;
  id: string;
  required?: boolean;
}

export default ({ label = "Phone Number", id, required = false }: Props) => (
  <BaseInput
    id={id}
    label={label}
    inputMode="tel"
    inputType="tel"
    autocomplete="tel"
    required={required}
  />
);
