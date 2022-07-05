import { drawCyButtons } from "./js/drawCyButtons";
import { drawFullDepthCy, drawTwoDepthCy } from "./js/dispatchDrawCy";
import "./css/style.css";

interface globalStateTypes {
  fullMap: boolean;
  rootStack: string[];
}

export const globalState: globalStateTypes = {
  fullMap: false,
  rootStack: [],
};

let cy = drawTwoDepthCy();
drawCyButtons(cy);
