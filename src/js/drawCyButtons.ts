import { globalState } from "./../index";
import { drawFullDepthCy, drawTwoDepthCy } from "./dispatchDrawCy";

// cy 관련 버튼 생성 함수
export const drawCyButtons = (cy: any) => {
  const body = document.querySelector("body");
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const twoDepthDfsButton = document.createElement("button");
  twoDepthDfsButton.innerText = "간단 그리기";
  twoDepthDfsButton.addEventListener("click", () => {
    cy = drawTwoDepthCy();
    globalState.fullMap = false;
  });

  const fullDfsButton = document.createElement("button");
  fullDfsButton.innerText = "전체 그리기";
  fullDfsButton.addEventListener("click", () => {
    cy = drawFullDepthCy();
    globalState.fullMap = true;
  });

  buttonContainer.appendChild(twoDepthDfsButton);
  buttonContainer.appendChild(fullDfsButton);

  body?.appendChild(buttonContainer);
};
