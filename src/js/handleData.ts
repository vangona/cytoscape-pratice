import { jsonDataType, nodeType, edgeType } from "./handledata.d";
const jsonData = require("../data/data.json");

const makeEdgeFromDepth = (source: nodeType, target: nodeType): edgeType => {
  const result = {
    data: {
      id: `${source["data"]["id"]}/${target["data"]["id"]}`,
      source: source["data"]["id"],
      target: target["data"]["id"],
    },
  };

  return result;
};

const getNodesFromData = (
  nodeData: jsonDataType[]
): [nodeType[], edgeType[]] => {
  const nodeResult: nodeType[] = [];
  const edgeResult: edgeType[] = [];

  function dfs(depth: number, node: nodeType) {
    if (depth === 3) {
      return;
    }

    if (depth === 0) {
      for (let i: number = 0; i < node.data.childs.length; i++) {
        for (let j: number = 0; j < nodeData.length; j++) {
          if (node["data"]["childs"][i] === nodeData[j]["data"]["id"]) {
            const childNode: nodeType = nodeData[j];
            nodeResult.push(childNode);

            edgeResult.push(makeEdgeFromDepth(node, nodeData[j]));

            dfs(depth + 1, childNode);
          }
        }
      }
    }

    if (depth === 1) {
      for (let i: number = 0; i < node.data.childs.length; i++) {
        for (let j: number = 0; j < nodeData.length; j++) {
          if (node["data"]["childs"][i] === nodeData[j]["data"]["id"]) {
            const childNode: nodeType = nodeData[j];
            childNode["data"]["parent"] = node["data"]["id"];

            nodeResult.push(childNode);
            dfs(depth + 1, childNode);
          }
        }
      }
    }
  }

  nodeResult.push(nodeData[0]);
  dfs(0, nodeData[0]);

  return [nodeResult, edgeResult];
};

const processDataFromJson = (
  rawData: jsonDataType[]
): [nodeType[], edgeType[]] => {
  let [nodes, edges] = getNodesFromData(rawData);

  return [nodes, edges];
};

export const [processedNodes, processedEdges] = processDataFromJson(jsonData);
