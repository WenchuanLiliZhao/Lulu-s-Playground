import { RootPages } from "./root-pages";
import { PlaygroundPages } from "./playground";
import { DebugPages } from "./debug";

export const Pages = {
  ...RootPages,
  ...PlaygroundPages,
  ...DebugPages,
}