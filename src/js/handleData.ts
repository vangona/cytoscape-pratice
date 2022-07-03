import { jsonDataType, nodeType, edgeType } from "./handledata.d";
const jsonData: jsonDataType[] = require("../data/data.json");

const makeEdgeFromDepth = (source: nodeType, target: nodeType): edgeType => {
  const result = {
    data: {
      id: `${source["data"]["id"]}/${target["data"]["id"]}`,
      source: target["data"]["id"],
      target: source["data"]["id"],
    },
  };

  return result;
};

export const makeElementsFromData = (
  rootNodeId?: string
): [nodeType[], edgeType[]] => {
  const nodeResult: nodeType[] = [];
  const edgeResult: edgeType[] = [];

  // id를 통해 node를 가져오는 함수.
  // * 추후 재사용 될 시 위치 옮기기.
  const _getNodeFromId = (id: string): nodeType => {
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i]["data"]["id"] === id) return jsonData[i];
    }
  };

  // 탐색과 구현을 위한 dfs 함수
  const _dfs = (depth: number, node: nodeType) => {
    // node 추가
    nodeResult.push(node);

    // 깊이가 2일 때, 그리기 종료
    if (depth === 2) {
      return;
    }

    // 깊이가 0일 때, 자식 노드에 간선 잇기
    if (depth === 0 && Object.keys(node["data"]).includes("childs")) {
      for (let i: number = 0; i < node.data.childs.length; i++) {
        for (let j: number = 0; j < jsonData.length; j++) {
          if (node.data.childs[i] === jsonData[j]["data"]["id"]) {
            // 간선을 잇는다
            const childNode: nodeType = jsonData[j];
            // 알 수 없는 오류로 depth가 1인 노드가 자꾸 루트 노드를 parent로 삼아서, parent를 초기화 시켜줌
            childNode.data.parent = "";
            edgeResult.push(makeEdgeFromDepth(node, childNode));

            _dfs(depth + 1, childNode);
          }
        }
      }
    }

    // 깊이가 1, 손자 노드를 compounds로 구성
    if (depth === 1 && Object.keys(node["data"]).includes("childs")) {
      for (let i: number = 0; i < node.data.childs.length; i++) {
        for (let j: number = 0; j < jsonData.length; j++) {
          if (node.data.childs[i] === jsonData[j]["data"]["id"]) {
            // compounds로 구성
            const childNode: nodeType = jsonData[j];
            childNode.data.parent = node.data.id;
            nodeResult.push(childNode);

            _dfs(depth + 1, childNode);
          }
        }
      }
    }
  };

  const root: nodeType = rootNodeId ? _getNodeFromId(rootNodeId) : jsonData[0];
  _dfs(0, root);

  return [nodeResult, edgeResult];
};
