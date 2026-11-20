import { useStore } from "zustand";
import { rsvpStore, type RSVP } from "@/stores/rsvp";
import NativeSelect from "@components/ui/forms/Select.tsx";
import TextInput from "@components/ui/forms/TextInput.tsx";

type OptionValue = {
  key: string;
  value?: string;
};
interface Props {
  label: string;
  id: string;
  options: OptionValue[] | string[];
  other?: boolean;
  otherKey?: string;
  otherLabel?: string;
  stateKey: keyof RSVP;
  required?: boolean;
}

export default function Select({
  id,
  label,
  options,
  stateKey,
  other = false,
  otherKey = "other",
  otherLabel = "Please elaborate",
  required = false,
}: Props) {
  const value = useStore(rsvpStore, (state) => state.rsvp[stateKey]);
  const choices = options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : { value: option.key, label: option.value ?? option.key },
  );
  return (
    <div className="signup-field">
      <label htmlFor={id}>{label}</label>
      <NativeSelect
        value={choices.some((option) => option.value === value) ? value : ""}
        id={id}
        name={id}
        onChange={(event) => {
          const store = rsvpStore.getState();
          store.setRsvp({
            ...store.rsvp,
            [stateKey]: event.target.value,
          });
        }}
        required={required}
        options={[
          { value: "", label: "Select an option", disabled: true },
          ...choices,
        ]}
      />
      {other && value === otherKey && (
        <TextInput id={`${stateKey}Other` as keyof RSVP} label={otherLabel} />
      )}
    </div>
  );
}
