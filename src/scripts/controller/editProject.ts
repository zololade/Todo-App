import { navStateSetter } from "../model/projectDetailNav";
import { addProjectFormBuilder } from "../model/transformers";
import { getProject } from "../store/store";
import { mainContainer, renderElement } from "../view/renderUtilities";
import { subTaskMap, taskMap } from "./addProjectController";

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
  const active = mainContainer?.querySelector("li.active") as HTMLElement;
  const currProjectId = active.dataset.id;
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
    const title = document.querySelector(".mockH2") as HTMLInputElement | null;
    const para = document.querySelector(
      "#inputPara",
    ) as HTMLInputElement | null;

    if (!title || !para) return;

    title.value = TITLE;
    para.value = OVERVIEW;
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
