import TextInput from "./TextInput.tsx";
interface Props {
  label?: string;
  id: string;
  required?: boolean;
}

export default ({ label = "Last Name", id, required = false }: Props) => (
  <TextInput
    id={id}
    label={label}
    autocomplete="family-name"
    required={required}
  />
);
