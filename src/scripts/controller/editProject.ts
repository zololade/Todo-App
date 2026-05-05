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
    let article;

    if (project.subtasks.length > 0) {
      project.subtasks.forEach((subtask, i) => {
        article =
          detailPanel.querySelector(`#article-${i + 1}`) ??
          (buildNextSubtask(
            subtaskParent,
            "task-1",
            `subTask-${i + 1}`,
            `article-${i + 1}`,
          ) as HTMLElement);

        if (!article) return;
        const heading = article.querySelector(
          ".mockH3",
        ) as HTMLInputElement | null;
        if (heading) heading.value = subtask.title;

        const UL = article.querySelector("ul");

        if (!UL) return;
        subtask.tasks.forEach((task, j) => {
          const li =
            UL.querySelector(`#task-${j + 1}`) ??
            (buildNextTask(UL, `task-${j + 1}`) as HTMLElement);

          const textarea = li?.querySelector("textarea") as HTMLTextAreaElement;
          if (textarea) textarea.value = task.detail;
        });
      });
    }
    buildNextSubtask(
      subtaskParent,
      "task-1",
      `subTask-${project.subtasks.length + 1}`,
      `article-${project.subtasks.length + 1}`,
    );
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
