import { globalState } from "./../index";
import { drawFullDepthCy, drawTwoDepthCy } from "./dispatchDrawCy";
import drawCy from "./drawCy";
import { getElementsFromData } from "./handleData";

// cy 관련 버튼 생성 함수
export const drawCyButtons = (cy: any) => {
  const body = document.querySelector("body");
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const undoButton = document.createElement("button");
  undoButton.innerText = "되돌리기";
  undoButton.addEventListener("click", () => {
    if (globalState.rootStackPointer > 0) {
      const [newNodes, newEdges] = getElementsFromData(
        globalState.rootStack[globalState.rootStackPointer - 2]
      );

      globalState.rootStackPointer--;
      console.log(globalState);
      cy = drawCy(newNodes, newEdges);
    } else {
      console.log("되돌릴 기록이 없습니다.");
    }
  });

  const redoButton = document.createElement("button");
  redoButton.innerText = "앞돌리기";
  redoButton.addEventListener("click", () => {
    if (globalState.rootStackPointer < globalState.rootStack.length) {
      globalState.rootStackPointer++;
      const [newNodes, newEdges] = getElementsFromData(
        globalState.rootStack[globalState.rootStackPointer - 1]
      );

      cy = drawCy(newNodes, newEdges);
    } else {
      console.log("되돌릴 기록이 없습니다.");
    }
  });

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

  buttonContainer.appendChild(undoButton);
  buttonContainer.appendChild(redoButton);
  buttonContainer.appendChild(twoDepthDfsButton);
  buttonContainer.appendChild(fullDfsButton);

  body?.appendChild(buttonContainer);
};
