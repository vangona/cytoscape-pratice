import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import "./style.css";

cytoscape.use(coseBilkent);

const defaultOptions = {
  // Called on `layoutready`
  ready: function () {},
  // Called on `layoutstop`
  stop: function () {},
  // 'draft', 'default' or 'proof"
  // - 'draft' fast cooling rate
  // - 'default' moderate cooling rate
  // - "proof" slow cooling rate
  quality: "default",
  // Whether to include labels in node dimensions. Useful for avoiding label overlap
  nodeDimensionsIncludeLabels: false,
  // number of ticks per frame; higher is faster but more jerky
  refresh: 30,
  // Whether to fit the network view after when done
  fit: true,
  // Padding on fit
  padding: 10,
  // Whether to enable incremental mode
  randomize: true,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: 4500,
  // Ideal (intra-graph) edge length
  idealEdgeLength: 50,
  // Divisor to compute edge forces
  edgeElasticity: 0.45,
  // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
  nestingFactor: 0.1,
  // Gravity force (constant)
  gravity: 0.25,
  // Maximum number of iterations to perform
  numIter: 2500,
  // Whether to tile disconnected nodes
  tile: true,
  // Type of layout animation. The option set is {'during', 'end', false}
  animate: "end",
  // Duration for animate:end
  animationDuration: 500,
  // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingVertical: 10,
  // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingHorizontal: 10,
  // Gravity range (constant) for compounds
  gravityRangeCompound: 1.5,
  // Gravity force (constant) for compounds
  gravityCompound: 1.0,
  // Gravity range (constant)
  gravityRange: 3.8,
  // Initial cooling factor for incremental layout
  initialEnergyOnIncremental: 0.5,
};

const cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  elements: {
    // list of graph elements to start with
    nodes: [
      {
        data: {
          id: "a",
          name: "생각",
        },
      },
      {
        data: {
          id: "b",
          parent: "c",
          name: "커피",
        },
      },
      {
        data: {
          id: "co",
          parent: "c",
          name: "코딩",
        },
      },
      {
        data: {
          id: "co sc",
          parent: "c",
          name: "컴퓨터 공학",
        },
      },
      {
        data: {
          id: "sc",
          parent: "c",
          name: "과학",
        },
      },
      {
        data: {
          id: "f",
          parent: "c",
          name: "심리학",
        },
      },
      {
        data: {
          id: "cos",
          parent: "c",
          name: "상담학",
        },
      },
      {
        data: {
          id: "c",
          name: "지식",
        },
      },
      {
        data: {
          id: "d",
          parent: "p",
          name: "에버랜드",
        },
      },
      {
        data: {
          id: "j",
          parent: "p",
          name: "제주도 생활",
        },
      },
      {
        data: {
          id: "founder",
          parent: "p",
          name: "창업",
        },
      },
      {
        data: {
          id: "pu",
          parent: "p",
          name: "출판",
        },
      },
      {
        data: {
          id: "wo",
          parent: "p",
          name: "노가다",
        },
      },
      {
        data: {
          id: "p",
          name: "경험",
        },
      },
      {
        data: {
          id: "v",
          name: "감성",
        },
      },
      {
        data: {
          id: "h",
          name: "사랑",
          parent: "v",
        },
      },
      {
        data: {
          id: "at",
          name: "애착",
          parent: "v",
        },
      },
    ],
    edges: [
      {
        data: {
          id: "ac",
          source: "c",
          target: "a",
        },
      },
      {
        data: {
          id: "pa",
          source: "p",
          target: "a",
        },
      },
      {
        data: {
          id: "va",
          source: "v",
          target: "a",
        },
      },
    ],
  },

  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        label: "data(name)",
      },
      css: {
        "text-valign": "center",
        "text-halign": "center",
      },
    },

    {
      selector: ":parent",
      css: {
        "text-valign": "top",
        "text-halign": "center",
      },
    },

    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
      },
    },
  ],

  layout: {
    name: "cose-bilkent",
    ...defaultOptions,
  },

  wheelSensitivity: 0.1,
});
