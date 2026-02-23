import BaseInput from "./BaseInput.tsx";
import type { RSVP } from "@/stores/rsvp";

interface Props {
  label?: string;
  id: keyof RSVP;
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
