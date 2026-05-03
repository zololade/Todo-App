/* eslint-disable @typescript-eslint/no-unused-vars */
import { navStateSetter } from "../model/projectDetailNav";
import {
  addProjectFormBuilder,
  buildNextSubtask,
  buildNextTask,
  getProjectList,
} from "../model/transformers";
import { mainContainer, renderElement } from "../view/renderUtilities";
import { addProject, type InputData } from "../store/store";
import findAndViewProject from "./controllersHelperFunctions/handleSelectProject";
// import Page from "../view/Page";

const taskMap: Map<string, string> = new Map();
const subTaskMap: Map<string, string> = new Map();

export function handleAddProject(_match: Element, _e: PointerEvent) {
  if (window.matchMedia("(width <= 1100px)").matches) {
    mainContainer?.classList.toggle("show-detail");
    document.querySelector("#backBtn")?.removeAttribute("disabled");
  }
  navStateSetter("editing");
  const detailPanel = document.getElementById("projectInfo");
  if (detailPanel) {
    const detailData = addProjectFormBuilder();
    renderElement(detailPanel, detailData);
  }
}

export function handleTextArea(match: HTMLElement, _e: Event) {
  match.style.height = `${match.scrollHeight}px`;
}

export function handleMockH3Input(match: HTMLElement, e: Event) {
  const target = e.target as HTMLElement;
  const subtaskParent = target.closest(".subTask") as HTMLElement;

  if (!subtaskParent) return;
  const currentSubtask = match as HTMLInputElement;
  if (!currentSubtask) return;
  subTaskMap.set(currentSubtask.id, currentSubtask.value);
  const value = extractNumber(currentSubtask.id);

  if (
    subTaskMap.get(currentSubtask.id) !== "" &&
    value &&
    subtaskParent.childElementCount === value
  ) {
    buildNextSubtask(
      subtaskParent,
      `task-1`,
      `subTask-${value + 1}`,
      `article-${value + 1}`,
    );
  }
}

export function handleSubTaskMockPInput(match: HTMLElement, e: Event) {
  const target = e.target as HTMLElement;
  const parentSubtask = target.closest("article");
  const container = target.closest("ul");
  const taskId = target.closest("li[id]");
  match.style.height = `${match.scrollHeight}px`;

  if (!parentSubtask || !container) return;
  const currentTask = match as HTMLInputElement;
  if (!currentTask || !taskId) return;
  taskMap.set(`${parentSubtask.id} ${taskId.id}`, currentTask.value);

  const value = extractNumber(taskId.id);

  if (
    taskMap.get(`${parentSubtask.id} ${taskId.id}`) !== "" &&
    value &&
    container.childElementCount === value
  ) {
    buildNextTask(container, `task-${value + 1}`);
  }
}

export function handleSaveBtn(_match: Element, _e: Event) {
  const projectTitleHost = document.querySelector(
    ".mockH2",
  ) as HTMLInputElement;
  const projectParaHost = document.querySelector(
    "#inputPara",
  ) as HTMLInputElement;
  const UL = document.querySelector("#project-list>ul") as HTMLElement;
  if (!projectTitleHost.value.trim()) {
    projectTitleHost.placeholder = "Project needs a title...";
    projectTitleHost.focus();
    return;
  }
  const accumulatorObject: { [key: string]: { id: string; detail: string }[] } =
    {};

  for (const [key, value] of taskMap.entries()) {
    const subtaskKeyValue = key.split(" ")[0];
    const taskKeyValue = key.split(" ")[1];
    if (!subtaskKeyValue || !taskKeyValue) continue;
    accumulatorObject[subtaskKeyValue] = [
      ...(accumulatorObject[subtaskKeyValue] || []),
      {
        id: taskKeyValue,
        detail: value,
      },
    ];
  }

  let subTask: InputData["subtasks"] = [];

  subTaskMap.forEach((value, key) => {
    const num = extractNumber(key);
    if (!num) return;
    const taskArray = accumulatorObject[`article-${num}`];
    if (value === "" || !subTask || !taskArray) return;

    subTask = [
      ...subTask,
      {
        title: value,
        tasks: [
          ...taskArray.map((data) => data.detail).filter((data) => data !== ""),
        ],
      },
    ];
  });

  const transformUserInput: InputData = {
    title: projectTitleHost.value,
    overview: projectParaHost.value,
    subtasks: subTask,
  };

  function renderNext() {
    const listData = getProjectList();
    renderElement(UL, listData);
    navStateSetter("write");
    taskMap.clear();
    subTaskMap.clear();
  }

  findAndViewProject(addProject(transformUserInput), renderNext);
}

//################
//Helper functions
//################

export function extractNumber(val: string) {
  const processedVal = val.match(/\d+/g)?.join("");
  return processedVal ? +processedVal : null;
}

export { taskMap, subTaskMap };
