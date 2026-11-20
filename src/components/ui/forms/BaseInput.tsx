import { Input } from "@/components/ui/shadcn/input";
import React from "react";
import { useStore } from "zustand";
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
  const value = useStore(rsvpStore, (state) => state.rsvp[id]);
  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const store = rsvpStore.getState();
    store.setRsvp({
      ...store.rsvp,
      [id]: event.target.value,
    });
  };
  return (
    <div className="signup-field">
      <label htmlFor={id}>{label}</label>
      <Input
        className="form-control"
        type={inputType}
        id={id}
        inputMode={inputMode}
        autoComplete={autocomplete}
        value={value ?? ""}
        onChange={handler}
        required={required}
      />
    </div>
  );
}
