import React, { useState, useEffect } from "react";
import { rsvpStore, type RSVP } from "@/stores/rsvp";
import { removeWord, addWord, hasWord } from "@/utils/misc";
import TextInput from "@components/ui/forms/TextInput.jsx";

type Option = {
  label: string;
  id: string;
};

interface Props {
  options: Option[];
  id: keyof RSVP;
  other?: boolean;
  otherKey?: string;
  otherLabel?: string;
}
export default ({
  options,
  id,
  other = false,
  otherKey = "other",
  otherLabel = "Please elaborate",
}: Props) => {
  const [value, setValue] = useState<string[]>(
    (rsvpStore.getState().rsvp[id] as string[] | undefined) ?? [],
  );
  useEffect(() => {
    const unsubscribe = rsvpStore.subscribe((state) => {
      setValue((state.rsvp[id] as string[]) ?? []);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const store = rsvpStore.getState();
  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const current = (store.rsvp[id] as string[] | undefined) ?? [];
    const words = event.target.checked
      ? addWord({ targetWord: event.target.id, words: current })
      : removeWord({
          targetWord: event.target.id,
          words: current,
        });
    setValue(words);
    store.setRsvp({
      ...store.rsvp,
      [id]: words,
    });
  };
  return (
    <div className="space-y-4 p-4">
      {options.map(({ id: optionId, label }) => (
        <div key={`checkbox-${id}-${optionId}`} className="flex items-center">
          <div className="flex">
            <input
              id={optionId}
              name={id}
              onChange={handler}
              type="checkbox"
              checked={hasWord({
                targetWord: optionId,
                words: (store.rsvp[id] as string[]) ?? [],
              })}
              className="pointer-events-none mt-0.5 shrink-0 rounded border-neutral-200 text-neutral-600 focus:ring-yellow-400 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-yellow-400 dark:checked:bg-yellow-400 dark:focus:ring-offset-neutral-800"
            />
          </div>
          <div className="ms-3">
            <label
              htmlFor={optionId}
              className="text-sm text-neutral-800 dark:text-neutral-200"
            >
              {label}
            </label>
          </div>
        </div>
      ))}
      {other && hasWord({ targetWord: otherKey, words: value }) && (
        <TextInput id={`${id}Other` as keyof RSVP} label={otherLabel} />
      )}
    </div>
  );
};
