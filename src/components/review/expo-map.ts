import type { storyScenes } from "./story-art";

export type Point = readonly [number, number];
type Rect = readonly [left: number, top: number, width: number, height: number];
type Door = readonly [inside: Point, hallway: Point];

export interface ExpoRoom {
  name: string;
  label: string;
  icon?: Exclude<keyof typeof storyScenes, "welcome">;
  area: Rect;
  doors: Door[];
  description: string;
  amenity?: "restroom-women" | "restroom-men" | "restroom-family";
}

export const width = 72;
export const height = 40;
export const entrance: Point = [27, 38];

const northFoyer = { name: "North Foyer", area: [24, 2, 6, 10] } as const;
export const southFoyer = {
  name: "South Foyer",
  area: [24, 28, 6, 11],
} as const;
export const foyers = [northFoyer, southFoyer];
export const backExit = {
  name: "Back Exit",
  area: [62, 18, 8, 4],
} as const;

export const exits: {
  point: Point;
  edge: "north" | "east" | "south" | "west";
}[] = [
  { point: [27, 2], edge: "north" },
  { point: [69, 20], edge: "east" },
  { point: entrance, edge: "south" },
  { point: [60, 38], edge: "south" },
  { point: [1, 13], edge: "west" },
  { point: [1, 27], edge: "west" },
];

function divideRoomRow(
  [left, top, width, height]: Rect,
  count: number,
): Rect[] {
  const roomWidth = width / count;
  return Array.from({ length: count }, (_, index) => [
    left + index * roomWidth,
    top,
    roomWidth,
    height,
  ]);
}

export const unprogrammedRooms: Rect[] = [
  ...divideRoomRow([1, 2, 18, 10], 4),
  ...divideRoomRow([35, 2, 11, 10], 3),
  ...divideRoomRow([1, 28, 11, 11], 2),
  [30, 28, 5, 11],
  [58, 2, 4, 10],
  [50, 28, 9, 11],
];

// Relative room positions follow the floor plan within a rectangular outline.
export const rooms: ExpoRoom[] = [
  {
    name: "Chapel",
    label: "CHAPEL",
    icon: "talks",
    area: [1, 14, 25, 12],
    doors: [
      [
        [7, 14],
        [7, 13],
      ],
      [
        [24, 14],
        [24, 13],
      ],
      [
        [11, 25],
        [11, 26],
      ],
      [
        [24, 25],
        [24, 26],
      ],
    ],
    description:
      "Opening remarks. The floor plan marks the chapel closed after the kickoff.",
  },
  {
    name: "Exhibit Hall",
    label: "EXHIBITS",
    icon: "printer",
    area: [26, 14, 24, 12],
    doors: [
      [
        [29, 14],
        [29, 13],
      ],
      [
        [39, 14],
        [39, 13],
      ],
      [
        [44, 14],
        [44, 13],
      ],
      [
        [29, 25],
        [29, 26],
      ],
      [
        [39, 25],
        [39, 26],
      ],
    ],
    description:
      "3D printing, BiblioTech, and tabletop miniatures including Warhammer and Team Yankee.",
  },
  {
    name: "Tech Town",
    label: "TECH",
    icon: "circuit",
    area: [50, 14, 10, 5],
    doors: [
      [
        [53, 14],
        [53, 13],
      ],
      [
        [58, 14],
        [58, 13],
      ],
    ],
    description: "Hands-on electronics and demos.",
  },
  {
    name: "Fortress of Solitude",
    label: "FORTRESS",
    icon: "talks",
    area: [62, 2, 8, 16],
    doors: [
      [
        [62, 12],
        [61, 12],
      ],
      [
        [66, 17],
        [66, 18],
      ],
    ],
    description:
      "Talks, panel discussions, and the Nerd Culture Trivia Game Show.",
  },
  {
    name: "Block Builder Village",
    label: "BLOCKS",
    icon: "blocks",
    area: [19, 2, 5, 6],
    doors: [
      [
        [23, 5],
        [24, 5],
      ],
    ],
    description: "An area for building with blocks.",
  },
  {
    name: "Retro Games",
    label: "RETRO",
    icon: "arcade",
    area: [19, 8, 5, 4],
    doors: [
      [
        [23, 9],
        [24, 9],
      ],
    ],
    description: "Retro video games in the north wing.",
  },
  {
    name: "Other RPGs",
    label: "RPG",
    icon: "tabletop",
    area: [30, 2, 5, 5],
    doors: [
      [
        [34, 6],
        [34, 7],
      ],
    ],
    description: "More tabletop role-playing games in the north wing.",
  },
  {
    name: "AI Magic Mirror",
    label: "AI",
    area: [46, 2, 6, 10],
    doors: [
      [
        [48, 11],
        [48, 12],
      ],
    ],
    description: "Find the AI Magic Mirror demonstration here.",
  },
  {
    name: "Virtual Reality",
    label: "VR",
    icon: "vr",
    area: [52, 2, 6, 10],
    doors: [
      [
        [54, 11],
        [54, 12],
      ],
    ],
    description: "The VR demo area next to the AI Magic Mirror.",
  },
  {
    name: "Board Game Village",
    label: "BOARD",
    icon: "tabletop",
    area: [12, 28, 7, 11],
    doors: [
      [
        [13, 28],
        [13, 27],
      ],
      [
        [18, 28],
        [18, 27],
      ],
    ],
    description: "A room for board games next to the chess room.",
  },
  {
    name: "Chess",
    label: "CHESS",
    icon: "chess",
    area: [19, 28, 5, 5],
    doors: [
      [
        [23, 30],
        [24, 30],
      ],
    ],
    description: "The chess room in the southwest wing.",
  },
  {
    name: "Dungeons & Dragons",
    label: "D&D",
    icon: "tabletop",
    area: [19, 33, 5, 6],
    doors: [
      [
        [23, 36],
        [24, 36],
      ],
    ],
    description: "A Dungeons & Dragons room near the south entrance.",
  },
  {
    name: "Learn to Play or DM",
    label: "D&D",
    icon: "tabletop",
    area: [35, 28, 5, 11],
    doors: [
      [
        [37, 28],
        [37, 27],
      ],
    ],
    description:
      "Learn to play Dungeons & Dragons or try being the Dungeon Master.",
  },
  {
    name: "Cosmere or D&D",
    label: "RPG",
    icon: "tabletop",
    area: [40, 28, 5, 11],
    doors: [
      [
        [42, 28],
        [42, 27],
      ],
    ],
    description:
      "A breakout room marked for the Cosmere RPG or Dungeons & Dragons.",
  },
  {
    name: "D&D or Star Wars RPG",
    label: "RPG",
    icon: "tabletop",
    area: [45, 28, 5, 11],
    doors: [
      [
        [47, 28],
        [47, 27],
      ],
    ],
    description:
      "A breakout room marked for Dungeons & Dragons or Star Wars roleplaying.",
  },
  {
    name: "Magic: The Gathering and Pokémon",
    label: "CARDS",
    icon: "cards",
    area: [62, 22, 8, 17],
    doors: [
      [
        [62, 27],
        [61, 27],
      ],
      [
        [66, 22],
        [66, 21],
      ],
    ],
    description:
      "The trading-card game room for Magic: The Gathering and Pokémon.",
  },
  {
    name: "Women's restroom",
    label: "WC",
    amenity: "restroom-women",
    area: [50, 19, 5, 7],
    doors: [
      [
        [53, 25],
        [53, 26],
      ],
    ],
    description: "Restroom on the south hallway, below Tech Town.",
  },
  {
    name: "Men's restroom",
    label: "WC",
    amenity: "restroom-men",
    area: [55, 19, 5, 7],
    doors: [
      [
        [56, 25],
        [56, 26],
      ],
    ],
    description: "Restroom below Tech Town, beside the east hallway.",
  },
  {
    name: "Family restroom",
    label: "WC",
    amenity: "restroom-family",
    area: [30, 7, 3, 5],
    doors: [
      [
        [32, 9],
        [33, 9],
      ],
    ],
    description: "Family restroom off the small hall below Other RPGs.",
  },
];

const namedAreas = [...foyers, backExit];

export const halls: Rect[] = [
  [33, 7, 2, 5],
  [1, 12, 61, 2],
  [1, 26, 61, 2],
  [60, 14, 2, 12],
  ...namedAreas.map(({ area }) => area),
  [59, 28, 3, 11],
];

export const directions = {
  ArrowUp: [0, -1],
  ArrowLeft: [-1, 0],
  ArrowDown: [0, 1],
  ArrowRight: [1, 0],
} as const;

export const samePoint = ([ax, ay]: Point, [bx, by]: Point) =>
  ax === bx && ay === by;
const key = ([x, y]: Point) => `${x},${y}`;
export const doorwayKey = (from: Point, to: Point) =>
  [key(from), key(to)].sort().join(":");
const contains = ([left, top, w, h]: Rect, [x, y]: Point) =>
  x >= left && x < left + w && y >= top && y < top + h;

export function roomAt(point: Point) {
  return rooms.find((room) => contains(room.area, point));
}

export function areaNameAt(point: Point) {
  return namedAreas.find(({ area }) => contains(area, point))?.name;
}

export function isHall(point: Point) {
  return halls.some((hall) => contains(hall, point));
}

export function canMove(from: Point, to: Point) {
  const fromRoom = roomAt(from);
  const toRoom = roomAt(to);
  if (fromRoom && fromRoom === toRoom) return true;
  if (fromRoom && isHall(to)) return hasDoor(fromRoom, from, to);
  if (toRoom && isHall(from)) return hasDoor(toRoom, to, from);
  return !fromRoom && !toRoom && isHall(from) && isHall(to);
}

function hasDoor(room: ExpoRoom, roomTile: Point, hallTile: Point) {
  return room.doors.some(
    ([inside, outside]) =>
      samePoint(inside, roomTile) && samePoint(outside, hallTile),
  );
}

export function roomCenter({ area: [left, top, w, h] }: ExpoRoom): Point {
  return [left + Math.floor(w / 2), top + Math.floor(h / 2)];
}

export function routeBetween(start: Point, end: Point): Point[] {
  const queue: Point[] = [start];
  const previous = new Map<string, Point | undefined>([
    [key(start), undefined],
  ]);
  for (const point of queue) {
    if (samePoint(point, end)) {
      const route: Point[] = [];
      for (
        let step: Point | undefined = point;
        step;
        step = previous.get(key(step))
      ) {
        route.push(step);
      }
      return route.reverse();
    }
    for (const [dx, dy] of Object.values(directions)) {
      const next: Point = [point[0] + dx, point[1] + dy];
      if (!previous.has(key(next)) && canMove(point, next)) {
        previous.set(key(next), point);
        queue.push(next);
      }
    }
  }
  return [];
}
