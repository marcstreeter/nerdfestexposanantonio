import React, { useEffect, useState } from "react";
import { rsvpStore } from "@/stores/rsvp";
import TextInput from "@components/ui/forms/TextInput.jsx";

type OptionValue = {
  key: string;
  value?: string;
};
interface Props {
  label?: string;
  id?: string;
  options: OptionValue[] | string[];
  other?: boolean;
  otherKey?: string;
  otherLabel?: string;
  stateKey: string;
  required?: boolean;
  //   selected: string;
  //   updateSelected: (value: string) => void;
}
const baseClasses =
  "inline-flex w-full items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold text-neutral-700 focus-visible:ring outline-none transition duration-300";
const borderClasses = "border border-transparent";
const bgColorClasses = "bg-yellow-400 dark:focus:outline-none";
const hoverClasses = "hover:bg-yellow-500";
const fontSizeClasses = "2xl:text-base";
const disabledClasses = "disabled:pointer-events-none disabled:opacity-50";
const ringClasses = "ring-zinc-500 dark:ring-zinc-200";
const styleClass = `${baseClasses} ${borderClasses} ${bgColorClasses} ${hoverClasses} ${fontSizeClasses} ${disabledClasses} ${ringClasses}`;

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
  const [value, setValue] = useState(rsvpStore.getState().rsvp[stateKey]);
  useEffect(() => {
    const unsubscribe = rsvpStore.subscribe((state) => {
      setValue(state.rsvp[stateKey]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const store = rsvpStore.getState();
  const prepOptions = (ops: OptionValue[] | string[]): OptionValue[] => {
    if (typeof ops[0] === "string") {
      return (ops as string[]).map((item) => ({
        key: item,
        value: item,
      }));
    } else {
      return (ops as OptionValue[]).map(({ key, value }) => ({
        key,
        value: value ?? key,
      }));
    }
  };
  const prepped = prepOptions(options);
  return (
    <div className="space-y-4 p-4">
      <select
        value={value}
        id={id}
        name={id}
        className={styleClass}
        onChange={(event) =>
          store.setRsvp({
            ...store.rsvp,
            [stateKey]: event.target.value,
          })
        }
        required={required}
      >
        <option value="" selected disabled>
          {label}
        </option>
        {prepped.map(({ key, value }: OptionValue) => (
          <option key={key} value={key}>
            {value ?? key}
          </option>
        ))}
      </select>
      {other && value == otherKey && (
        <TextInput id={`${stateKey}Other`} label={otherLabel} />
      )}
    </div>
  );
}
