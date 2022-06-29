async function getData() {
  const response = await fetch("./assets/data/data.json");

  const data = await response.json();

  return data;
}

getData().then((data) => console.log(data));

const cy = cytoscape({
  container: document.getElementById("cy"),
});
