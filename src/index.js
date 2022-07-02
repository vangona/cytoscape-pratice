import cytoscape from "cytoscape";
import "./style.css";

var cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  elements: {
    // list of graph elements to start with
    nodes: [
      { data: { id: "a" } },
      { data: { id: "b" } },
      { data: { id: "c" } },
      { data: { id: "d", parent: "p" } },
      { data: { id: "p" } },
    ],
    edges: [{ data: { id: "ab", source: "a", target: "b" } }],
  },

  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(id)",
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
    name: "grid",
    rows: 5,
  },
});
