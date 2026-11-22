export const rsvpEndpoint =
  "https://bivqb6ix45.execute-api.us-west-2.amazonaws.com/nerdfest-satx-rsvp";

export const eventAlertsEndpoint =
  import.meta.env.PUBLIC_EVENT_ALERTS_ENDPOINT || rsvpEndpoint;
