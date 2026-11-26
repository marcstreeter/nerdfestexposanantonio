import {
  boardGameHost,
  expoSpeaker,
  livePrinting,
} from "@components/signup/volunteer-roles";
import type { storyScenes } from "@components/review/story-art";

const siteBase = import.meta.env.BASE_URL.replace(/\/$/, "");
export const previewBase = `${siteBase}/review-b/`;
export const rsvpUrl =
  "https://local.churchofjesuschrist.org/e/179861491?icid=actsh|cal|web|mis|global|global";
export const directions =
  "https://www.google.com/maps/dir/?api=1&destination=3644+Talley+Rd,+San+Antonio,+TX";

export const event = {
  date: "Saturday, February 20, 2027",
  start: "2027-02-20T13:00:00-06:00",
  hours: "1–5 PM",
  address: "3644 Talley Road",
  city: "San Antonio, TX",
};

const activities = [
  {
    title: "3D Printing",
    motif: "printer",
    description: "Watch a digital design take shape, one layer at a time.",
    action: "Volunteer to demo a printer",
    role: livePrinting,
  },
  {
    title: "Circuitry",
    motif: "circuit",
    description: "Get hands-on with electronics.",
    action: "Volunteer to demo electronics",
    role: { id: "volunteer-electronics", label: "Demo electronics" },
  },
  {
    title: "Block Builder Village",
    motif: "blocks",
    description: "Grab some bricks and build whatever you can imagine.",
    action: "Volunteer to help builders",
    role: {
      id: "volunteer-block-builders",
      label: "Help at Block Builder Village",
    },
  },
  {
    title: "Board Games",
    motif: "chess",
    description: "Pull up a chair for chess, old favorites, and new finds.",
    action: "Volunteer to host a game",
    role: boardGameHost,
  },
  {
    title: "Trading Card Games",
    motif: "cards",
    description: "Bring your deck or learn how to play a new one.",
    action: "Volunteer to run a card table",
    role: {
      id: "volunteer-card-table",
      label: "Run a trading card game table",
    },
  },
  {
    title: "Retro Games",
    motif: "arcade",
    description: "Pick up a controller and play a classic.",
    action: "Volunteer to run retro games",
    role: { id: "volunteer-retro-games", label: "Run retro games" },
  },
  {
    title: "Tabletop RPGs",
    motif: "tabletop",
    description: "Roll the dice and join an adventure.",
    action: "Volunteer to run an RPG",
    role: { id: "volunteer-tabletop-rpg", label: "Run a tabletop RPG" },
  },
  {
    title: "Expo Talks",
    motif: "talks",
    description: "Hear from people who love sharing what they know.",
    action: "Volunteer to give a talk",
    role: expoSpeaker,
  },
  {
    title: "Virtual Reality",
    motif: "vr",
    description: "Put on a headset and explore a virtual world.",
    action: "Volunteer to help with VR",
    role: { id: "volunteer-vr", label: "Help with virtual reality demos" },
  },
] satisfies {
  title: string;
  motif: keyof typeof storyScenes;
  description: string;
  action: string;
  role: { id: string; label: string };
}[];

export { activities };
