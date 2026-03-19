/* eslint-disable @typescript-eslint/no-unused-vars */
import { addProjectFormBuilder } from "../model/transformers";
import Page from "../view/Page";
import { mainContainer, renderElement } from "../view/renderUtilities";

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

  taskMap.set("article-1 task-1", "");
  subTaskMap.set("subTask-1", "");
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
      `task-${value + 1}`,
      `subTask-${value + 1}`,
      `article-${value + 1}`,
    );
  } else if (subTaskMap.get(currentSubtask.id) === "" && value) {
    console.log("hello");
    for (let i = subtaskParent.childElementCount; i > value; i--) {
      console.log(subtaskParent.childElementCount);
      const child = document.querySelector(`#article-${i}`);
      subTaskMap.delete(`subTask-${i}`);
      if (child) subtaskParent.removeChild(child);
    }
  }

  for (const entries of subTaskMap) {
    console.log(entries);
  }
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

//################
//Helper functions
//################
function buildNextSubtask(
  host: HTMLElement,
  taskId: string,
  subTaskId: string,
  articleId: string,
) {
  host.appendChild(
    Page.build([
      {
        tag: "article",

        id: articleId,
        content: [
          {
            tag: "input",

            placeholder: "Subtask field heading...",
            class: "mockH3",
            id: subTaskId,
          },
          {
            tag: "ul",

            content: [
              {
                tag: "li",

                id: taskId,
                content: [
                  {
                    tag: "div",

                    class: "markIcon",
                    content: ".",
                  },
                  {
                    tag: "textarea",

                    rows: "1",
                    placeholder: "Task field details of current subtask... ",
                    class: "mockP",
                  },
                ],
              },
            ],
          },
        ],
      },
    ]),
  );
}

export function extractNumber(val: string) {
  const processedVal = val.match(/\d+/g)?.join("");
  return processedVal ? +processedVal : null;
}
