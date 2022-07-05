export interface jsonDataType {
  data: {
    id: string;
    name: string;
    content?: string;
    relations?: {
      realization?: string[];
      dependency?: string[];
      assocation?: string[];
    };
    childs?: string[];
  };
}

export interface nodeType {
  data: {
    id: string;
    name: string;
    content?: string;
    relations?: {
      realization?: string[];
      dependency?: string[];
      assocation?: string[];
    };
    childs?: string[];
    parent?: string;
  };
}

export interface edgeType {
  data: {
    id: string;
    source: string;
    target: string;
  };
}
