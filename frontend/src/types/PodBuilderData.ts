export interface PodBuildData {
  id?: number;
  name: string;
  engineCount: number;
  color: string;
  armorRating: number;
  value?: number;
}

export const mockPods: PodBuildData[] = [
  {
    name: "Racer-1",
    engineCount: 2,
    color: "#000000",
    armorRating: 1,
    value: 437,
  },
  {
    name: "Thunderbolt",
    engineCount: 3,
    color: "#FF4500",
    armorRating: 2,
    value: 999,
  },
  { name: "Nebula-X", engineCount: 4, color: "#1E90FF", armorRating: 3 },
  { name: "Sandcrawler", engineCount: 1, color: "#C2B280", armorRating: 5 },
  { name: "Starlance", engineCount: 2, color: "#9370DB", armorRating: 4 },
  {
    name: "Crimson Comet",
    engineCount: 3,
    color: "#DC143C",
    armorRating: 2,
    value: 1234.56,
  },
  { name: "Ghostrunner", engineCount: 2, color: "#A9A9A9", armorRating: 1 },
  { name: "Solar Flare", engineCount: 4, color: "#FFD700", armorRating: 3 },
  { name: "Ironclad", engineCount: 1, color: "#708090", armorRating: 5 },
  {
    name: "Vortex",
    engineCount: 3,
    color: "#00CED1",
    armorRating: 2,
    value: 4567,
  },
];
