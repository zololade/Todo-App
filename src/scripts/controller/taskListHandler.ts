import { mainContainer, renderElement } from "./renderUtility";
import { taskGetter, taskModifier } from "../store/task";
import { taskBuilder } from "../model/transformers";
import { getCurrentProject } from "./projectController";
import { activities } from "../store/activity";
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
    const taskGroup = article.getAttribute("data-id");
    const item = listItem.getAttribute("data-id");

    if (!taskGroup || !item) return;
    taskModifier(taskGroup, item, "done");
    const tasks = taskGetter();
    listItem.classList.toggle("completed");

    const currentTask = tasks.find((a) => a.subTaskId === taskGroup);
    if (currentTask?.taskData.every((data) => data.flags?.includes("done"))) {
      const currentProject = getCurrentProject();
      if (!currentProject) return;
      const taskRenderData = taskBuilder(activities, tasks, currentProject);
      if (!taskRenderData) return;
      renderElement(parent, taskRenderData);
    }
  }
});
