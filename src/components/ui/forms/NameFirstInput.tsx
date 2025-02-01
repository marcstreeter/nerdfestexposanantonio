import TextInput from "./TextInput.tsx";
interface Props {
  label?: string;
  id: string;
  required?: boolean;
}

export default ({ label = "First Name", id, required = false }: Props) => (
  <TextInput
    id={id}
    label={label}
    autocomplete="given-name"
    required={required}
  />
);
