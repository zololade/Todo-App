import { navStateSetter } from "../model/projectDetailNav";
import {
  addProjectFormBuilder,
  buildNextSubtask,
  buildNextTask,
} from "../model/transformers";
import { getProject } from "../store/store";
import { mainContainer, renderElement } from "../view/renderUtilities";
import {
  // extractNumber,
  subTaskMap,
  taskMap,
} from "./addProjectController";
import { getActiveProjectId } from "./controllersHelperFunctions/handleSelectProject";

interface SubTask {
  id: string;
  title: string;
  tasks: {
    id: string;
    detail: string;
    flags: string[] | null;
  }[];
}

/*eslint-disable @typescript-eslint/no-unused-vars*/
function handleEditBtn(_match: Element, _e: PointerEvent) {
  taskMap.clear();
  subTaskMap.clear();
  const currProjectId = getActiveProjectId();
  if (!currProjectId) return;

  const project = getProject(currProjectId);
  if (!project) return;
  const TITLE = project.title;
  const OVERVIEW = project.overview;
  project.subtasks.forEach(populateMap);

  //render add project with the info above
  navStateSetter("editing");
  const detailPanel = document.getElementById("projectInfo");
  if (!detailPanel) return;
  const detailData = addProjectFormBuilder();

  // const UL = document.querySelector("#project-list>ul") as HTMLElement;
  renderElement(detailPanel, detailData, false, () => {
    const title = mainContainer?.querySelector(
      ".mockH2",
    ) as HTMLInputElement | null;
    const para = mainContainer?.querySelector(
      "#inputPara",
    ) as HTMLInputElement | null;
    const subtaskParent = detailPanel.querySelector(".subTask") as HTMLElement;

    if (!title || !para) return;

    title.value = TITLE;
    para.value = OVERVIEW;

    project.subtasks.forEach((subtask, i) => {
      // ensure subtask exists in UI
      let article = detailPanel.querySelector(`#article-${i + 1}`);

      if (!article) {
        buildNextSubtask(
          subtaskParent,
          "task-1",
          `subTask-${i + 1}`,
          `article-${i + 1}`,
        );

        article = detailPanel.querySelector(`#article-${i + 1}`);
      }
      let heading: HTMLInputElement | null;
      if (article) {
        heading = article.querySelector(".mockH3");
        if (heading) heading.value = subtask.title;
      }

      if (article) {
        const UL = article.querySelector("ul");
        if (UL)
          subtask.tasks.forEach((task, j) => {
            let li = UL.querySelector(`#task-${j + 1}`);

            if (!li) {
              buildNextTask(UL, `task-${j + 1}`);
              li = UL.querySelector(`#task-${j + 1}`);
            }

            const textarea = li?.querySelector(
              "textarea",
            ) as HTMLTextAreaElement;
            if (textarea) textarea.value = task.detail;
          });
      }
    });
  });
}

/*eslint-disable @typescript-eslint/no-unused-vars*/
function populateMap(element: SubTask, index: number, _a: SubTask[]) {
  subTaskMap.set(`subTask-${index + 1}`, element.title);
  element.tasks.forEach((e, i) => {
    taskMap.set(`article-${index + 1} task-${i + 1}`, e.detail);
  });
}

export { handleEditBtn };
