/* eslint-disable @typescript-eslint/no-unused-vars */
import { addProjectFormBuilder } from "../model/transformers";
import { mainContainer, renderElement } from "../view/renderUtilities";

let subTaskObserver: string | null = null;

const taskMap = new Map();
const subTaskMap = new Map();

export function handleAddProject(_match: Element, _e: PointerEvent) {
  if (window.matchMedia("(width <= 1100px)").matches) {
    mainContainer?.classList.toggle("show-detail");
    document.querySelector("#backBtn")?.removeAttribute("disabled");
  }

  const detailPanel = document.getElementById("projectInfo");
  if (detailPanel) {
    const detailData = addProjectFormBuilder();
    renderElement(detailPanel, detailData);
  }

  subTaskObserver = "subTask-1";
  taskMap.set("article-1 task-1", "");
  subTaskMap.set("subTask-1", "");
}

export function handleTextArea(match: HTMLElement, _e: Event) {
  match.style.height = `${match.scrollHeight}px`;
}

export function handleMockH3Input(match: HTMLElement, _e: Event) {
  const currentSubtask = match as HTMLInputElement;
  if (!currentSubtask) return;
  subTaskMap.set(currentSubtask.id, currentSubtask.value);
}

export function handleSubTaskMockPInput(match: HTMLElement, e: Event) {
  const target = e.target as HTMLElement;
  const parentSubtask = target.closest("article");
  const taskId = target.closest("li[id]");
  match.style.height = `${match.scrollHeight}px`;

  if (!parentSubtask) return;
  const currentTask = match as HTMLInputElement;
  if (!currentTask || !taskId) return;
  taskMap.set(`${parentSubtask.id} ${taskId.id}`, currentTask.value);
}

export function handleMockH3Focus(_match: HTMLElement, _e: Event) {
  console.log(subTaskObserver);
}
