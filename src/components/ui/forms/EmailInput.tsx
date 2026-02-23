import BaseInput from "./BaseInput.tsx";
import type { RSVP } from "@/stores/rsvp";

interface Props {
  label?: string;
  id: keyof RSVP;
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
