import { Textarea } from "@/components/ui/shadcn/textarea";
import React from "react";
import { useStore } from "zustand";
import { rsvpStore, type RSVP } from "@/stores/rsvp";

interface Props {
  label: string;
  rows?: number;
  id: keyof RSVP;
}
export default ({ label, id, rows = 4 }: Props) => {
  const value = useStore(rsvpStore, (state) => state.rsvp[id]);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const store = rsvpStore.getState();
    store.setRsvp({
      ...store.rsvp,
      [id]: event.target.value,
    });
  };
  return (
    <div className="signup-field">
      <label htmlFor={id}>{label}</label>
      <Textarea
        className="form-control"
        id={id}
        rows={rows}
        inputMode="text"
        autoComplete="off"
        value={value ?? ""}
        onChange={handleChange}
      />
    </div>
  );
};
