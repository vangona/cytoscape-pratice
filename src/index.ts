import { drawFullDepthCy, drawTwoDepthCy } from "./js/drawDispath";
import "./css/style.css";

let cy = drawTwoDepthCy();

const body = document.querySelector("body");
const buttonContainer = document.createElement("div");

const twoDepthDfsButton = document.createElement("button");
twoDepthDfsButton.innerText = "간단 그리기";
twoDepthDfsButton.addEventListener("click", () => {
  cy = drawTwoDepthCy();
});

const fullDfsButton = document.createElement("button");
fullDfsButton.innerText = "전체 그리기";
fullDfsButton.addEventListener("click", () => {
  cy = drawFullDepthCy();
});

buttonContainer.appendChild(twoDepthDfsButton);
buttonContainer.appendChild(fullDfsButton);

body.appendChild(buttonContainer);