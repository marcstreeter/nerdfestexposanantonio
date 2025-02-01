import BaseInput from "./BaseInput";
import { type autocomplete } from "@/types/html";

interface Props {
  label: string;
  id: string;
  autocomplete?: autocomplete;
  required?: boolean;
}

export default ({
  label,
  id,
  autocomplete = "off",
  required = false,
}: Props) => (
  <BaseInput
    id={id}
    label={label}
    inputMode="text"
    inputType="text"
    autocomplete={autocomplete}
    required={required}
  />
);
