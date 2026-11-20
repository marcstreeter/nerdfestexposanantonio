import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { useStore } from "zustand";
import { rsvpStore, type RSVP } from "@/stores/rsvp";
import { removeWord, addWord, hasWord } from "@/utils/misc";
import TextInput from "@components/ui/forms/TextInput.tsx";

type Option = {
  label: string;
  id: string;
};

interface Props {
  options: Option[];
  id: keyof RSVP;
  other?: boolean;
  otherKey?: string;
  otherField?: keyof RSVP;
  otherLabel?: string;
}
export default ({
  options,
  id,
  other = false,
  otherKey = "other",
  otherField = `${id}Other` as keyof RSVP,
  otherLabel = "Please elaborate",
}: Props) => {
  const value = useStore(rsvpStore, (state) => state.rsvp[id]) as string[];
  const handler = (optionId: string, checked: boolean | "indeterminate") => {
    const store = rsvpStore.getState();
    const current = (store.rsvp[id] as string[] | undefined) ?? [];
    const words =
      checked === true
        ? addWord({ targetWord: optionId, words: current })
        : removeWord({
            targetWord: optionId,
            words: current,
          });
    store.setRsvp({
      ...store.rsvp,
      [id]: words,
    });
  };
  return (
    <div className="signup-field">
      <div className="signup-options">
        {options.map(({ id: optionId, label }) => (
          <div key={optionId} className="signup-option">
            <Checkbox
              id={optionId}
              name={id}
              onCheckedChange={(checked) => handler(optionId, checked)}
              checked={hasWord({ targetWord: optionId, words: value ?? [] })}
            />
            <label htmlFor={optionId}>{label}</label>
          </div>
        ))}
      </div>
      {other && hasWord({ targetWord: otherKey, words: value ?? [] }) && (
        <TextInput id={otherField} label={otherLabel} />
      )}
    </div>
  );
};
