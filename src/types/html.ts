export type inputType =
  | "text"
  | "password"
  | "email"
  | "search"
  | "url"
  | "tel";

export type inputMode =
  | "none"
  | "text"
  | "tel"
  | "numeric"
  | "decimal"
  | "email"
  | "url"
  | "search";

export type autocomplete =
  | "name"
  | "email"
  | "tel"
  | "given-name"
  | "family-name"
  | "on"
  | "off"; // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
