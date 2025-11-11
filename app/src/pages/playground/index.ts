import { LuluDemoPages } from "./_luluDemo";
import { CDDPages } from "./CDD";
import { MediaPages } from "./Media";
import TableDemo_V1 from "./TableDemo_V1";
import LodaDashboard from "./LodaDashboard";


export const PlaygroundPages = {
  ...CDDPages,
  ...LuluDemoPages,
  ...MediaPages,
  TableDemo_V1,
  LodaDashboard,
}