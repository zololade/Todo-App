import { projectsDataGetter as projectsGetter } from "../../store/store";
import { projectTransformer } from "../../model/transformers";
import { mainContainer, renderElement } from "../../view/renderUtilities";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handleSelectProject(match: Element, _event: PointerEvent) {
  // Event Delegation for Project list Selection
  if (!mainContainer) return;

  //select an item from the list of available project list
  const listItem = match;

  if (listItem) {
    //grab project id
    const projectId = listItem.getAttribute("data-id");
    if (!projectId) return;
    findAndViewProject(projectId);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
addEventListener("resize", (_event) => {
  //related disable back ui button
  if (window.matchMedia("(width >= 1100px)").matches) {
    document.querySelector("#backBtn")?.setAttribute("disabled", "disabled");
  }
  if (window.matchMedia("(width <= 1100px)").matches) {
    document.querySelector("#backBtn")?.removeAttribute("disabled");
  }
});

export default function findAndViewProject(
  identity: string,
  afterRender?: () => void,
) {
  const project = projectsGetter().find((a) => a.id === identity);

  if (project && mainContainer) {
    // 1. Update Active State in UI
    mainContainer
      .querySelectorAll("#project-list li")
      .forEach((el) => el.classList.remove("active"));
    const getActiveItem = document.querySelector(`li[data-id="${identity}"]`);

    if (getActiveItem) getActiveItem.classList.add("active");

    if (window.matchMedia("(width <= 1100px)").matches) {
      mainContainer.classList.toggle("show-detail");
      document.querySelector("#backBtn")?.removeAttribute("disabled");
    }

    // 2. Render project Detail Panel
    const detailPanel = document.getElementById("projectInfo");
    if (detailPanel) {
      const detailData = projectTransformer(project);
      if (afterRender) {
        renderElement(detailPanel, detailData, false, afterRender);
      } else {
        renderElement(detailPanel, detailData);
      }
    }
  }
}
