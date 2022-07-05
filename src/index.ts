import { drawCyButtons } from "./js/drawCyButtons";
import { drawFullDepthCy, drawTwoDepthCy } from "./js/dispatchDrawCy";
import "./css/style.css";

interface globalStateTypes {
  fullMap: boolean;
  rootStack: string[];
  rootStackPointer: number;
}

export const globalState: globalStateTypes = {
  fullMap: false,
  rootStack: [],
  rootStackPointer: 0,
};

let cy = drawTwoDepthCy();
drawCyButtons(cy);
