import { mainContainer, renderElement } from "./renderUtility";
import { taskBuilder } from "../model/transformers";
import {
  projectsDataGetter as projectsGetter,
  taskModifier,
} from "../store/store";
// Event Delegation for Activity Selection
mainContainer?.addEventListener("click", (e) => {
  if (!mainContainer) return;

  //select an item from the list of available project list
  const target = e.target as HTMLElement;
  const parent = target.closest(".subTask") as HTMLElement;
  const article = target.closest(".subTask>article") as HTMLElement;
  const listItem = target.closest(".subTask>article>ul> li") as HTMLElement;
  if (article && listItem && parent) {
    //grab project id
    const projectId = parent.getAttribute("data-id");
    const taskGroup = article.getAttribute("data-id");
    const item = listItem.getAttribute("data-id");

    if (!taskGroup || !item || !projectId) return;
    taskModifier(projectId, taskGroup, item, "done");
    const currentProjectObj = projectsGetter().find(
      (val) => val.id === projectId,
    );
    if (!currentProjectObj) return;
    const tasks = currentProjectObj.subtasks;

    listItem.classList.toggle("completed");

    const currentTask = tasks.find((a) => a.id === taskGroup);
    if (currentTask?.tasks.every((data) => data.flags?.includes("done"))) {
      const taskRenderData = taskBuilder(currentProjectObj);
      if (!taskRenderData) return;
      renderElement(parent, taskRenderData);
    }
  }
});
