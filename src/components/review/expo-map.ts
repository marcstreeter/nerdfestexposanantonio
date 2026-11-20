export type Point = readonly [number, number];
type Rect = readonly [left: number, top: number, width: number, height: number];
type Door = readonly [inside: Point, hallway: Point];

export interface ExpoRoom {
  name: string;
  label: string;
  area: Rect;
  doors: Door[];
  description: string;
  scheduleVenue?: string;
  chip?: false;
}

export const width = 36;
export const height = 19;
export const entrance: Point = [14, 17];

// The room positions follow the supplied floor plan, with simplified corridors.
export const rooms: ExpoRoom[] = [
  {
    name: "Chapel",
    label: "CHAPEL",
    area: [1, 8, 11, 4],
    doors: [
      [
        [10, 8],
        [10, 7],
      ],
      [
        [10, 11],
        [10, 12],
      ],
    ],
    description:
      "Opening remarks. The floor plan marks the chapel closed after the kickoff.",
    scheduleVenue: "Chapel",
  },
  {
    name: "Exhibit Hall",
    label: "EXHIBITS",
    area: [14, 8, 9, 4],
    doors: [
      [
        [18, 8],
        [18, 7],
      ],
      [
        [18, 11],
        [18, 12],
      ],
    ],
    description:
      "3D printing, BiblioTech, and tabletop miniatures including Warhammer and Team Yankee.",
  },
  {
    name: "Tech Town",
    label: "TECH",
    area: [24, 8, 4, 2],
    doors: [
      [
        [25, 8],
        [25, 7],
      ],
    ],
    description: "Hands-on electronics and demos.",
  },
  {
    name: "Fortress of Solitude",
    label: "FORTRESS",
    area: [31, 3, 4, 6],
    doors: [
      [
        [32, 8],
        [32, 9],
      ],
    ],
    description:
      "Talks, panel discussions, and the Nerd Culture Trivia Game Show.",
    scheduleVenue: "Fortress of Solitude",
  },
  {
    name: "Block Builder Village",
    label: "BLOCKS",
    area: [9, 1, 3, 3],
    doors: [
      [
        [9, 3],
        [8, 3],
      ],
    ],
    description: "An area for building with blocks.",
  },
  {
    name: "Retro Games",
    label: "RETRO",
    area: [9, 4, 5, 2],
    doors: [
      [
        [11, 5],
        [11, 6],
      ],
    ],
    description: "Retro video games in the north wing.",
  },
  {
    name: "Other RPGs",
    label: "RPG",
    area: [15, 1, 3, 4],
    doors: [
      [
        [15, 4],
        [15, 5],
      ],
    ],
    description: "More tabletop role-playing games in the north wing.",
  },
  {
    name: "AI Magic Mirror",
    label: "AI",
    area: [22, 3, 3, 3],
    doors: [
      [
        [23, 5],
        [23, 6],
      ],
    ],
    description: "Find the AI Magic Mirror demonstration here.",
  },
  {
    name: "Virtual Reality",
    label: "VR",
    area: [25, 3, 3, 3],
    doors: [
      [
        [26, 5],
        [26, 6],
      ],
    ],
    description: "The VR demo area next to the AI Magic Mirror.",
  },
  {
    name: "Board Game Village",
    label: "BOARD",
    area: [5, 14, 4, 3],
    doors: [
      [
        [7, 14],
        [7, 13],
      ],
    ],
    description: "A room for board games next to the chess room.",
  },
  {
    name: "Chess",
    label: "CHESS",
    area: [9, 14, 3, 2],
    doors: [
      [
        [10, 14],
        [10, 13],
      ],
    ],
    description: "The chess room in the southwest wing.",
  },
  {
    name: "Dungeons & Dragons",
    label: "D&D",
    area: [9, 16, 3, 2],
    doors: [
      [
        [11, 17],
        [12, 17],
      ],
    ],
    description: "A Dungeons & Dragons room near the south entrance.",
  },
  {
    name: "Learn to Play or DM",
    label: "D&D",
    area: [17, 14, 3, 3],
    doors: [
      [
        [18, 14],
        [18, 13],
      ],
    ],
    description:
      "Learn to play Dungeons & Dragons or try being the Dungeon Master.",
  },
  {
    name: "Cosmere or D&D",
    label: "RPG",
    area: [20, 14, 3, 3],
    doors: [
      [
        [21, 14],
        [21, 13],
      ],
    ],
    description:
      "A breakout room marked for the Cosmere RPG or Dungeons & Dragons.",
  },
  {
    name: "D&D or Star Wars RPG",
    label: "RPG",
    area: [23, 14, 3, 3],
    doors: [
      [
        [24, 14],
        [24, 13],
      ],
    ],
    description:
      "A breakout room marked for Dungeons & Dragons or Star Wars roleplaying.",
  },
  {
    name: "Magic: The Gathering and Pokémon",
    label: "CARDS",
    area: [31, 11, 4, 6],
    doors: [
      [
        [32, 11],
        [32, 10],
      ],
    ],
    description:
      "The trading-card game room for Magic: The Gathering and Pokémon.",
  },
  {
    name: "Restrooms",
    label: "WC",
    area: [24, 10, 4, 2],
    doors: [
      [
        [27, 11],
        [28, 11],
      ],
    ],
    description: "Restrooms on the east side, below Tech Town.",
    chip: false,
  },
];

const halls: Rect[] = [
  [2, 6, 28, 1],
  [2, 13, 28, 1],
  [12, 6, 1, 12],
  [29, 6, 1, 8],
  [30, 9, 6, 2],
  [8, 3, 1, 3],
  [15, 5, 1, 1],
  [10, 7, 1, 1],
  [10, 12, 1, 1],
  [18, 7, 1, 1],
  [18, 12, 1, 1],
  [25, 7, 1, 1],
  [28, 11, 1, 1],
  [12, 17, 4, 1],
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
const contains = ([left, top, w, h]: Rect, [x, y]: Point) =>
  x >= left && x < left + w && y >= top && y < top + h;

export function roomAt(point: Point) {
  return rooms.find((room) => contains(room.area, point));
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
