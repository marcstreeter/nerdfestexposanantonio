import TextInput from "./TextInput.tsx";
import type { RSVP } from "@/stores/rsvp";

interface Props {
  label?: string;
  id: keyof RSVP;
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
