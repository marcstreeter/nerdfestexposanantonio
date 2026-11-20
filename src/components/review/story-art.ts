type Point = [number, number];
type Line = [Point, Point];

function path(...points: Point[]): Line[] {
  return points.slice(1).map((point, index) => [points[index], point]);
}

function box(left: number, top: number, right: number, bottom: number) {
  return path(
    [left, top],
    [right, top],
    [right, bottom],
    [left, bottom],
    [left, top],
  );
}

function diamond(x: number, y: number, radius: number) {
  return path(
    [x, y - radius],
    [x + radius, y],
    [x, y + radius],
    [x - radius, y],
    [x, y - radius],
  );
}

const chipTraces: Point[][] = [
  [
    [42, 38],
    [42, 24],
    [34, 16],
    [15, 16],
  ],
  [
    [47, 38],
    [47, 20],
    [36, 9],
    [26, 9],
  ],
  [
    [53, 38],
    [53, 20],
    [63, 10],
    [76, 10],
  ],
  [
    [58, 38],
    [58, 24],
    [62, 20],
    [87, 20],
  ],
  [
    [62, 42],
    [73, 42],
    [84, 31],
    [92, 31],
  ],
  [
    [62, 47],
    [79, 47],
    [84, 42],
    [94, 42],
  ],
  [
    [62, 53],
    [79, 53],
    [88, 62],
    [94, 62],
  ],
  [
    [62, 58],
    [74, 58],
    [92, 76],
  ],
  [
    [58, 62],
    [58, 66],
    [78, 86],
    [85, 86],
  ],
  [
    [53, 62],
    [53, 82],
    [64, 93],
  ],
  [
    [47, 62],
    [47, 88],
    [43, 92],
  ],
  [
    [42, 62],
    [42, 75],
    [27, 90],
    [18, 90],
  ],
  [
    [38, 58],
    [33, 58],
    [17, 74],
    [8, 74],
  ],
  [
    [38, 53],
    [30, 53],
    [24, 59],
    [8, 59],
  ],
  [
    [38, 47],
    [25, 47],
    [13, 35],
    [6, 35],
  ],
  [
    [38, 42],
    [28, 42],
    [12, 26],
    [6, 26],
  ],
];

const circuit: Line[] = [
  ...box(38, 38, 62, 62),
  ...box(41, 41, 59, 59),
  ...diamond(50, 50, 4),
  ...chipTraces.flatMap((trace) => {
    const [x, y] = trace[trace.length - 1];
    return [...path(...trace), ...diamond(x, y, 1.6)];
  }),
];

const chess: Line[] = [
  ...box(18, 18, 82, 82),
  ...Array.from({ length: 7 }, (_, i) => 26 + i * 8).flatMap((edge) => [
    ...path([edge, 18], [edge, 82]),
    ...path([18, edge], [82, edge]),
  ]),
  ...path(
    [35, 58],
    [35, 54],
    [40, 52],
    [40, 44],
    [36, 39],
    [36, 35],
    [41, 35],
    [44, 39],
    [48, 35],
    [53, 35],
    [53, 39],
    [49, 44],
    [49, 52],
    [54, 54],
    [54, 58],
    [35, 58],
  ),
];

export const cards: Line[] = [
  ...box(36, 20, 68, 77),
  ...path([36, 28], [22, 33], [32, 83], [62, 78]),
  ...path([68, 25], [81, 30], [72, 85], [43, 79]),
  ...box(41, 30, 63, 53),
  ...path([43, 60], [61, 60]),
  ...path([43, 65], [57, 65]),
  ...path([43, 70], [53, 70]),
  ...diamond(52, 41, 7),
  ...diamond(27, 19, 4),
  ...diamond(81, 68, 3),
];

const map: Line[] = [
  ...path([19, 22], [82, 22], [82, 77], [19, 77], [19, 22]),
  ...path(
    [19, 38],
    [38, 38],
    [38, 52],
    [49, 52],
    [49, 33],
    [66, 33],
    [66, 45],
    [82, 45],
  ),
  ...path(
    [19, 63],
    [29, 63],
    [29, 71],
    [57, 71],
    [57, 57],
    [71, 57],
    [71, 67],
    [82, 67],
  ),
  ...box(51, 42, 57, 48),
  ...box(25, 46, 31, 52),
  ...box(62, 62, 66, 66),
  ...box(73, 28, 78, 33),
];

export const dice: Line[] = [
  ...path(
    [49, 16],
    [75, 31],
    [82, 59],
    [61, 82],
    [32, 79],
    [17, 54],
    [24, 30],
    [49, 16],
  ),
  ...path([24, 30], [38, 36], [49, 16], [61, 38], [75, 31]),
  ...path([17, 54], [31, 60], [38, 36], [61, 38], [70, 61], [82, 59]),
  ...path([32, 79], [31, 60], [50, 70], [70, 61], [61, 82]),
  ...path([38, 36], [50, 70], [61, 38]),
  ...diamond(16, 20, 4),
  ...diamond(84, 77, 5),
];

export const headset: Line[] = [
  ...path(
    [16, 40],
    [23, 30],
    [76, 30],
    [84, 40],
    [84, 61],
    [77, 69],
    [60, 69],
    [54, 62],
    [46, 62],
    [40, 69],
    [23, 69],
    [16, 61],
    [16, 40],
  ),
  ...path([16, 45], [9, 45], [9, 58], [16, 58]),
  ...path([84, 45], [91, 45], [91, 58], [84, 58]),
  ...diamond(35, 49, 10),
  ...diamond(65, 49, 10),
  ...path([31, 24], [39, 17], [61, 17], [69, 24]),
];

export const printer: Line[] = [
  ...box(16, 81, 84, 90),
  ...path([22, 81], [22, 16], [78, 16], [78, 81]),
  ...path([23, 34], [77, 34]),
  ...path([51, 16], [51, 25]),
  ...box(43, 25, 59, 41),
  ...path([47, 41], [51, 47], [55, 41]),
  ...path([28, 76], [72, 76]),
  ...path([40, 76], [40, 61], [51, 55], [62, 61], [62, 76]),
  ...path([40, 61], [51, 67], [62, 61]),
  ...path([51, 67], [51, 76]),
];

const blocks: Line[] = [
  ...path(
    [15, 54],
    [48, 41],
    [86, 55],
    [52, 69],
    [15, 54],
    [15, 70],
    [52, 85],
    [86, 71],
    [86, 55],
  ),
  ...path([52, 69], [52, 85]),
  ...path(
    [25, 35],
    [52, 24],
    [73, 33],
    [46, 44],
    [25, 35],
    [25, 48],
    [46, 57],
    [73, 46],
    [73, 33],
  ),
  ...path([46, 44], [46, 57]),
  ...diamond(42, 34, 4),
  ...diamond(56, 30, 4),
  ...diamond(64, 57, 4),
  ...diamond(75, 53, 4),
];

const microphone: Line[] = [
  ...path(
    [39, 29],
    [42, 20],
    [48, 16],
    [52, 16],
    [58, 20],
    [61, 29],
    [61, 51],
    [58, 59],
    [52, 63],
    [48, 63],
    [42, 59],
    [39, 51],
    [39, 29],
  ),
  ...path([39, 30], [48, 30]),
  ...path([39, 38], [48, 38]),
  ...path([39, 46], [48, 46]),
  ...path([61, 30], [54, 30]),
  ...path([61, 38], [54, 38]),
  ...path([61, 46], [54, 46]),
  ...path(
    [30, 44],
    [30, 51],
    [34, 62],
    [43, 70],
    [57, 70],
    [66, 62],
    [70, 51],
    [70, 44],
  ),
  ...path([50, 70], [50, 84], [35, 84], [65, 84]),
  ...path([18, 31], [15, 39], [18, 47]),
  ...path([82, 31], [85, 39], [82, 47]),
];

// Sample smooth outlines into segments so they can use the same scroll morph.
function smooth(...points: Point[]): Line[] {
  const outline = [points[0]];
  for (let i = 0; i < points.length - 1; i++) {
    const previous = points[Math.max(0, i - 1)];
    const start = points[i];
    const end = points[i + 1];
    const next = points[Math.min(points.length - 1, i + 2)];
    for (let step = 1; step <= 4; step++) {
      const t = step / 4;
      const sample = (axis: 0 | 1) => {
        const a = previous[axis];
        const b = start[axis];
        const c = end[axis];
        const d = next[axis];
        const value =
          b +
          0.5 *
            ((c - a) * t +
              (2 * a - 5 * b + 4 * c - d) * t ** 2 +
              (3 * b - a - 3 * c + d) * t ** 3);
        return Math.round(value * 100) / 100;
      };
      outline.push([sample(0), sample(1)]);
    }
  }
  return path(...outline);
}

const peopleAtTable: Line[] = [
  // Three faces, with separate hairlines, glasses, and profiles.
  ...smooth(
    [15, 37],
    [14, 31],
    [17, 25],
    [22, 23],
    [27, 24],
    [30, 28],
    [30, 33],
    [33, 37],
    [30, 39],
    [28, 44],
    [23, 46],
    [19, 44],
    [15, 37],
  ),
  ...smooth([14, 33], [17, 34], [20, 30], [23, 31], [27, 29], [29, 27]),
  ...path([25, 35], [27, 35]),
  ...smooth([25, 41], [27, 42], [29, 41]),
  ...smooth(
    [44, 27],
    [42, 22],
    [43, 16],
    [47, 12],
    [53, 11],
    [59, 16],
    [60, 22],
    [58, 29],
    [54, 33],
    [48, 32],
    [44, 27],
  ),
  ...smooth([42, 21], [46, 21], [50, 16], [55, 19], [60, 20]),
  ...box(45, 22, 50, 26),
  ...box(52, 22, 57, 26),
  ...path([50, 24], [52, 24]),
  ...smooth([49, 29], [52, 30], [54, 28]),
  ...smooth(
    [83, 41],
    [87, 36],
    [88, 29],
    [85, 24],
    [80, 21],
    [74, 22],
    [70, 26],
    [70, 32],
    [66, 37],
    [70, 39],
    [73, 44],
    [78, 45],
    [83, 41],
  ),
  ...smooth([71, 26], [77, 27], [82, 32], [87, 34]),
  ...smooth([84, 27], [89, 23], [94, 27], [93, 35], [89, 39]),
  ...path([72, 34], [74, 34]),
  ...smooth([70, 41], [73, 41], [75, 39]),
  // Sleeves and hands reach toward a game in the middle.
  ...smooth([8, 65], [9, 57], [14, 51], [21, 49], [29, 51], [33, 56]),
  ...smooth(
    [17, 56],
    [22, 61],
    [29, 64],
    [37, 63],
    [41, 61],
    [44, 62],
    [42, 65],
    [37, 67],
    [28, 69],
    [19, 66],
    [15, 62],
  ),
  ...path([23, 62], [20, 66]),
  ...smooth(
    [38, 51],
    [40, 43],
    [46, 37],
    [51, 36],
    [58, 39],
    [64, 47],
    [66, 53],
  ),
  ...smooth([45, 45], [45, 51], [49, 55], [53, 55], [56, 53]),
  ...smooth([93, 64], [91, 56], [86, 51], [79, 48], [72, 50], [67, 55]),
  ...smooth(
    [84, 55],
    [79, 61],
    [72, 63],
    [65, 61],
    [60, 58],
    [57, 59],
    [59, 63],
    [64, 66],
    [72, 68],
    [80, 66],
    [86, 61],
  ),
  ...path([79, 61], [82, 65]),
  // Table, board and playing pieces.
  ...smooth(
    [9, 69],
    [6, 73],
    [11, 79],
    [28, 83],
    [52, 85],
    [76, 83],
    [91, 79],
    [96, 73],
    [93, 69],
  ),
  ...smooth([12, 80], [16, 84], [31, 88], [53, 90], [74, 88], [90, 83]),
  ...path([22, 87], [20, 95], [25, 95], [29, 88]),
  ...path([74, 88], [78, 95], [83, 95], [81, 86]),
  ...path([36, 72], [52, 65], [69, 73], [53, 80], [36, 72]),
  ...path([44, 68.5], [61, 76.5]),
  ...path([44.5, 76], [60.5, 69]),
  ...diamond(51, 60, 3),
  ...path([51, 57], [51, 63]),
  ...diamond(59, 71, 2.4),
];

const openHand: Line[] = [
  ...smooth(
    [-8, 45],
    [-7, 35],
    [-8, 28],
    [-11, 23],
    [-12, 19],
    [-10, 18],
    [-8, 20],
    [-6, 23],
    [-6, 16],
    [-6, 10],
    [-4, 8],
    [-3, 10],
    [-3, 16],
    [-2, 8],
    [0, 6],
    [1, 8],
    [1, 15],
    [2, 9],
    [4, 8],
    [5, 10],
    [4, 17],
    [6, 13],
    [8, 13],
    [8, 17],
    [6, 24],
    [6, 31],
    [8, 44],
  ),
  ...smooth([-7, 23], [-3, 24], [0, 27], [1, 31]),
  ...smooth([-4, 20], [-1, 18], [3, 19], [5, 21]),
  ...path([-1, 11], [0, 10]),
  ...path([3, 12], [4, 12]),
];

const huddle = [4, 92, 182, 273].flatMap((angle, index) => {
  const radians = (angle * Math.PI) / 180;
  const scale = [1, 0.94, 1.02, 0.91][index];
  const reach = [4.4, 5, 8, 4.6][index];
  const cuff =
    index % 2 === 0
      ? [
          ...smooth([-7, 34], [0, 36], [6.5, 34]),
          ...smooth([-7, 38], [0, 40], [7, 38]),
        ]
      : [...smooth([-7, 32], [0, 35], [6.5, 32]), ...path([-4, 36], [-2, 38])];
  const rotate = ([x, y]: Point): Point => {
    const depth = y - reach * (1 - y / 48);
    return [
      Math.round(
        (50 + scale * (x * Math.cos(radians) - depth * Math.sin(radians))) *
          100,
      ) / 100,
      Math.round(
        (50 + scale * (x * Math.sin(radians) + depth * Math.cos(radians))) *
          100,
      ) / 100,
    ];
  };
  return [...openHand, ...cuff].map(
    ([start, end]): Line => [rotate(start), rotate(end)],
  );
});

export const welcomeArt = {
  people: peopleAtTable,
  huddle,
};

export const storyScenes = {
  circuit,
  welcome: welcomeArt.people,
  printer,
  blocks,
  chess,
  cards,
  arcade: map,
  tabletop: dice,
  talks: microphone,
  vr: headset,
};

export function scenePath(from: Line[], to = from, blend = 0) {
  if (blend === 0 || blend === 1) {
    return (blend === 0 ? from : to)
      .map(([start, end]) => `M${start.join(" ")}L${end.join(" ")}`)
      .join("");
  }
  const commands: string[] = [];
  const mix = (start: Point, end: Point) =>
    start
      .map((coordinate, axis) =>
        (coordinate + (end[axis] - coordinate) * blend).toFixed(2),
      )
      .join(" ");
  for (let i = 0; i < Math.max(from.length, to.length); i++) {
    const [start, end] = from[i] ?? [to[i][0], to[i][0]];
    const [nextStart, nextEnd] = to[i] ?? [start, start];
    commands.push(`M${mix(start, nextStart)}L${mix(end, nextEnd)}`);
  }
  return commands.join("");
}
