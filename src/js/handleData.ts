import { jsonDataType, nodeType, edgeType } from "./handledata.d";
const jsonData = require("../data/data.json");

const getNodesFromData = (nodeData: jsonDataType[]): nodeType[] => {
  const nodes = nodeData;
  return nodes;
};

const getEdgesFromData = (edgeData: jsonDataType[]): edgeType[] => {
  let result = [];

  for (let i = 0; i < edgeData.length; i++) {
    if (Object.keys(edgeData[i]["data"]).includes("edgeTo")) {
      result.push({
        data: {
          id: `${edgeData[i]["data"]["id"]}/${edgeData[i]["data"]["edgeTo"]}`,
          target: `${edgeData[i]["data"]["edgeTo"]}`,
          source: `${edgeData[i]["data"]["id"]}`,
        },
      });
    }
  }
  return result;
};

const processDataFromJson = (
  rawData: jsonDataType[]
): [nodeType[], edgeType[]] => {
  let nodes = getNodesFromData(rawData);
  let edges = getEdgesFromData(rawData);
  return [nodes, edges];
};

export const [processedNodes, processedEdges] = processDataFromJson(jsonData);
