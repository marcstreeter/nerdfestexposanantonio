import schedule from "@data/events-overall.json";
import exhibits from "@data/events-exhibits.json";

interface ExpoEvent {
  id: string;
  title: string;
  description: string;
  hosts: string[];
  speakerBios?: Partial<Record<string, string>>;
  venue: string;
  room: string;
  time: string;
  kind: "schedule" | "exhibit";
}

export const expoEvents: ExpoEvent[] = [
  ...schedule.items.map<ExpoEvent>((event) => ({
    ...event,
    id: `${schedule.edition}-${event.id}`,
    kind: "schedule",
    time: /pm$/i.test(event.question)
      ? event.question.replace(/pm$/i, " PM")
      : `${event.question} PM`,
  })),
  ...exhibits.items.map<ExpoEvent>((event) => ({
    ...event,
    id: `${schedule.edition}-${event.id}`,
    kind: "exhibit",
    time: "Set time not listed",
  })),
];
