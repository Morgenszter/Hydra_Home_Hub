export type HydraCockpitRouteName =
  | "main_cockpit"
  | "recovery"
  | "devices"
  | "voice"
  | "operator";

export type HydraCockpitRoute = {
  name: HydraCockpitRouteName;
  title: string;
  requiresBridge: boolean;
};

export const hydraCockpitRoutes: HydraCockpitRoute[] = [
  { name: "main_cockpit", title: "Main Cockpit", requiresBridge: true },
  { name: "recovery", title: "Recovery", requiresBridge: false },
  { name: "devices", title: "Devices", requiresBridge: true },
  { name: "voice", title: "OMEGON", requiresBridge: true },
  { name: "operator", title: "Operator", requiresBridge: true },
];
