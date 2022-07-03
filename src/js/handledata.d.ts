export interface jsonDataType {
  data: {
    id: string;
    name: string;
    content?: string;
    edge?: [];
    childs?: [];
    // 지울 예정
    edgeTo: string;
  };
}

export interface nodeType {
  data: {
    id: string;
    name: string;
    content?: string;
    edge?: [];
    childs?: [];
    parent?: string;
    // 지울 예정
    edgeTo: string;
  };
}

export interface edgeType {
  data: {
    id: string;
    source: string;
    target: string;
  };
}
