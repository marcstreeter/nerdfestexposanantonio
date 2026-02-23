import TextInput from "./TextInput.tsx";
import type { RSVP } from "@/stores/rsvp";

interface Props {
  label?: string;
  id: keyof RSVP;
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
