const jsonData = require("../data/data.json");

interface node {
  data: {
    id: string;
    name: string;
    content?: string;
    edge?: [];
    childs?: [];
  };
}

const getNodesFromData = (data: []) => {
  return data;
};

const getEdgesFromData = (data: []) => {
  let result = [];

  for (let i = 0; i < data.length; i++) {
    if (Object.keys(data[i]["data"]).includes("edgeTo")) {
      result.push({
        data: {
          id: `${data[i]["data"]["id"]}/${data[i]["data"]["edgeTo"]}`,
          target: `${data[i]["data"]["edgeTo"]}`,
          source: `${data[i]["data"]["id"]}`,
        },
      });
    }
  }
  return result;
};

const processDataFromJson = (rawData: []) => {
  let nodes = getNodesFromData(rawData);
  let edges = getEdgesFromData(rawData);
  return [nodes, edges];
};

export const [processedNodes, processedEdges] = processDataFromJson(jsonData);
