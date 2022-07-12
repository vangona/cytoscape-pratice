import { jsonDataType, nodeType, edgeType } from "./handledata.d";
const jsonData: jsonDataType[] = require("../data/data.json");

// Data에서 Cytoscape Elements(Nodes, Edges) 로딩
export function getElementsFromData(
  rootSelector?: string | symbol
): [nodeType[], edgeType[]] {
  const nodeResult: nodeType[] = [];
  const existNodeIds: string[] = [];
  const edgeResult: edgeType[] = [];
  const relationDrawingQueue: nodeType[] = [];

  if (typeof rootSelector == "string") {
  }

  if (typeof rootSelector == "boolean") {
  }

  // 간선 그리기
  const _getEdgeFromDepth = (
    source: nodeType,
    target: nodeType,
    dashline = "solid"
  ): edgeType => {
    const result = {
      data: {
        id: `${source.data.id}/${target.data.id}`,
        source: target.data.id,
        target: source.data.id,
        dashline,
      },
    };

    return result;
  };

  // id가 string이라면 rootNode를 반환하는 함수.
  // * 추후 재사용 될 시 위치 옮기기.
  const _getNodeFromId = (id: string | symbol): nodeType => {
    if (typeof id == "string") {
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].data.id === id) return jsonData[i];
      }
    }
  };

  // '관련' 속성 간선 그리기
  const _makeRelationsEdges = (node: nodeType) => {
    for (let i = 0; i < node.data.relations.length; i++) {
      for (let j: number = 0; j < jsonData.length; j++) {
        // 데이터에서 노드를 찾고, 해당 노드가 존재하지 않는다면 노드를 추가하고 연관 간선을 추가한다.
        if (
          node.data.relations[i] === jsonData[j].data.id &&
          !existNodeIds.includes(node.data.relations[i])
        ) {
          // 간선을 잇는다
          const childNode: nodeType = jsonData[j];
          // 알 수 없는 오류로 depth가 1인 노드가
          // edge도 그리고 루트 노드를 parent로도 가져서,
          // parent를 초기화 시켜주었음.
          childNode.data.parent = "";

          // edge가 하나만 그려질 수 있도록
          // id 값을 통해서 edge들의 target과 source를 일치시켜준다.
          const edge =
            node.data.id > childNode.data.id
              ? _getEdgeFromDepth(node, childNode, "dashed")
              : _getEdgeFromDepth(childNode, node, "dashed");

          nodeResult.push(childNode);
          edgeResult.push(edge);
        }
      }
    }
  };

  // twoDepth에서 자식 노드에 간선을 연결
  const _makeChildsEdges = (
    depth: number,
    node: nodeType,
    callback: Function
  ) => {
    for (let i: number = 0; i < node.data.childs.length; i++) {
      for (let j: number = 0; j < jsonData.length; j++) {
        if (node.data.childs[i] === jsonData[j].data.id) {
          // 간선을 잇는다
          const childNode: nodeType = jsonData[j];
          // 알 수 없는 오류로 depth가 1인 노드가
          // edge도 그리고 루트 노드를 parent로도 가져서,
          // parent를 초기화 시켜주었음.
          childNode.data.parent = "";
          nodeResult.push(childNode);
          existNodeIds.push(childNode.data.id);
          edgeResult.push(_getEdgeFromDepth(node, childNode));

          callback(depth + 1, childNode);
        }
      }
    }
  };

  // twoDepth에서 손자노드를 compounds로 표현함.
  const _makeChildsCompounds = (depth: number, node: nodeType) => {
    for (let i: number = 0; i < node.data.childs.length; i++) {
      for (let j: number = 0; j < jsonData.length; j++) {
        if (node.data.childs[i] === jsonData[j]["data"]["id"]) {
          // compounds로 구성
          const childNode: nodeType = jsonData[j];
          childNode.data.parent = node.data.id;
          nodeResult.push(childNode);
          existNodeIds.push(childNode.data.id);

          _twoDepthDfs(depth + 1, childNode);
        }
      }
    }
  };

  // 탐색과 구현을 위한 dfs 함수
  const _twoDepthDfs = (depth: number, node: nodeType) => {
    // 깊이가 3일 때, 그리기 종료
    if (depth === 3) {
      return;
    }

    // 깊이가 0일 때, 자식 노드에 간선 잇기
    if (depth === 0) {
      node.data.nodeShape = "rectangle";
      nodeResult.push(node);

      _twoDepthDfs(depth + 1, node);
    }

    // 깊이가 1, 자식 노드에 간선 연결
    if (depth === 1 && Object.keys(node.data).includes("childs")) {
      _makeChildsEdges(depth, node, _twoDepthDfs);
    }

    // 긾이가 2, 손자 노드를 compunds로 구현
    if (depth === 2 && Object.keys(node.data).includes("childs")) {
      _makeChildsCompounds(depth, node);
    }

    if (Object.keys(node.data).includes("relations"))
      relationDrawingQueue.push(node);
  };

  // 추후 최대 depth 구현 가능성이 있어서 depth 인자를 줌.
  const _fullDfs = (depth: number, node: nodeType) => {
    if (depth === 0) {
      nodeResult.push(node);

      _fullDfs(depth + 1, node);
    } else if (Object.keys(node["data"]).includes("childs")) {
      _makeChildsEdges(depth, node, _fullDfs);
    }
  };

  // rootSelector가 없거나 false라면, jsonData를 반환한다.
  const root: nodeType =
    typeof rootSelector == "symbol" || typeof rootSelector == "undefined"
      ? jsonData[0]
      : _getNodeFromId(rootSelector);

  // twoDepth 그래프 그리기
  if (typeof rootSelector == "string" || typeof rootSelector == "undefined") {
    _twoDepthDfs(0, root);
  }

  // 전체 그래프 그리기
  if (typeof rootSelector == "symbol") {
    _fullDfs(0, root);
  }

  while (relationDrawingQueue.length) {
    const currNode = relationDrawingQueue.shift();
    _makeRelationsEdges(currNode);
  }

  return [nodeResult, edgeResult];
}
