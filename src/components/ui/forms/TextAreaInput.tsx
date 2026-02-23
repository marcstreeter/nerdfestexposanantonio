import React, { useState, useEffect } from "react";
import debounce from "@utils/debounce.ts";
import { rsvpStore, type RSVP } from "@/stores/rsvp";

interface Props {
  label: string;
  rows?: number;
  id: keyof RSVP;
}
export default ({ label, id, rows = 4 }: Props) => {
  const [, setValue] = useState(rsvpStore.getState().rsvp[id]);
  useEffect(() => {
    const unsubscribe = rsvpStore.subscribe((state) => {
      setValue(state.rsvp[id]);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const debouncedHandler: React.ChangeEventHandler<HTMLTextAreaElement> =
    React.useMemo(
      () =>
        debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const store = rsvpStore.getState();
          store.setRsvp({
            ...store.rsvp,
            [id]: e.target.value,
          });
        }, 1000),
      [id],
    );
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        inputMode="text"
        autoComplete="off"
        className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
        placeholder={label}
        onChange={debouncedHandler}
      />
    </div>
  );
};
