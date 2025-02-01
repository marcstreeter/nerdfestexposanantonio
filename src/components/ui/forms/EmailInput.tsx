import BaseInput from "./BaseInput.tsx";
interface Props {
  label?: string;
  id: string;
  required?: boolean;
}
export default ({ label = "E-mail", id, required = false }: Props) => (
  <BaseInput
    id={id}
    label={label}
    autocomplete="email"
    inputType="email"
    inputMode="email"
    required={required}
  />
);
