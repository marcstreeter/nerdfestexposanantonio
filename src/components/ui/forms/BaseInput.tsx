import React, { useState, useEffect, useRef } from "react";
import debounce from "@utils/debounce.ts";
import { rsvpStore, type RSVP } from "@/stores/rsvp";
import {
  type inputType,
  type inputMode,
  type autocomplete,
} from "@/types/html";

interface Props {
  label: string;
  id: keyof RSVP;
  inputType?: inputType;
  inputMode?: inputMode;
  autocomplete?: autocomplete;
  required?: boolean;
}

export default function Component({
  label,
  id,
  inputType = "text",
  autocomplete = "on",
  inputMode = "text",
  required = false,
}: Props) {
  const [, setValue] = useState(rsvpStore.getState().rsvp[id]);
  useEffect(() => {
    const unsubscribe = rsvpStore.subscribe((state) => {
      setValue(state.rsvp[id]);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const inputRef = useRef(null);
  useEffect(() => {
    console.error("hmmm ok");
    const inputElement = inputRef.current;
    if (!inputElement) return;

    const observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        console.error("hmmm");
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "value"
        ) {
          console.error("Value has changed to: ", mutation.target);
        }
      });
    });

    observer.observe(inputElement, {
      attributes: true,
      attributeFilter: ["value"],
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  const store = rsvpStore.getState();
  const handler = (event: React.ChangeEvent<HTMLInputElement>) =>
    store.setRsvp({
      ...store.rsvp,
      [id]: event.target.value,
    });
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        ref={inputRef}
        type={inputType}
        id={id}
        inputMode={inputMode}
        autoComplete={autocomplete}
        className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
        placeholder={label}
        onChange={debounce(handler, 1000)}
        required={required}
      />
    </div>
  );
}
