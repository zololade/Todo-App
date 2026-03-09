import { projects } from "../model/sampleDate/project";
import { projectTransformer } from "../model/transformers";
import {
  mainContainer,
  renderElement,
  renderView,
} from "./renderUtility";

//initial app load render
window.addEventListener("load", () => {
  if (!mainContainer) return;
  renderView("home");
});

// Event Delegation for Activity Selection
mainContainer?.addEventListener("click", (e) => {
  if (!mainContainer) return;

  //select an item from the list of available project list
  const target = e.target as HTMLElement;
  const listItem = target.closest("li[data-id]");

  if (listItem) {
    //grab project id
    const projectId = listItem.getAttribute("data-id");
    const project = projects.find((a) => a.id === projectId);

    if (project) {
      // 1. Update Active State in UI
      mainContainer
        .querySelectorAll("#activity-list li")
        .forEach((el) => el.classList.remove("active"));
      listItem.classList.add("active");
      if (window.innerWidth < 1100) {
        mainContainer.classList.toggle("show-detail");
        document
          .querySelector("#backBtn")
          ?.removeAttribute("disabled");
      }

      // 2. Render project Detail Panel
      const detailPanel = document.getElementById("activityInfo");
      if (detailPanel) {
        const detailData = projectTransformer(project);
        renderElement(detailPanel, detailData);
      }
    }
  }
});
