import { renderElement } from "../../view/renderUtilities";
import { taskBuilder } from "../../model/transformers";
import {
  projectsDataGetter as projectsGetter,
  taskModifier,
} from "../../store/store";

export function handleTaskClick(_match: Element, event: PointerEvent) {
  // Event Delegation handler for task

  //build information about the selected task
  const target = event.target as HTMLElement;
  const parent = target.closest(".subTask") as HTMLElement;
  const article = target.closest(".subTask>article") as HTMLElement;
  const listItem = target.closest(".subTask>article>ul>li") as HTMLElement;

  if (article && listItem && parent) {
    //build task identity
    const projectId = parent.getAttribute("data-id");
    const taskGroup = article.getAttribute("data-id");
    const item = listItem.getAttribute("data-id");

    if (!taskGroup || !item || !projectId) return;

    //update selected task in data base
    taskModifier(projectId, taskGroup, item, "done");

    //retrieve the updated project
    const currentProjectObj = projectsGetter().find(
      (val) => val.id === projectId,
    );

    //grab updated subtask
    if (!currentProjectObj) return;
    const subTasks = currentProjectObj.subtasks;

    listItem.classList.toggle("completed");

    //update ui
    const markIcon = listItem.querySelector(".markIcon");
    if (markIcon) {
      markIcon.textContent = listItem.classList.contains("completed")
        ? "✓"
        : ".";
    }

    //find current task
    const currentTask = subTasks.find((a) => a.id === taskGroup);

    //rerender if all task is done
    if (currentTask?.tasks.every((data) => data.flags?.includes("done"))) {
      const taskRenderData = taskBuilder(currentProjectObj);
      if (!taskRenderData) return;
      renderElement(parent, taskRenderData);
    }
  }
}
