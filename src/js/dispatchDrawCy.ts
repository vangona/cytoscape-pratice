import { getElementsFromData } from "./handleData";
import drawCy from "./drawCy";

// draw cy dispather
export const drawTwoDepthCy = () => {
  const [processedNodes, processedEdges] = getElementsFromData();

  return drawCy(processedNodes, processedEdges);
};

export const drawFullDepthCy = () => {
  const fullDfsSymbol = Symbol("fullDfs");
  const [processedNodes, processedEdges] = getElementsFromData(fullDfsSymbol);

  return drawCy(processedNodes, processedEdges);
};
