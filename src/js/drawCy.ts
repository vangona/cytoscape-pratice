import cytoscape from "cytoscape";
import { nodeType, edgeType } from "./handledata.d";
import { getElementsFromData } from "./handleData";
// @ts-ignore
import * as coseBilkent from "cytoscape-cose-bilkent";

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

const drawCy = (processedNodes: nodeType[], processedEdges: edgeType[]) => {
  let cy = cytoscape({
    container: document.getElementById("cy"), // container to render in

    elements: {
      // list of graph elements to start with
      nodes: processedNodes,
      edges: processedEdges,
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

  cy.on("tap", (e) => {
    if (e.target.id) console.log(e.target.data());
    if (e.target.id && e.target.isNode()) {
      const [newNodes, newEdges] = getElementsFromData(e.target.id());
      cy = drawCy(newNodes, newEdges);
    }
  });

  return cy;
};

export default drawCy;